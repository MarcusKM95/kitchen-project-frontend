document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    const token = localStorage.getItem("token");  // Get the stored JWT token

    if (!token) {
        alert("You need to log in first.");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,  // Send token in the Authorization header
            },
            body: JSON.stringify({ email, username, phone, password }),
        });

        if (response.ok) {
            alert("User registered successfully!");
            window.location.href = "login.html";
        } else {
            const errorMessage = await response.text();
            alert("Registration failed: " + errorMessage);
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
