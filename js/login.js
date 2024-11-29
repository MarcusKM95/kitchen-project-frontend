document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const token = await response.text();
            localStorage.setItem("token", token);
            alert("Login successful!");
            window.location.href = "dashboard.html";
        } else {
            alert("Login failed!");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
