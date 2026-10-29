const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

/**
 * Looks up a place by name.
 * @param {string} name - What the user typed, e.g. "Charlotte".
 * @returns {Promise<object|null>} The best match from the geocoding API, or null if nothing matched.
 */
export async function searchPlace(name) {
    const url = new URL(GEOCODING_URL);

    url.searchParams.set("name", name);
    url.searchParams.set("count", 1);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }
    const data = await response.json();
    // If there are any results (.results?.), returns first result from JSON or null
    return  data.results?.[0] ?? null;
}

/**
 * Loads current, daily, and hourly weather for a location in one request.
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<object>} The raw forecast response, ready for toCurrent, toDaily, and toHourly.
 */
export async function getForecast(latitude, longitude) {
    const url = new URL(FORECAST_URL);

    url.searchParams.set("latitude", latitude);
    url.searchParams.set("longitude", longitude);
    url.searchParams.set("current", "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m");
    url.searchParams.set("daily", "weather_code,temperature_2m_max,temperature_2m_min");
    url.searchParams.set("hourly", "temperature_2m,weather_code");
    url.searchParams.set("forecast_days", 7);
    url.searchParams.set("timezone", "auto");

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }
    
    return await response.json();
}
