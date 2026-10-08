// Services page: show, filter, sort and choose services.
import { services } from "./data.js";

const SELECTED_KEY = "benchtop-selected-service";

const serviceList = document.querySelector("#service-list");
const serviceStatus = document.querySelector("#service-status");
const filterButtons = document.querySelectorAll(".filter-button");
const sortSelect = document.querySelector("#sort");

const view = { category: "all", sort: "default" };

function getVisibleServices() {
  const matches = view.category === "all"
    ? [...services]
    : services.filter((service) => service.category === view.category);

  if (view.sort === "price-low") {
    matches.sort((a, b) => a.price - b.price);
  } else if (view.sort === "price-high") {
    matches.sort((a, b) => b.price - a.price);
  }

  return matches;
}

function renderServices() {
  const visible = getVisibleServices();

  serviceList.innerHTML = visible.map((service) => `
    <li class="service-card">
      <img src="${service.image}" alt="${service.imageAlt}" width="120" height="120" loading="lazy">
      <div>
        <h3>${service.name}</h3>
        <p>${service.summary}</p>
        <p class="meta"><span>From $${service.price}</span><span>${service.days}</span></p>
        <button type="button" class="button button-small" data-id="${service.id}">Choose this service</button>
      </div>
    </li>
  `).join("");

  serviceStatus.textContent = `Showing ${visible.length} of ${services.length} services`;
}

function setCategory(category) {
  view.category = category;

  filterButtons.forEach((button) => {
    button.setAttribute("aria-pressed", `${button.dataset.category === category}`);
  });

  renderServices();
}

function chooseService(id) {
  const chosen = services.find((service) => service.id === id);

  if (!chosen) {
    return;
  }

  localStorage.setItem(SELECTED_KEY, chosen.id);
  window.location.href = "contact.html";
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setCategory(button.dataset.category));
});

sortSelect.addEventListener("change", () => {
  view.sort = sortSelect.value;
  renderServices();
});

serviceList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");

  if (button) {
    chooseService(button.dataset.id);
  }
});

renderServices();
