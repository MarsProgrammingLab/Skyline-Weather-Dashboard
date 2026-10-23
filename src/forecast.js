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

/**
 * Converts Open-Meteo's daily forecast (one array per field) into one object per day.
 * Values are matched by position: day i takes element i of every daily array.
 * If an array is shorter than `time`, the days it doesn't cover get null for that field.
 * @param {object} api - The parsed Open-Meteo response, with a `daily` block.
 * @returns {Array<{ date: string, weatherCode: number|null,
 *   maxC: number|null, minC: number|null }>} A new array, one entry per date in `daily.time`.
 * @throws {TypeError} If `api.daily` is missing.
 */
export function toDaily(api) {
    const days = api.daily.time.map((dateVal, i) => ({ 
            date: dateVal,
            weatherCode: api.daily.weather_code[i] ?? null,
            maxC: api.daily.temperature_2m_max[i] ?? null,
            minC: api.daily.temperature_2m_min[i] ?? null
         }));
    return days;
}

