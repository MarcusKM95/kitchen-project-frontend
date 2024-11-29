document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:8080/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
