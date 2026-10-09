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
            <div class="weather-popup">
                <h3 class="weather-popup__location">${weatherData.location}</h3>

                <div class="weather-popup__summary">
                    <img
                        class="weather-popup__icon"
                        src="https://openweathermap.org/img/wn/${weatherData.icon}@2x.png"
                        alt="${weatherData.status}"
                    >
                    <div class="weather-popup__temperature">
                        <span>${weatherData.temperature}°C</span>
                        <p>${weatherData.status}</p>
                    </div>
                </div>

                <div class="weather-popup__details">
                    <div class="weather-popup__detail">
                        <span class="weather-popup__label">Humidity</span>
                        <strong>${weatherData.humidity}%</strong>
                    </div>

                    <div class="weather-popup__detail">
                        <span class="weather-popup__label">Wind Speed</span>
                        <strong>${weatherData.wind} m/s</strong>
                    </div>

                    <div class="weather-popup__detail">
                        <span class="weather-popup__label">Clouds</span>
                        <strong>${weatherData.clouds}%</strong>
                    </div>
                </div>

                <div class="weather-popup__actions">
                    <button id="share-button" type="button">Share</button>
                    <button id="facebook-button" type="button">Share on Facebook</button>
                </div>
            </div>
        `);
        marker.on('popupopen', () => {
            const shareButton = document.getElementById('share-button');
            const facebookButton = document.getElementById('facebook-button');
            shareButton.addEventListener('click', () => {
                const shareData = {
                    title: 'Weather Information',
                    text: `Weather in ${weatherData.location}: ${weatherData.status}, Temperature: ${weatherData.temperature}°C, Humidity: ${weatherData.humidity}%, Wind Speed: ${weatherData.wind} m/s, Clouds: ${weatherData.clouds}%`,
                    url: window.location.href
                };
                if (navigator.share) {
                    navigator.share(shareData)
                        .then(() => console.log('Weather information shared successfully.'))
                        .catch((error) => alert('Error sharing weather information: ' + error));
                } else {
                    navigator.clipboard.writeText(shareData.text + ' ' + shareData.url)
                        .then(() => alert('Weather information copied to clipboard.'))
                        .catch((error) => alert('Error copying weather information to clipboard: ' + error));
                }
            });
            facebookButton.addEventListener('click', () => {
                const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`Weather in ${weatherData.location}: ${weatherData.status}, Temperature: ${weatherData.temperature}°C, Humidity: ${weatherData.humidity}%, Wind Speed: ${weatherData.wind} m/s, Clouds: ${weatherData.clouds}%`)}`;
                window.open(facebookShareUrl, '_blank');
            });
        });
        
    }
}