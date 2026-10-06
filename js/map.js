let map;
const mapElement = document.getElementById('map');

export function initMap() {
    map = L.map(mapElement);
    map.setView([15.5007, 32.5599], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
}

export function moveMapToLocation(lat, lng) {
    map.setView([lat, lng], 10);
}

export function addMarker(lat, lng, popupText) {
    let marker = L.marker([lat, lng]).addTo(map);
    if (popupText) {
        marker.bindPopup(popupText);
    }
}