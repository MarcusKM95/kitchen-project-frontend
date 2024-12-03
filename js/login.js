document.addEventListener("DOMContentLoaded", function () {
    const token = sessionStorage.getItem("token");
    const isAdmin = sessionStorage.getItem("isAdmin"); // Sørg for, at isAdmin er korrekt sat under login

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

                if (response.ok) {
                    const token = await response.text(); // Get the token from response
                    sessionStorage.setItem("token", token); // Store token in sessionStorage

                    // Optionally set isAdmin if response includes it
                    const userInfo = await response.json(); // Assuming the response has user data
                    if (userInfo.isAdmin) {
                        sessionStorage.setItem("isAdmin", "true"); // Store admin flag if needed
                    }

                    alert("Login successful!");
                    window.location.href = "dashboard.html"; // Redirect to dashboard
                } else if (response.status === 401) {
                    alert("Unauthorized: Invalid email or password.");
                } else {
                    const errorMessage = await response.text();
                    alert("Login failed: " + errorMessage);
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
