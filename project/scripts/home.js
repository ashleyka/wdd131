// Home page: the "what is your computer doing?" helper.
const diagnoses = {
  slow: {
    cause: "A crowded or old hard drive, or too many startup programs.",
    advice: "A tune-up or a solid state drive upgrade usually makes it feel new again."
  },
  "no-power": {
    cause: "A dead battery, a faulty charger or a failed power board.",
    advice: "Bring it in with the charger and we will test each part in the free diagnosis."
  },
  hot: {
    cause: "Dust blocking the fan or dried-out thermal paste.",
    advice: "Cleaning the fan and replacing the paste fixes most overheating."
  },
  popups: {
    cause: "Malware or a browser extension that you did not choose.",
    advice: "Stop entering passwords on it and book a malware removal."
  },
  cracked: {
    cause: "Physical damage to the display panel.",
    advice: "The screen can be replaced. Your files are not affected."
  },
  clicking: {
    cause: "A hard drive that is starting to fail.",
    advice: "Turn it off now and book data recovery before the drive gets worse."
  }
};

const symptomSelect = document.querySelector("#symptom");
const result = document.querySelector("#diagnosis-result");

function showDiagnosis() {
  const match = diagnoses[symptomSelect.value];

  if (!match) {
    result.textContent = "Pick a symptom to see the most likely cause.";
    return;
  }

  result.innerHTML = `
    <p><strong>Most likely cause:</strong> ${match.cause}</p>
    <p>${match.advice}</p>
    <a class="button button-small" href="services.html">See matching services</a>
  `;
}

symptomSelect.addEventListener("change", showDiagnosis);
