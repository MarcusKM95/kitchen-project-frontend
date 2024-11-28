document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const roles = document.getElementById('roles').value;

    const registerData = { email, pwd: password, roles };

    try {
        const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registerData),
        });

        if (response.ok) {
            alert('User successfully registered!');
            window.location.href = 'index.html'; // Redirect to login page
        } else {
            const errorData = await response.text();
            alert(`Error: ${errorData}`);
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred. Please try again.');
    }
});
