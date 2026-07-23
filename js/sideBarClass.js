const toggleBtn = document.querySelector('.menu-toggle--header');
const sidebar = document.querySelector('.sidebar');
const overlay = document.getElementById('sidebarOverlay');
const $mainContent = document.querySelector('.main-content');
const $containerGlobal = document.querySelector('.container-global');

function toggleMenu() {
    //sidebar.classList.toggle('active');
    //overlay.classList.toggle('active');
    //$mainContent.classList.toggle('no-scroll');
    //$containerGlobal.classList.toggle('no-scroll');
    document.documentElement.classList.toggle('no-scroll');
    document.body.classList.toggle('no-scroll');
}

// Abrir/Cerrar con el botón
toggleBtn.addEventListener('click', toggleMenu);

// Cerrar si el usuario hace clic en el fondo oscuro
overlay.addEventListener('click', toggleMenu);