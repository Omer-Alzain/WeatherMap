import {initMap,moveMapToLocation,addMarker} from "./map.js";
import {retrieveLocationData} from "./geocoding.js";
import {retrieveWeatherData} from "./weather.js";
initMap();

const form = document.getElementById('search-form');
const locationInput = document.getElementById('location-input');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const location = locationInput.value.trim();
    if (location) {
        try {
            const response = await retrieveLocationData(location);
            if (response && response.length > 0) {
                const { lat, lon } = response[0];
                const weatherData = await retrieveWeatherData(lat, lon);
                moveMapToLocation(lat, lon);
                addMarker(lat, lon, location);
                console.log(weatherData);
            } else {
                alert('Location not found.');
            }
        } catch (error) {
            console.error('Error retrieving location data:', error);
            alert('An error occurred while retrieving location data.');
        }
    }

})   