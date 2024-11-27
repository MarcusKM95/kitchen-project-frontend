// main.js

let currentLanguage = 'en';

// Function to set the language because we want to change the language later on MKM
function setLanguage(lang) {
    currentLanguage = lang;
    loadContent();
    saveLanguagePreference(lang);
    toggleLanguageOptions(false);
}

// Function to load content based on selected language from i18n files. Added functionality to handle lists MKM
function loadContent() {
    fetch(`i18n/${currentLanguage}.json`)
        .then(response => response.json())
        .then(data => {
            // Select all elements with data-i18n attribute
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const keys = element.getAttribute('data-i18n').split('.');
                let text = data;
                keys.forEach(key => {
                    text = text[key];
                });

                if (text) {
                    if (Array.isArray(text)) {
                        // If the element is a list and text is an array, populate list items
                        if (element.tagName.toLowerCase() === 'ul' || element.tagName.toLowerCase() === 'ol') {
                            element.innerHTML = ''; // Clear existing items
                            text.forEach(item => {
                                const li = document.createElement('li');
                                li.textContent = item;
                                element.appendChild(li);
                            });
                        } else {
                            // For other elements, join array into a string
                            element.innerText = text.join(', ');
                        }
                    } else {
                        element.innerText = text;
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error loading i18n file:', error);
        });
}

// Save to localStorage
function saveLanguagePreference(lang) {
    localStorage.setItem('preferredLanguage', lang);
}

// Loads language select from localStorage
function loadLanguagePreference() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        currentLanguage = savedLang;
    }
}

// Toggle language options visibility
function toggleLanguageOptions(show) {
    const langOptions = document.getElementById('lang-options');
    if (show === undefined) {
        langOptions.classList.toggle('hidden');
    } else if (show) {
        langOptions.classList.remove('hidden');
    } else {
        langOptions.classList.add('hidden');
    }
}

// Event listener for language button
document.getElementById('lang-btn').addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent event from bubbling up to document
    toggleLanguageOptions();
});

// Close language options when clicking outside
document.addEventListener('click', (event) => {
    const langSelector = document.querySelector('.language-selector');
    if (!langSelector.contains(event.target)) {
        toggleLanguageOptions(false);
    }
});

// Toggle navigation links on hamburger click //Maybe delete
document.getElementById('hamburger').addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
});

// Initialize content on page load
document.addEventListener('DOMContentLoaded', () => {
    loadLanguagePreference();
    loadContent();
});
