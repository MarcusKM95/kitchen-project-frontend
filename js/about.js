
const languages = {
    en: {
        aboutMe: {
            Title: "About Me",
            Description: "My name is Daud, and I am a passionate kitchen installer with over 10 years of experience in the industry. I love transforming kitchen dreams into reality and take pride in delivering craftsmanship of the highest quality. For me, every project is unique, and I always strive to exceed my customers' expectations."
        },
        aboutCompany: {
            Title: "About Our Company",
            Description: "TERLO Kitchen Montage was founded in 2002 with a single goal: to offer customized kitchen solutions that combine functionality and aesthetics. Over the years, we have had the pleasure of working with a wide range of customers, from private homeowners to larger companies. Our success is built on trust, quality, and a personal approach to every single project."
        },
        aboutSkills: {
            Title: "Our Expertise",
            Description: ["Precision Kitchen Installation", "Customized Designs", "High-Quality Craftsmanship", "Customer Satisfaction"]
        },
        nav: {
            forside: "Home",
            gallery: "Gallery",
            service: "Service",
            about: "About Us",
            contact: "Contact Us"
        },
        footer: {
            copyright: "© 2024 KitchenService. All rights reserved."
        }
    },
    da: {
        aboutMe: {
            Title: "Om Mig",
            Description: "Mit navn er Daud, og jeg er en passioneret køkkenmontør med over 10 års erfaring i branchen. Jeg elsker at gøre køkkendrømme til virkelighed og tager stolthed i at levere håndværk af højeste kvalitet. For mig er hvert projekt unikt, og jeg stræber altid efter at overgå mine kunders forventninger."
        },
        aboutCompany: {
            Title: "Om Vores Virksomhed",
            Description: "TERLO Kitchen Montage blev grundlagt i 2002 med ét mål: at tilbyde skræddersyede køkkenløsninger, der kombinerer funktionalitet og æstetik. Gennem årene har vi haft fornøjelsen af at arbejde med en bred vifte af kunder, fra private boligejere til større virksomheder. Vores succes bygger på tillid, kvalitet og en personlig tilgang til hvert eneste projekt."
        },
        aboutSkills: {
            Title: "Vores Ekspertise",
            Description: ["Præcision Køkkeninstallation", "Skræddersyede Designs", "Høj Kvalitet Håndværk", "Kundetilfredshed"]
        },
        nav: {
            forside: "Forside",
            gallery: "Galleri",
            service: "Service",
            about: "Om Os",
            contact: "Kontakt Os"
        },
        footer: {
            copyright: "© 2024 KitchenService. Alle rettigheder forbeholdes."
        }
    }
};

// Initialize with the default language or saved language
let currentLanguage = localStorage.getItem("preferredLanguage") || "en";

function loadContent() {
    const content = languages[currentLanguage];

    // Update text elements
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const keys = el.dataset.i18n.split(".");
        let translation = content;

        keys.forEach(key => {
            if (translation[key]) translation = translation[key];
        });

        if (Array.isArray(translation)) {
            el.innerHTML = translation.map(item => `<li>${item}</li>`).join("");
        } else {
            el.textContent = translation;
        }
    });
}

// Set the language and reload content
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem("preferredLanguage", lang);
    loadContent();
}

// Initialize page content
document.addEventListener("DOMContentLoaded", () => {
    loadContent();

    // Hamburger menu functionality
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });
});
