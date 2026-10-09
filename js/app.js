import {initMap,moveMapToLocation,addMarker} from "./map.js";
import {retrieveLocationData} from "./geocoding.js";
import {retrieveWeatherData} from "./weather.js";
initMap();

const form = document.getElementById('search-form');
const locationInput = document.getElementById('location-input');
const loadingIndicator = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const errorContainer = document.getElementById('error-container');
const okButton = document.getElementById('ok-button');

okButton.addEventListener('click', () => {
    errorContainer.classList.add('hidden');
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const location = locationInput.value.trim();
    if (location) {
        loadingIndicator.classList.remove('hidden');
        try {
            const response = await retrieveLocationData(location);
            if (response && response.length > 0) {
                const { lat, lon } = response[0];
                const weatherData = await retrieveWeatherData(lat, lon);
                const {temperature, humidity,wind,clouds,status,icon} = {temperature: weatherData.main.temp, humidity: weatherData.main.humidity, wind: weatherData.wind.speed, clouds: weatherData.clouds.all, status: weatherData.weather[0].main, icon: weatherData.weather[0].icon}
                moveMapToLocation(lat, lon);
                addMarker(lat, lon, {location, temperature, humidity, wind, clouds, status, icon});
            } else {
                errorMessage.textContent = 'Location not found.';
                errorContainer.classList.remove('hidden');
            }
        } catch (error) {
            errorMessage.textContent = error.message;
            errorContainer.classList.remove('hidden');
        }finally {
            loadingIndicator.classList.add('hidden');
        }
    }else {
        errorMessage.textContent = 'Please enter a location.';
        errorContainer.classList.remove('hidden');
    }

})   