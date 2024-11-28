// Tilføj en event listener til kontaktformularen
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Forhindre standard formular indsendelse


    // Hent værdier fra inputfelterne
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const zipcode = document.getElementById('zipcode').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();


    // Opret kontakt-objekt
    const contact = { name, phone, zipcode, email, message };

    // Send en POST-forespørgsel til backend
    fetch('http://localhost:8080/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
        mode: 'cors'
    })
        .then(response => {
            if (!response.ok) {
                // Tjek for fejlstatus fra serveren
                throw new Error(`Server Error: ${response.status}`);
            }
            return response.text(); // Læs serverens svar som tekst
        })
        .then(message => {
            // Vis bekræftelsesbesked som popup
            alert(message);
            // Nulstil formularen
            document.getElementById('contact-form').reset();
        })
        .catch(error => {
            // Log og vis en fejlbesked
            console.error('Fejl:', error);
            alert('Der opstod en fejl. Prøv igen senere.');
        });
});
