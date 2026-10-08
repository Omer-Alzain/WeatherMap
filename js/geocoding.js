export async function retrieveLocationData(location) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Unable to retrieve location.\nPlease try again later.`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Unable to retrieve location.\nPlease try again later.`);
    }
}