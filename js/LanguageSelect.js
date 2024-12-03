let currentLanguage = 'en';

document.addEventListener('DOMContentLoaded', function() {
    loadLanguagePreference();
    loadContent();
});

function setLanguage(lang) {
    currentLanguage = lang;
    loadContent();
    saveLanguagePreference(lang);
    toggleLanguageOptions(false);
}

function loadContent() {
    fetch(`i18n/${currentLanguage}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching language file: ${currentLanguage}.json`);
            }
            return response.json();
        })
        .then(data => {
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const keys = element.getAttribute('data-i18n').split('.');
                let text = data;

                // Kontroller om hver nøgle findes i data
                for (let key of keys) {
                    if (text && text[key]) {
                        text = text[key];
                    } else {
                        text = undefined; // Hvis en nøgle mangler, så stop og gør tekst undefined
                        break;
                    }
                }

                // Hvis vi har tekst, opdater elementet
                if (text !== undefined) {
                    if (Array.isArray(text)) {
                        // Hvis teksten er en liste, og elementet er en liste (ul/ol), så fyld den med elementer
                        if (element.tagName.toLowerCase() === 'ul' || element.tagName.toLowerCase() === 'ol') {
                            element.innerHTML = ''; // Tømmer eksisterende indhold
                            text.forEach(item => {
                                const li = document.createElement('li');
                                li.textContent = item;
                                element.appendChild(li);
                            });
                        } else {
                            element.innerText = text.join(', '); // For andre elementer, sæt tekst
                        }
                    } else {
                        element.innerText = text; // Hvis det ikke er en liste, sæt normal tekst
                    }
                } else {
                    console.warn(`Missing translation for: ${element.getAttribute('data-i18n')}`);
                }
            });
        })
        .catch(error => console.error('Error loading i18n file:', error));
}

function saveLanguagePreference(lang) {
    localStorage.setItem('preferredLanguage', lang);
}

function loadLanguagePreference() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        currentLanguage = savedLang;
    }
}

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

// Event listener for the language change button
document.getElementById('lang-btn').addEventListener('click', (event) => {
    event.stopPropagation();
    toggleLanguageOptions();
});

// Close language options if clicked outside of the language selector
document.addEventListener('click', (event) => {
    const langSelector = document.querySelector('.language-selector');
    if (!langSelector.contains(event.target)) {
        toggleLanguageOptions(false);
    }
});
