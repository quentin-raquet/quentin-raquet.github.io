// Sélectionnez tous les liens de la navigation
const navLinks = document.querySelectorAll('nav ul li a');

// Ajoutez un écouteur d'événements à chaque lien
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Empêcher le comportement par défaut du lien

        const targetId = link.getAttribute('href'); // Obtenir l'ID de la cible
        const targetTab = document.querySelector(targetId); // Sélectionner l'élément avec cet ID

        // Déplacez la fenêtre de visualisation jusqu'à la section cible
        targetTab.scrollIntoView({ behavior: 'smooth' });
    });
});