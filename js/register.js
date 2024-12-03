document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;

    const token = localStorage.getItem("token");

    if (!token) {
        alert("You need to log in first.");
        return;
    }

    // Input validation
    if (!email || !username || !phone || !password) {
        alert("All fields are required.");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (phone.length < 8 || isNaN(phone)) {
        alert("Please enter a valid phone number.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    const registerButton = document.querySelector("#registerForm button");
    registerButton.disabled = true;
    registerButton.textContent = "Registering...";

    try {
        const response = await fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({email, username, phone, password}),
        });

        if (response.ok) {
            alert("User registered successfully!");
            window.location.href = "login.html";
        } else if (response.status === 401) {
            alert("Session expired. Please log in again.");
            localStorage.removeItem("token");
            window.location.href = "login.html";
        } else if (response.status === 400) {
            alert("Bad Request: Please check your input.");
        } else if (response.status === 409) {
            alert("Conflict: User already exists.");
        } else {
            const errorMessage = await response.text();
            alert("Registration failed: " + errorMessage);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    } finally {
        registerButton.disabled = false;
        registerButton.textContent = "Register";
    }
});

