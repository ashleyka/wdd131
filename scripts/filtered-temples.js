// Display the current year in the footer copyright line
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Display the date the document was last modified
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

// ===== Temple data =====
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Added by Ashley
  {
    templeName: "Harare Zimbabwe",
    location: "Harare, Zimbabwe",
    dedicated: "2026, March, 1",
    area: 17250,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/qmtphag0tdp0sot6yoiejjv9wx6arx7gcu0k4vl0/full/400%2C/0/default"
  },
  {
    templeName: "Johannesburg South Africa",
    location: "Johannesburg, South Africa",
    dedicated: "1985, August, 24",
    area: 19184,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/b378c080e5880db5bf2bcf6d828b2f3fd59820de/full/400%2C/0/default"
  },
  {
    templeName: "Durban South Africa",
    location: "Umhlanga, South Africa",
    dedicated: "2020, February, 16",
    area: 19860,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/8b3f1b895a7c92ee66c2d0c7e78606f75f0d0cc8/full/400%2C/0/default"
  }
];

// ===== Rendering =====
const templeGrid = document.getElementById("templeGrid");

// "2005, August, 7" -> "August 7, 2005"
function formatDedicated(dateStr) {
  const [year, month, day] = dateStr.split(",").map((part) => part.trim());
  return `${month} ${day}, ${year}`;
}

function templeCardHTML(temple) {
  return `
    <figure class="temple-card">
      <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy">
      <figcaption>
        <p class="temple-name">${temple.templeName}</p>
        <p class="temple-location">${temple.location}</p>
        <p class="temple-dedicated">Dedicated: ${formatDedicated(temple.dedicated)}</p>
        <p class="temple-area">${temple.area.toLocaleString()} sq ft</p>
      </figcaption>
    </figure>
  `;
}

function renderTemples(list) {
  templeGrid.innerHTML = list.length
    ? list.map(templeCardHTML).join("")
    : `<p class="no-results">No temples match this filter.</p>`;
}

renderTemples(temples);

// ===== Hamburger menu =====
const menuBtn = document.getElementById("menuBtn");
const primaryNav = document.getElementById("primaryNav");
const hamburgerIcon = menuBtn.querySelector(".hamburger-icon");

menuBtn.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("nav-open");
  menuBtn.setAttribute("aria-expanded", isOpen);
  hamburgerIcon.innerHTML = isOpen ? "&#10005;" : "&#9776;";
});

// ===== Filters (Home / Old / New / Large / Small) =====
function getDedicatedYear(temple) {
  return parseInt(temple.dedicated.split(",")[0], 10);
}

const filters = {
  all: () => true,
  old: (temple) => getDedicatedYear(temple) < 1900,
  new: (temple) => getDedicatedYear(temple) > 2000,
  large: (temple) => temple.area > 90000,
  small: (temple) => temple.area < 10000
};

const navLinks = primaryNav.querySelectorAll("a[data-filter]");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const filterName = link.dataset.filter;
    renderTemples(temples.filter(filters[filterName]));

    navLinks.forEach((navLink) => navLink.classList.toggle("active", navLink === link));

    // Close the mobile menu after a selection is made
    primaryNav.classList.remove("nav-open");
    menuBtn.setAttribute("aria-expanded", "false");
    hamburgerIcon.innerHTML = "&#9776;";
  });
});
