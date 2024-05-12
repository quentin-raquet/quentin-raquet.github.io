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

function applyAppearanceEffect() {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        const distanceFromTop = section.getBoundingClientRect().top;
        section.style.opacity = distanceFromTop <= windowHeight / 2 ? '1' : '0.1';
    });
}

function animatedSkillsBar() {
    const bars = document.querySelectorAll('.skills-bar .bar');
    bars.forEach(bar => {
        const skillsBars = bar.parentElement;
        const percent = skillsBars.parentElement.getAttribute('data-percent');
        bar.style.width = percent + '%';
    });
}

function scrollToDiv(divId) {
    let target = document.getElementById(divId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

async function handleClickLink(event, page, divId) {
    event.preventDefault();
    await changeCurrentPage(page);
    scrollToDiv(divId);
}

async function loadContent(language, page, elementId) {
    const response = await fetch(`/${language}/${page}.html`);
    const data = await response.text();
    const element = document.getElementById(elementId);
    element.innerHTML = data;
    element.scrollTo({ top: 0, behavior: 'smooth' });
    element.addEventListener('scroll', applyBounceEffect);
    element.addEventListener('scroll', applyAppearanceEffect);
    animatedSkillsBar();

    if (elementId === 'menu') {
        const language = localStorage.getItem('language') || 'en';
        var checkbox = document.getElementById('toggle');
        checkbox.checked = (language === 'fr');

        const currentPage = localStorage.getItem('currentPage') || 'home';
        const links = element.querySelectorAll('a.nav-link');
        links.forEach(link => {
            let onclickValue = link.getAttribute('onclick');
            if (onclickValue.includes(`changeCurrentPage('${currentPage}')`)) {
                link.classList.add('current');
            } else {
                link.classList.remove('current');
            }
        });
    }

    return new Promise(resolve => {
        resolve();
    });
}

function changeLanguage() {
    const currentLanguage = localStorage.getItem('language') || 'en';
    localStorage.setItem('language', currentLanguage === 'en' ? 'fr' : 'en');
    navigate();
}

async function changeCurrentPage(page) {
    localStorage.setItem('currentPage', page);
    const language = localStorage.getItem('language') || 'en';
    location.hash = `${language}/${page}`;
    await loadContent(language, 'menu', 'menu');
    await loadContent(language, page, 'main-content');
}

function navigate() {
    const language = localStorage.getItem('language') || 'en';
    const currentPage = localStorage.getItem('currentPage') || 'home';
    location.hash = `${language}/${currentPage}`;
    loadContent(language, 'menu', 'menu');
    loadContent(language, currentPage, 'main-content');
}

navigate();

window.addEventListener('hashchange', function () {
    const currLang = localStorage.getItem('language') || 'en';
    const currPage = localStorage.getItem('currentPage') || 'home';
    const [newLang, newPage] = location.hash.slice(1).split('/');
    let isChanged = false;
    if (currLang !== newLang) {
        localStorage.setItem('language', newLang);
        isChanged = true;
    }
    if (currPage !== newPage) {
        localStorage.setItem('currentPage', newPage);
        isChanged = true;
    }
    if (isChanged) {
        navigate();
    }
});