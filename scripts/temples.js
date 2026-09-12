// Display the current year in the footer copyright line
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Display the date the document was last modified
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

// ===== Hamburger menu =====
const menuBtn = document.getElementById("menuBtn");
const primaryNav = document.getElementById("primaryNav");
const hamburgerIcon = menuBtn.querySelector(".hamburger-icon");

menuBtn.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("nav-open");
  menuBtn.setAttribute("aria-expanded", isOpen);
  hamburgerIcon.innerHTML = isOpen ? "&#10005;" : "&#9776;";
});

// ===== Filtering (Home / Old / New) and sizing (Large / Small) =====
const navLinks = primaryNav.querySelectorAll("a");
const figures = document.querySelectorAll(".temple-grid figure");
const templeGrid = document.querySelector(".temple-grid");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const filter = link.dataset.filter;
    const size = link.dataset.size;

    if (filter) {
      // Home/Old/New: show or hide figures based on their data-era attribute
      figures.forEach((figure) => {
        const matches = filter === "all" || figure.dataset.era === filter;
        figure.classList.toggle("hidden", !matches);
      });

      // Only Home/Old/New links get the active highlight
      navLinks.forEach((navLink) => {
        if (navLink.dataset.filter) {
          navLink.classList.toggle("active", navLink === link);
        }
      });
    }

    if (size) {
      // Large/Small: change the grid's card size, independent of filtering
      templeGrid.classList.remove("size-large", "size-small");
      templeGrid.classList.add("size-" + size);
    }

    // Close the mobile menu after a selection is made
    primaryNav.classList.remove("nav-open");
    menuBtn.setAttribute("aria-expanded", "false");
    hamburgerIcon.innerHTML = "&#9776;";
  });
});
