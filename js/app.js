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
                const {temperature, humidity,wind,clouds,status,icon} = {temperature: weatherData.main.temp, humidity: weatherData.main.humidity, wind: weatherData.wind.speed, clouds: weatherData.clouds.all, status: weatherData.weather[0].main, icon: weatherData.weather[0].icon}
                moveMapToLocation(lat, lon);
                addMarker(lat, lon, {location, temperature, humidity, wind, clouds, status, icon});
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