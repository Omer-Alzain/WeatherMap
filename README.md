# WeatherMap 

Discover the weather anywhere in the world.

WeatherMap is a single-page web application that allows users to search for a location, explore it on an interactive map, and view its current weather conditions. It uses asynchronous JavaScript to retrieve geographic coordinates and weather information from external APIs without reloading the page.

## Live Demo

**Live website:** [https://omer-alzain.github.io/WeatherMap/]

## Features

* **Location Search:** Search for a city or location by name.
* **Interactive Map:** View locations on a map powered by Leaflet and OpenStreetMap.
* **Current Weather:** Display temperature, weather conditions, humidity, wind speed, and cloud coverage.
* **Map Markers and Popups:** Show the selected location and its weather information in a popup.
* **Loading Indicator:** Display a loading spinner while requests are being processed.
* **Error Handling:** Show user-friendly messages when location lookup or weather retrieval fails.
* **Weather Sharing:** Share weather information using the Web Share API or clipboard fallback.
* **Facebook Sharing:** Open Facebook's sharing interface for the current page.

##  Technologies Used

* **HTML5** — Page structure and content.
* **CSS3** — Styling, layout, and responsive design.
* **Vanilla JavaScript (ES6 Modules)** — Application logic and modular code organization.
* **Fetch API, Promises, and async/await** — Asynchronous HTTP requests.
* **Leaflet** — Interactive map rendering.
* **OpenStreetMap** — Map tiles.
* **Nominatim** — Location search and geocoding.
* **OpenWeatherMap Current Weather API** — Current weather data.

##  Project Structure

```text
WeatherMap/
├── index.html
├── README.md
├── .gitignore
├── css/
│   └── style.css
└── js/
    ├── app.js
    ├── geocoding.js
    ├── weather.js
    └── map.js
```

### JavaScript Modules

* **`app.js`** — Coordinates the search form, location lookup, weather retrieval, loading indicator, and error handling.
* **`geocoding.js`** — Retrieves geographic coordinates for a searched location using Nominatim.
* **`weather.js`** — Requests current weather information from OpenWeatherMap.
* **`map.js`** — Initializes the Leaflet map, updates its view, manages markers, and displays weather popups.

##  How It Works

1. The application initializes an interactive map centered on Khartoum, Sudan.
2. The user enters a location and submits the search form.
3. JavaScript prevents the default form submission, avoiding a full page reload.
4. The application sends an asynchronous request to Nominatim to retrieve the location's coordinates.
5. Using those coordinates, the application requests current weather data from OpenWeatherMap.
6. The map moves to the selected location, and a marker displays the weather information in a popup.
7. Loading and error states provide feedback throughout the process.

##  Getting Started

### Prerequisites

* A modern web browser.
* An internet connection.
* An OpenWeatherMap API key.

### Installation

1. Clone this repository:

   ```bash
   git clone (https://github.com/Omer-Alzain/WeatherMap)
   ```

2. Enter the project directory:

   ```bash
   cd WeatherMap
   ```

3. Configure your OpenWeatherMap API key in `js/weather.js`, where the application currently reads its key.

4. Serve the project using a local development web server. For example, if Python is installed:

   ```bash
   python -m http.server 8000
   ```

5. Open the following address in your browser:

   ```text
   http://localhost:8000
   ```

Because the application uses JavaScript ES modules, serving it over HTTP is preferable to opening `index.html` directly using a `file://` URL.

##  API Configuration and Security

WeatherMap uses the following external services:

* **Nominatim:** Resolves a location name into geographic coordinates.
* **OpenWeatherMap:** Retrieves current weather information using latitude and longitude.

Obtain an API key through the [OpenWeatherMap website](https://openweathermap.org/api), then configure it in `js/weather.js` according to the existing implementation.

**Security note:** This is a frontend-only application. An API key included in JavaScript is visible to visitors and cannot be made secret by placing it in a frontend `.env` file. Review the provider's usage terms and available key restrictions before publishing the application.

Please also respect the Nominatim usage policy when making geocoding requests.

##  Browser Compatibility

WeatherMap is designed for modern browsers that support JavaScript ES modules and the Fetch API. Sharing capabilities depend on browser support; where supported, the application uses the Web Share API, with clipboard copying as a fallback.

##  Project Context

WeatherMap was developed as a course project for **Advanced Web Technologies**. It demonstrates asynchronous API integration, modular JavaScript, dynamic DOM updates, interactive maps, and user-facing loading and error states.

##  License

No license has been specified yet. Add a license if you intend to permit others to reuse, modify, or distribute this project.
