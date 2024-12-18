const apiUrl = 'http://localhost:8080/api/gallery/';  // Update with your backend URL

// Function to upload image
function uploadImage() {
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const uploadStatus = document.getElementById('uploadStatus');

    // Clear previous status
    uploadStatus.innerText = '';

    fetch(`${apiUrl}upload`, {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')  // Assuming JWT token is stored in localStorage
        }
    })
        .then(response => response.json())
        .then(data => {
            uploadStatus.innerText = 'Image uploaded successfully!';
            loadGallery();  // Reload the gallery after uploading
        })
        .catch(error => {
            uploadStatus.innerText = 'Error uploading image.';
            console.error('Error uploading image:', error);
        });
}




// Load the gallery when the page loads
document.addEventListener('DOMContentLoaded', loadGallery);


document.addEventListener('DOMContentLoaded', function() {
    // Now you are sure that the DOM is fully loaded
    loadGallery();
});

// Function to load images from the gallery
function loadGallery() {
    const galleryContainer = document.getElementById('galleryContainer');
    if (!galleryContainer) {
        console.error("Gallery container not found.");
        return; // Exit if the container doesn't exist
    }

    fetch(`${apiUrl}image`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        }
    })
        .then(response => response.json())
        .then(images => {
            galleryContainer.innerHTML = '';  // Clear the gallery before displaying new images

            if (images.length === 0) {
                galleryContainer.innerHTML = '<p>No images available</p>';
                return;
            }

            images.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = apiUrl + 'images/' + image;  // Assuming image path is in the response
                imgElement.alt = image;
                imgElement.onclick = () => viewImage(image);
                galleryContainer.appendChild(imgElement);
            });
        })
        .catch(error => {
            console.error('Error loading images:', error);
        });
}

// Function to view a clicked image in larger format
function viewImage(imageName) {
    const imageUrl = apiUrl + 'images/' + imageName;
    window.open(imageUrl, '_blank');  // Open the image in a new tab
}
