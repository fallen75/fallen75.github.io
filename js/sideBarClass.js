const toggleBtn = document.querySelector('.menu-toggle--header');
const sidebar = document.querySelector('.sidebar');
const overlay = document.getElementById('sidebarOverlay');
const body = document.body;

function toggleMenu() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('no-scroll');
}

// Abrir/Cerrar con el botón
toggleBtn.addEventListener('click', toggleMenu);

// Cerrar si el usuario hace clic en el fondo oscuro
overlay.addEventListener('click', toggleMenu);