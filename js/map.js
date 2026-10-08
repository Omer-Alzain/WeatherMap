let map;
let marker;
const mapElement = document.getElementById('map');

export function initMap() {
    map = L.map(mapElement);
    map.setView([15.5007, 32.5599], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
}

export function moveMapToLocation(lat, lng) {
    map.setView([lat, lng], 10);
}

export function addMarker(lat, lng, weatherData) {
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker([lat, lng]).addTo(map);
    if (weatherData) {
        marker.bindPopup(`
            <div>
                <h3>${weatherData.location}</h3>
                <img src="https://openweathermap.org/img/wn/${weatherData.icon}.png" alt="${weatherData.status}">
                <p>Temperature: ${weatherData.temperature}°C</p>
                <p>Humidity: ${weatherData.humidity}%</p>
                <p>Wind Speed: ${weatherData.wind} m/s</p>
                <p>Clouds: ${weatherData.clouds}%</p>
                <p>Status: ${weatherData.status}</p>
                <button id="share-button">Share</button>
            </div>
        `);
        marker.on('popupopen', () => {
            const shareButton = document.getElementById('share-button');
            shareButton.addEventListener('click', () => {
                const shareData = {
                    title: 'Weather Information',
                    text: `Weather in ${weatherData.location}: ${weatherData.status}, Temperature: ${weatherData.temperature}°C, Humidity: ${weatherData.humidity}%, Wind Speed: ${weatherData.wind} m/s, Clouds: ${weatherData.clouds}%`,
                    url: window.location.href
                };
                if (navigator.share) {
                    navigator.share(shareData)
                        .then(() => console.log('Weather information shared successfully.'))
                        .catch((error) => new Error(`Error sharing weather information.Browser may not support sharing.`));
                } else {
                    navigator.clipboard.writeText(shareData.text + ' ' + shareData.url)
                        .then(() => alert('Weather information copied to clipboard.'))
                        .catch((error) => new Error(`Error copying weather information to clipboard.Browser may not support clipboard API.`));
                }
            });
        });
    }
}