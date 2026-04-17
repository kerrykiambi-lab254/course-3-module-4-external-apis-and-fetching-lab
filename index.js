// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
async function getWeatherAlerts(stateAbbr) {
  const alertsDisplay = document.getElementById('alerts-display');
  const errorMessage = document.getElementById('error-message');

  try {
    const response = await fetch(`${weatherApi}${stateAbbr}`);
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Success: Clear and hide error message
    errorMessage.textContent = "";
    errorMessage.classList.add('hidden');
    
    displayAlerts(data);
  } catch (error) {
    displayError(error.message);
  }
}

// 2. & 3. Display the Alerts and Clear UI
function displayAlerts(data) {
  const alertsDisplay = document.getElementById('alerts-display');
  
  // Clear previous results
  alertsDisplay.innerHTML = "";

  // Create Summary Message
  // The test expects "Weather Alerts: [count]"
  const count = data.features ? data.features.length : 0;
  const titleText = data.title || "Weather Alerts";
  
  const summary = document.createElement("h2");
  summary.textContent = `${titleText}: ${count}`;
  alertsDisplay.appendChild(summary);

  // Create List of Headlines
  const list = document.createElement("ul");
  if (data.features) {
    data.features.forEach(alert => {
      const li = document.createElement("li");
      li.textContent = alert.properties.headline;
      list.appendChild(li);
    });
  }
  alertsDisplay.appendChild(list);
}

// 4. Error Handling
function displayError(message) {
  const errorMessage = document.getElementById('error-message');
  const alertsDisplay = document.getElementById('alerts-display');

  // Clear previous alerts display
  alertsDisplay.innerHTML = "";
  
  // Display error and reveal the div
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
}

// Event Listener Setup
// We use a named function to ensure the listener attaches correctly in Jest
function initializeApp() {
  const fetchButton = document.getElementById('fetch-button');
  const stateInput = document.getElementById('state-input');

  if (fetchButton && stateInput) {
    fetchButton.addEventListener('click', () => {
      const stateAbbr = stateInput.value.trim().toUpperCase();
      
      // Clear the input field IMMEDIATELY to satisfy the clearing test
      stateInput.value = "";
      
      if (stateAbbr) {
        getWeatherAlerts(stateAbbr);
      } else {
        displayError("Please enter a state abbreviation.");
      }
    });
  }
}

// Standard listener attachment
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Export for Jest
if (typeof module !== "undefined") {
  module.exports = { getWeatherAlerts, displayAlerts, displayError };
}