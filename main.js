document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        // Remove 'current' class from all nav-links
        document.querySelectorAll('.nav-link').forEach(nav => {
            nav.classList.remove('current');
        });
        // Add 'current' class to clicked link
        this.classList.add('current');
        const url = new URL(e.target.href);
        const path = url.pathname;
        loadPage(path);
    });
});


function applyBounceEffect() {
    const mainContent = document.getElementById('main-content');
    const scrollTop = mainContent.scrollTop;
    const scrollHeight = mainContent.scrollHeight;
    const clientHeight = mainContent.clientHeight;
    const threshold = 5; // Adjust this value as needed

    if (scrollTop === 0) {
        mainContent.style.animation = 'bounce_top 0.5s';
    } else if (scrollHeight - scrollTop <= clientHeight + threshold) {
        mainContent.style.animation = 'bounce_bottom 0.5s';
    } else {
        mainContent.style.animation = '';
    }
}

function applyAppearenceEffect() {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        const distanceFromTop = section.getBoundingClientRect().top;
        if (distanceFromTop <= windowHeight / 2) {
            section.style.opacity = '1';
        } else {
            section.style.opacity = '0.1';
        }
    });
}

function animatedSkillsBar() {
    let bars = document.querySelectorAll('.skills-bar .bar');
    bars.forEach(bar => {
        let skillsBars = bar.parentElement;
        let percent = skillsBars.parentElement.getAttribute('data-percent');
        bar.style.width = percent + '%';
    });
}

function loadPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const mainContent = document.getElementById('main-content');
            mainContent.innerHTML = data;
            // Scroll main-content to top after new content is loaded
            mainContent.scrollTop = 0;
            mainContent.addEventListener('scroll', applyBounceEffect);
            mainContent.addEventListener('scroll', applyAppearenceEffect);
            animatedSkillsBar();
        });
}



// Load the home page by default
loadPage('home.html');
