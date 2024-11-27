// main.js

let currentLanguage = 'en';

// Function to set the language
function setLanguage(lang) {
    currentLanguage = lang;
    loadContent();
    saveLanguagePreference(lang);
    toggleLanguageOptions(false);
}

// Function to load content based on selected language
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
                    element.innerText = text;
                }
            });
        })
        .catch(error => {
            console.error('Error loading i18n file:', error);
        });
}

// Function to save language preference to localStorage
function saveLanguagePreference(lang) {
    localStorage.setItem('preferredLanguage', lang);
}

// Function to load language preference from localStorage
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

// Toggle navigation links on hamburger click
document.getElementById('hamburger').addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
});

// Initialize content on page load
document.addEventListener('DOMContentLoaded', () => {
    loadLanguagePreference();
    loadContent();
});
