// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
async function getWeatherAlerts(stateAbbr) {
    const errorMessage = document.getElementById('error-message');
    const displayDiv = document.getElementById('alerts-display');

    try {
        // FIX: Added backticks for the fetch URL
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

function displayAlerts(data) {
    const alertsDisplay = document.getElementById('alerts-display');
    alertsDisplay.innerHTML = "";

    // FIX: Hardcoded "Weather Alerts" to match the test's expected string
    const count = data.features ? data.features.length : 0;
    const summary = document.createElement("h2");
    
    // FIX: Added backticks here
    summary.textContent = `Weather Alerts: ${count}`;
    alertsDisplay.appendChild(summary);

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

function displayError(message) {
    const errorMessage = document.getElementById('error-message');
    const alertsDisplay = document.getElementById('alerts-display');

    alertsDisplay.innerHTML = "";
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function initializeApp() {
    const fetchButton = document.getElementById('fetch-button');
    const stateInput = document.getElementById('state-input');

    if (fetchButton && stateInput) {
        fetchButton.addEventListener('click', () => {
            const stateAbbr = stateInput.value.trim().toUpperCase();

            // Clear input immediately to satisfy the "Input clearing" test
            stateInput.value = "";
            
            if (stateAbbr) {
                getWeatherAlerts(stateAbbr);
            } else {
                displayError("Please enter a state abbreviation.");
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

if (typeof module !== "undefined") {
    module.exports = { getWeatherAlerts, displayAlerts, displayError };
}