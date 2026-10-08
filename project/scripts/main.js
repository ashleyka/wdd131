// Runs on every page: mobile menu and footer year.
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");
const copyright = document.querySelector("#copyright");

function setupMenu() {
  header.classList.add("js-nav");

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", `${isOpen}`);
    navToggle.textContent = isOpen ? "Close" : "Menu";
  });
}

function showYear() {
  const year = new Date().getFullYear();
  copyright.textContent = `© ${year} Benchtop Repair. All rights reserved.`;
}

setupMenu();
showYear();
