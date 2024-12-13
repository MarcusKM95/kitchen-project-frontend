const BASE_URL = 'http://localhost:8080/api/gallery';

// Hent billeder og vis dem på siden
async function getImages() {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${BASE_URL}/images`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Fejl under hentning af billeder');
        }

        const images = await response.json();
        displayImages(images);
    } catch (error) {
        console.error('Error:', error);
        alert('Fejl ved hentning af billeder');
    }
}

// Vis billeder på siden
function displayImages(images) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Tøm galleriet før visning af billeder

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = `${BASE_URL}/images/${image}`;  // Vist som billede
        imgElement.alt = image;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Slet';
        deleteButton.onclick = () => deleteImage(image);

        const imageContainer = document.createElement('div');
        imageContainer.appendChild(imgElement);
        imageContainer.appendChild(deleteButton);

        gallery.appendChild(imageContainer);
    });
}

// Upload billede
async function uploadImage(fileInput) {
    const file = fileInput.files[0];
    if (!file) {
        alert('Vælg et billede at uploade');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${BASE_URL}/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Fejl under billede upload');
        }

        alert('Billede uploadet!');
        getImages(); // Opdater billedgalleriet
    } catch (error) {
        console.error('Error:', error);
        alert('Fejl ved upload af billede');
    }
}

// Slet billede
async function deleteImage(filename) {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${BASE_URL}/delete/${filename}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Fejl ved sletning af billede');
        }

        alert('Billede slettet');
        getImages(); // Opdater galleriet
    } catch (error) {
        console.error('Error:', error);
        alert('Fejl ved sletning af billede');
    }
}

// Kald getImages ved indlæsning af siden
document.addEventListener('DOMContentLoaded', getImages);

// Håndter billedupload, når en fil vælges
const uploadInput = document.getElementById('fileInput');
uploadInput.addEventListener('change', () => uploadImage(uploadInput));


console.log(image);

imgElement.src = `${BASE_URL}/images/${image}?token=${localStorage.getItem('authToken')}`;
