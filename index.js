// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
document.addEventListener("DOMContentLoaded", function () {
  const weatherApi = "https://api.weather.gov/alerts/active?area=";
  const btnFetch = document.getElementById("fetch-alerts");
  const alertDiv = document.getElementById("alerts-display");
  const errorDiv = document.getElementById("error-message");

  btnFetch.addEventListener("click", () => {
    const stateTxt = document.getElementById("state-input");
    const state = stateTxt.value.trim();

    stateTxt.value = "";

    if (state.length === 2 && state === state.toUpperCase()) {
      fetchWeatherAlerts(state);
    } else {
      displayError("Invalid Input");
    }
  });

  function fetchWeatherAlerts(state) {
    fetch(weatherApi + state)
      .then((response) => response.json())
      .then((data) => displayAlerts(data))
      .catch((error) => displayError(error.message));
  }

  function displayAlerts(data) {
    alertDiv.innerHTML = "";
    errorDiv.classList.add("hidden");
    errorDiv.innerHTML = "";

    const count = data.features.length;

    const headerTitle = document.createElement("h3");
    const headerCount = document.createElement("h3");
     headerTitle.textContent = data.title;
    headerCount.textContent = `Weather Alerts: ${count}`;
    alertDiv.appendChild(headerTitle);
    alertDiv.appendChild(headerCount);

    data.features.forEach((item) => {
      const p = document.createElement("p");
      p.textContent = item.properties.headline;
      alertDiv.appendChild(p);
    });
  }

  function displayError(message) {
    alertDiv.innerHTML = "";
    errorDiv.classList.remove("hidden");
    errorDiv.textContent = message;
  }
});