const $button = document.getElementById("theme-toggle");

const storedTheme = localStorage.getItem("theme");

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

const currentTheme = storedTheme || systemTheme;

document.documentElement.setAttribute("data-theme", currentTheme);

$button.innerHTML = currentTheme === "dark"
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';

$button.addEventListener("click", () => {

    const theme =
        document.documentElement.getAttribute("data-theme");

    const newTheme =
        theme === "dark"
            ? "light"
            : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);

    localStorage.setItem("theme", newTheme);

    $button.innerHTML =
        newTheme === "dark"
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

});