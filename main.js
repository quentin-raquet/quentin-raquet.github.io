document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
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

window.addEventListener("scroll",function(){
    const windowScrollTop = window.scrollTop;
    const elementToHide = document.getElementById("main-content");
  
    elementToHide.style.clipPath = `inset(${windowScrollTop}px 0 0 0)`;
  });


function loadPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('main-content').innerHTML = data;
        });
}

// Load the home page by default
loadPage('home.html');