const apiBaseUrl = 'http://localhost:8080/api/gallery'; // API Base URL

// Når siden indlæses, hent galleriet
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
});

// Funktion til at hente billeder fra API og vise dem
async function loadGallery() {
    const imageList = document.getElementById('imageList');
    imageList.innerHTML = ''; // Ryd listen for gamle billeder

    try {
        // Hent billeder med godkendelse
        const response = await fetch(`${apiBaseUrl}/images`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Godkendelses-header
            },
        });

        if (response.ok) {
            const images = await response.json(); // Konverter respons til JSON

            images.forEach((imageName) => {
                const listItem = document.createElement('li');
                listItem.classList.add('image-item');

                const img = document.createElement('img');
                img.src = `${apiBaseUrl}/image/${imageName}`;
                img.alt = imageName;
                img.classList.add('gallery-image');

                listItem.appendChild(img);
                imageList.appendChild(listItem);
            });
        } else {
            console.error('Kunne ikke hente billeder:', response.statusText);
            imageList.innerHTML = 'Kunne ikke hente billeder. Tjek godkendelsen.';
        }
    } catch (error) {
        console.error('Fejl ved indlæsning af billeder:', error);
        imageList.innerHTML = 'Serverfejl ved indlæsning af billeder.';
    }
}

// Håndter upload af billeder
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Forhindrer siden i at reloade

    const fileInput = document.getElementById('imageFile');
    const uploadMessage = document.getElementById('uploadMessage');

    if (fileInput.files.length === 0) {
        uploadMessage.textContent = 'Vælg en fil før upload!';
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]); // Tilføj fil til formData

    try {
        const response = await fetch(`${apiBaseUrl}/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Tilføj godkendelse
            },
            body: formData
        });

        if (response.ok) {
            uploadMessage.textContent = 'Billede uploadet med succes!';
            loadGallery(); // Genindlæs galleriet for at vise det nye billede
        } else {
            console.error('Fejl ved upload:', response.statusText);
            uploadMessage.textContent = 'Upload mislykkedes. Tjek din godkendelse.';
        }
    } catch (error) {
        console.error('Serverfejl ved upload:', error);
        uploadMessage.textContent = 'Der opstod en fejl ved upload.';
    }
});

// Håndter skift mellem Grid og Liste view
document.getElementById('toggleView').addEventListener('click', () => {
    const imageList = document.getElementById('imageList');
    const toggleButton = document.getElementById('toggleView');

    if (imageList.classList.contains('list-view')) {
        imageList.classList.remove('list-view');
        imageList.classList.add('grid-view');
        toggleButton.textContent = 'Skift til Liste View';
    } else {
        imageList.classList.remove('grid-view');
        imageList.classList.add('list-view');
        toggleButton.textContent = 'Skift til Grid View';
    }
});

// Tjek, om token findes ved indlæsning
if (!localStorage.getItem('token')) {
    alert('Du skal logge ind først!');
    window.location.href = 'register.html'; // Send brugeren til login siden
}
