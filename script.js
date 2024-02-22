import { products } from "./products.js";
const openShopping = document.querySelector('.shopping');
const closeShopping = document.querySelector('.closeShopping');
const list = document.querySelector('.list');
const listCard = document.querySelector('.listCard');
const body = document.querySelector('body');
const total = document.querySelector('.total');
const quantity = document.querySelector('.quantity');
const preuser = sessionStorage.getItem("preuser");
const searchInput = document.getElementById('searchInput');
const replies = {
  "hi": "Hi there!! What can i help u wid?",
  "how are you?": "I'm doing well, thnks for asking! What abt u?",
  "bye": "Goodbye! Have a great day!",
  "help": "1. Adding product to cart problem .\n2. Remove from cart . \n 3. Increase product quantity.\n 4.Search for a particular product. \n 5. Problems more than above contavt us on our tollfree helpline number- 1800 256 178 .PRESS THE OPTION NUMBER TO CONTINUE",
  "1": "Press Add to Cart button on the bottom of each product card. Once clicked it will show In Basket",
  "2": "To remove you need to click on cart button on top right of the page and click on + or - icon to adjust quantity or delete the item",
  "3": "Click on + or - button on top right cart section to adjust quantity as per user requirement.",
  "4": "On top middle see a search field in that type keywords of the product to search for it.",
  "5": "Feel free to reach us at our tollfree number: 1800 256 178 ",
  "default": "I'm sorry, I didn't understand that."
};
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");


openShopping.addEventListener('click', () => {
  body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
  body.classList.remove('active');
})

// Function to get user's cart from local storage
function getUserCart(username) {
  const userCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
  return userCarts[username] || [];
}

// Function to update user's cart in local storage
function updateUserCart(username, cartItems) {
  const userCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
  userCarts[username] = cartItems;
  localStorage.setItem('userCarts', JSON.stringify(userCarts));
}

let listCards = getUserCart(preuser) || [];

function initApp() {
  if (getUserCart(preuser)) {
    listCards = getUserCart(preuser) || [];
    document.getElementById("user").textContent = preuser;
    reloadCart();
  }
  if (preuser === null) {
    window.location.href = 'login.html';
  }
  else {
    document.getElementById("login").textContent = "Logout";
  }
  products.forEach((value, key) => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('item');

    const img = document.createElement('img');
    img.src = `image/${value.image}`;

    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = value.name;

    const price = document.createElement('div');
    price.classList.add('price');
    price.textContent = value.price.toLocaleString();

    const button = document.createElement('button');
    button.textContent = 'Add To Cart';
    button.addEventListener('click', function () {
      addToCart(key);
      this.textContent = 'In Basket';
      this.style.cssText = 'cursor: not-allowed;';
      this.setAttribute('class', 'basket');

    });

    newDiv.appendChild(img);
    newDiv.appendChild(title);
    newDiv.appendChild(price);
    newDiv.appendChild(button);
    list.appendChild(newDiv);
  });
}

// Function to add an item to the cart
function addToCart(key) {

  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  }
  reloadCart();
  updateUserCart(preuser, listCards);
}

// Function to reload the cart
function reloadCart() {
  listCard.innerHTML = '';
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    if (value != null) {
      totalPrice = totalPrice + value.price;
      count = count + 1;

      let newDiv = document.createElement('li');

      // Creating image div
      let imageDiv = document.createElement('div');
      let image = document.createElement('img');
      image.src = `image/${value.image}`;
      imageDiv.appendChild(image);

      // Creating name div
      let nameDiv = document.createElement('div');
      nameDiv.textContent = value.name;

      // Creating price div
      let priceDiv = document.createElement('div');
      priceDiv.textContent = value.price.toLocaleString();

      // Creating quantity div
      let quantityDiv = document.createElement('div');
      let minusButton = document.createElement('button');
      minusButton.textContent = '-';
      minusButton.onclick = function () {
        changeQuantity(key, value.quantity - 1);
      };

      //Creating quantity div
      let countDiv = document.createElement('div');
      countDiv.classList.add('count');
      countDiv.textContent = value.quantity;
      let plusButton = document.createElement('button');
      plusButton.textContent = '+';
      plusButton.onclick = function () {
        changeQuantity(key, value.quantity + 1);
      };
      quantityDiv.appendChild(minusButton);
      quantityDiv.appendChild(countDiv);
      quantityDiv.appendChild(plusButton);

      // Appending 
      newDiv.appendChild(imageDiv);
      newDiv.appendChild(nameDiv);
      newDiv.appendChild(priceDiv);
      newDiv.appendChild(quantityDiv);

      listCard.appendChild(newDiv);
    }
  });
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}





// Function to change the quantity of an item in the cart

function changeQuantity(key, quantity) {
  if (quantity === 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCart();
  updateUserCart(preuser, listCards);
}

// Function to handle successful login
function handleSuccessfulLogin(username) {
  loggedInUser = username;

  window.location.href = 'index.html';
}

initApp();

export { handleSuccessfulLogin };



searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  if (query !== '') {
    setTimeout(() => {
      const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
      displaySearchResults(filteredProducts);
    }, 300);
  } else {
    displaySearchResults(products);
  }
});

// Function to display search results
function displaySearchResults(results) {
  list.innerHTML = '';
  results.forEach(product => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('item');

    const img = document.createElement('img');
    img.src = `image/${product.image}`;
    img.alt = product.name;

    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = product.name;

    const price = document.createElement('div');
    price.classList.add('price');
    price.textContent = product.price.toLocaleString();

    const button = document.createElement('button');
    button.textContent = 'Add To Cart';
    button.addEventListener('click', () => addToCart(product.id - 1));

    newDiv.appendChild(img);
    newDiv.appendChild(title);
    newDiv.appendChild(price);
    newDiv.appendChild(button);

    list.appendChild(newDiv);
  });
}

//Chat Bot
function sendMessage() {
  const message = userInput.value.trim().toLowerCase();
  const userMessage = document.createElement("div");
  userMessage.classList.add("user-message");
  userMessage.textContent = "User: " + message;
  chatMessages.appendChild(userMessage);
  const reply = replies[message] || replies["default"];
  const botMessage = document.createElement("div");
  botMessage.classList.add("bot-message");
  botMessage.textContent = "Bot: " + reply;
  chatMessages.appendChild(botMessage);
  userInput.value = "";

}

sendButton.addEventListener("click", () => {
  sendMessage();
})

userInput.addEventListener('keyup', (e) => {
  if (e.key === "Enter")
    sendMessage();
})




document.addEventListener('DOMContentLoaded', function () {
  const registerButton = document.querySelector('.login-btn');

  registerButton.addEventListener('click', function () {
    sessionStorage.clear();
    window.location.href = 'login.html';
  });
});



