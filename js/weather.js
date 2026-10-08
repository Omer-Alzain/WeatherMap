export async function retrieveWeatherData(lat, lon) {
    const apiKey = '6fec7abb07725eadaf76560ed9d8e4b9'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Unable to retrieve weather information.\nPlease try again later.`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Unable to retrieve weather information.\nPlease try again later.`);
    }
}