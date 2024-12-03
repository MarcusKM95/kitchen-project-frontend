document.addEventListener("DOMContentLoaded", function () {
    const token = sessionStorage.getItem("token");
    const isAdmin = sessionStorage.getItem("isAdmin");

    // Check if token exists, meaning the user is already logged in
    if (token) {
        // Redirect logged-in users to dashboard
        window.location.href = "dashboard.html";
    } else if (isAdmin === "true") {
        // Redirect admin users who are not logged in to the registration page
        window.location.href = "register.html";
    }

    // If login form exists, add event listener
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;

            // Simple validation
            if (!email || !password) {
                alert("Please fill in both email and password.");
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            const loginButton = document.querySelector("#loginForm button");
            loginButton.disabled = true;
            loginButton.textContent = "Logging in...";

            try {
                const response = await fetch("http://localhost:8080/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                // Read the response as text first
                const responseText = await response.text();
                console.log("Server response:", responseText); // Log server response to help debugging

                if (response.ok) {
                    // If the response is a success message in text format
                    if (responseText.includes("Welcome")) {
                        // Assuming the responseText contains a welcome message and no JSON is needed
                        sessionStorage.setItem("token", responseText); // Store the token (or use another value if needed)

                        alert("Login successful!");
                        window.location.href = "dashboard.html"; // Redirect to dashboard
                    } else {
                        // If response doesn't contain a welcome message, handle as an error
                        alert("Login failed: " + responseText);
                    }
                } else {
                    // Handle errors (non-200 response codes)
                    alert("Login failed: " + responseText); // Show error message
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
            } finally {
                loginButton.disabled = false;
                loginButton.textContent = "Login";
            }
        });
    } else {
        console.error("Login form not found!");
    }
});
