// Function to generate a random OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Function to send an email
function sendEmail(email, otp) {
    
    emailjs
        .send("service_efj2459", "template_ab8m40i", {
            to_email: email,
            message_html: "Your OTP is " + otp,
        })
        .then(
            function (response) {
                console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
                console.log("FAILED...", error);
            }
        );
}

document.addEventListener("DOMContentLoaded", function () {
    const generateOTPButton = document.getElementById("generate-otp");
    const registrationForm = document.getElementById("registration-form");

    generateOTPButton.addEventListener("click", function () {
        const emailInput = document.getElementById("email");
        const email = emailInput.value;
        const generatedOTP = generateOTP();
        sendEmail(email, generatedOTP); 
        alert("OTP has been sent to your email.");
        sessionStorage.setItem("generatedOTP", generatedOTP);
        sessionStorage.setItem("registeredEmail", email); // Store registered email for validation
    });

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const enteredOTP = document.getElementById("otp").value;
        const generatedOTP = sessionStorage.getItem("generatedOTP");

        // Validate if the email entered matches the email used for OTP generation
        const registeredEmail = sessionStorage.getItem("registeredEmail");
        if (email !== registeredEmail) {
            console.log("Email does not match the registered email.");
            alert("Please use the registered email to generate OTP.");
            return;
        }

        if (enteredOTP === generatedOTP) {
            console.log("OTP Matched");
            // Handle successful OTP validation
            console.log("Account created successfully!");

            // Retrieve existing users from local storage or initialize an empty array
            let users = localStorage.getItem("users");
            users = users ? JSON.parse(users) : [];

            // Retrieve user input
            const username = document.getElementById("name").value;
            const password = document.getElementById("password").value;

            // Check if the user already exists
            
            const existingUser = users.find((user) => user.username === username);
            if (existingUser) {
                console.log("User already exists, cannot register again with the same username.");
                alert("User already exists, cannot register again with the same username.");
                return;
            }
            const existingUser1 = users.find((user) => user.email === email);
            if (existingUser1) {
                const existingUserIndex = users.findIndex((user) => user.email === email);
                alert(`User already exists, with username ${users[existingUserIndex].username}. Please Login`);
                return;
            }
            
            // If the user does not exist
            users.push({ email, username, password });
            
            //  array of users to local storage
            localStorage.setItem("users", JSON.stringify(users));
            // Redirect to the login section
            window.location.href = "login.html";
        } else {
            console.log("OTP Not Matched");
            // Handle failed OTP validation
            console.log("OTP entered is incorrect. Please try again.");
        }
    });

});