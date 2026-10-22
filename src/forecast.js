/**
 * Converts an Open-Meteo forecast response into Skyline's current-conditions shape.
 * Fields missing from the response become null (real zeros are kept).
 * Reading a response with no `current` block throws, because the request itself failed.
 * @param {object} api - The parsed Open-Meteo response, with `timezone` and `current`.
 * @returns {{ time: string|null, timezone: string|null, tempC: number|null,
 *   feelsLikeC: number|null, humidity: number|null, windKmh: number|null,
 *   precipMm: number|null, weatherCode: number|null }} A new object; `api` is not changed.
 * @throws {TypeError} If `api.current` is missing.
 */
export function toCurrent(api) {
    return { 
        time: api.current.time ?? null,
        timezone: api.timezone ?? null,
        tempC: api.current.temperature_2m ?? null,
        feelsLikeC: api.current.apparent_temperature ?? null,
        humidity: api.current.relative_humidity_2m ?? null,
        windKmh: api.current.wind_speed_10m ?? null,
        precipMm: api.current.precipitation ?? null,
        weatherCode: api.current.weather_code ?? null,
    }
}
