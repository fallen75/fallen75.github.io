const $form = document.querySelector('.form-promedio');
const sidebar = document.querySelector('.sidebar');

const $sidebar = document.querySelector('.sidebar');
const $overlay = document.getElementById('sidebarOverlay');
const $menuBtns = document.querySelectorAll('.menu-toggle--header, .menu-toggle');

const funcOverlay = () => {
    $sidebar.classList.toggle("is-visible")

    if (sidebar.classList.contains('is-visible')) {
        $overlay.classList.remove('is-active');
    } else {
        $overlay.classList.add('is-active');
    }
}

$menuBtns.forEach(menuBtn => {
    menuBtn.addEventListener("click", funcOverlay)
})

$overlay.addEventListener('click', funcOverlay);



