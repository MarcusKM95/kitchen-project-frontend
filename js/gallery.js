// Asynkron funktion til at hente galleri-billeder
async function loadGallery() {
    try {
        const response = await fetch('/api/gallery/image', {
            headers: {
                'Authorization': 'Bearer YOUR_JWT_TOKEN' // Tilføj din token her
            }
        });

        if (response.ok) {
            const images = await response.json();
            const galleryContainer = document.getElementById('gallery');
            galleryContainer.innerHTML = ''; // Ryd galleriet før ny indlæsning

            images.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image.url; // Tilpas baseret på din backend
                imgElement.alt = image.title || 'Billede'; // Standardværdi, hvis titel mangler
                imgElement.addEventListener('click', () => openLightbox(image.url));
                galleryContainer.appendChild(imgElement);
            });
        } else {
            console.error('Fejl ved hentning af billeder:', response.statusText);
        }
    } catch (error) {
        console.error('En fejl opstod:', error);
    }
}

// Upload af billede
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch('/api/gallery/upload', {
            method: 'POST',
            body: formData,
        });

        const message = await response.text();
        document.getElementById('uploadStatus').innerText = message;

        if (response.ok) {
            await loadGallery(); // Indlæs galleriet igen efter succesfuld upload
        } else {
            console.error('Fejl ved upload:', message);
        }
    } catch (error) {
        console.error('En fejl opstod under upload:', error);
    }
});

// Slet billede
async function deleteImage(filename) {
    try {
        const response = await fetch(`/api/gallery/delete/${encodeURIComponent(filename)}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer YOUR_JWT_TOKEN'
            }
        });

        const message = await response.text();
        alert(message);

        if (response.ok) {
            await loadGallery(); // Indlæs galleriet igen efter succesfuld sletning
        } else {
            console.error('Fejl ved sletning:', message);
        }
    } catch (error) {
        console.error('En fejl opstod under sletning:', error);
    }
}

// Lightbox funktionalitet
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeButton = lightbox.querySelector('.close');
const prevButton = lightbox.querySelector('.prev');
const nextButton = lightbox.querySelector('.next');
let currentIndex = 0;
let galleryImages = [];

// Åbn lightbox
function openLightbox(src) {
    lightboxImage.src = src;
    lightbox.classList.remove('hidden');
}

// Luk lightbox
function closeLightbox() {
    lightbox.classList.add('hidden');
    lightboxImage.src = '';
}

// Skift billede i lightbox
function changeImage(direction) {
    currentIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
    lightboxImage.src = galleryImages[currentIndex].src;
}

// Zoom funktionalitet til lightbox-billede
let scale = 1;
lightboxImage.addEventListener('wheel', (e) => {
    e.preventDefault();
    scale += e.deltaY > 0 ? -0.1 : 0.1;
    scale = Math.max(1, Math.min(3, scale)); // Bevar zoom mellem 1 og 3
    lightboxImage.style.transform = `scale(${scale})`;
});

// Luk lightbox ved klik uden for billedet
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Event listeners til navigation og lukning
closeButton.addEventListener('click', closeLightbox);
prevButton.addEventListener('click', () => changeImage(-1));
nextButton.addEventListener('click', () => changeImage(1));

// Initialiser galleriet ved DOMContentLoaded
document.addEventListener('DOMContentLoaded', async () => {
    await loadGallery();

    // Opdater lightbox-billeder efter galleriet er hentet
    const galleryContainer = document.getElementById('gallery');
    galleryImages = Array.from(galleryContainer.querySelectorAll('img'));
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index;
            openLightbox(img.src);
        });
    });
});
