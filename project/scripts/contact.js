// Booking page: fill the service list, check the date, save requests in localStorage.
import { services } from "./data.js";

const REQUESTS_KEY = "benchtop-requests";
const SELECTED_KEY = "benchtop-selected-service";

const form = document.querySelector("#booking-form");
const serviceSelect = document.querySelector("#service");
const dropoffInput = document.querySelector("#dropoff");
const confirmation = document.querySelector("#confirmation");
const historySection = document.querySelector("#request-history");
const historyList = document.querySelector("#request-list");
const clearButton = document.querySelector("#clear-history");

function getRequests() {
  return JSON.parse(localStorage.getItem(REQUESTS_KEY)) ?? [];
}

function saveRequest(request) {
  const requests = getRequests();
  requests.push(request);
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
}

function formatDate(value) {
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

function fillServiceOptions() {
  const options = services.map((service) => `<option value="${service.id}">${service.name}</option>`);

  serviceSelect.innerHTML = `
    <option value="">Choose a service</option>
    ${options.join("")}
    <option value="other">Not sure yet</option>
  `;

  const savedChoice = localStorage.getItem(SELECTED_KEY);

  if (savedChoice) {
    serviceSelect.value = savedChoice;
    localStorage.removeItem(SELECTED_KEY);
  }
}

function setDateLimits() {
  const today = new Date().toISOString().split("T")[0];
  dropoffInput.min = today;
}

function checkDropoffDate() {
  const picked = new Date(`${dropoffInput.value}T00:00:00`);

  if (dropoffInput.value && picked.getDay() === 0) {
    dropoffInput.setCustomValidity("We are closed on Sundays. Please pick another day.");
  } else {
    dropoffInput.setCustomValidity("");
  }
}

function renderHistory() {
  const requests = getRequests();

  historySection.hidden = requests.length === 0;

  historyList.innerHTML = requests
    .slice()
    .reverse()
    .map((request) => `
      <li><strong>${request.reference}</strong>: ${request.serviceName}, drop-off ${formatDate(request.date)} (${request.urgency})</li>
    `)
    .join("");
}

function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(form);
  const service = services.find((item) => item.id === data.get("service"));

  const request = {
    id: Date.now(),
    name: data.get("name").trim(),
    email: data.get("email").trim(),
    device: data.get("device"),
    serviceName: service ? service.name : "Diagnosis (not sure yet)",
    date: data.get("dropoff"),
    urgency: data.get("urgency"),
    details: data.get("details").trim(),
    wantsUpdates: data.has("updates")
  };

  request.reference = `BR-${String(request.id).slice(-6)}`;
  saveRequest(request);

  const timing = request.urgency === "express"
    ? "Express repairs are aimed at the next business day."
    : "Standard repairs usually take 2 to 3 business days.";

  confirmation.textContent = `Thanks, ${request.name}. Request ${request.reference} for ${request.serviceName} is saved for ${formatDate(request.date)}. ${timing}`;
  confirmation.hidden = false;
  confirmation.focus();

  form.reset();
  renderHistory();
}

function clearHistory() {
  localStorage.removeItem(REQUESTS_KEY);
  renderHistory();
}

fillServiceOptions();
setDateLimits();
renderHistory();

dropoffInput.addEventListener("input", checkDropoffDate);
form.addEventListener("submit", handleSubmit);
clearButton.addEventListener("click", clearHistory);
