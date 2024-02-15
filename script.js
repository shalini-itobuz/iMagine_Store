import { products } from "./products.js";
const openShopping = document.querySelector('.shopping');
const closeShopping = document.querySelector('.closeShopping');
const list = document.querySelector('.list');
const listCard = document.querySelector('.listCard');
const body = document.querySelector('body');
const total = document.querySelector('.total');
const quantity = document.querySelector('.quantity');
const preuser = sessionStorage.getItem("preuser");

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
    document.getElementById("user").textContent=preuser;
    reloadCart();
  }
  if (preuser==null){
    window.location.href = 'login.html';
  }
  else
  {
    document.getElementById("login").textContent="Logout";
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
    button.addEventListener('click', function() {
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
      minusButton.onclick = function() {
        changeQuantity(key, value.quantity - 1);
      };

      //Creating quantity div
      let countDiv = document.createElement('div');
      countDiv.classList.add('count');
      countDiv.textContent = value.quantity;
      let plusButton = document.createElement('button');
      plusButton.textContent = '+';
      plusButton.onclick = function() {
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


document.addEventListener('DOMContentLoaded', function() {
  const registerButton = document.querySelector('.login-btn');

  registerButton.addEventListener('click', function() {
      sessionStorage.clear();
      window.location.href = 'login.html';
  });
});



