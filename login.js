document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Retrieve users from local storage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Find user by username
        const user = users.find((user) => user.username === username);

        if (!user) {
            // If user does not exist, show error message
            alert("User not found. Please register first.");
            return;
        }
        sessionStorage.setItem("preuser", username);

        // Check if the password matches
        if (user.password === password) {
            // If password matches, log in the user and redirect to their cart page
            alert("Login successful!");
            window.location.href = `index.html?user=${encodeURIComponent(user.username)}`;
        } else {
            // If password does not match, show error message
            alert("Invalid username or password. Please try again.");
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.querySelector('.register-btn');
  
    registerButton.addEventListener('click', function() {
        window.location.href = 'register.html';
    });
  });