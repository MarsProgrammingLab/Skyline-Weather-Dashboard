// src/forecast.js

// toCurrent(api)
//   input:  the whole Open-Meteo response object
//   output: a NEW object in Skyline's shape (the table above)
//
//   - read from two levels: most fields are inside api.current,
//     but timezone is on api itself (2.1.2, nested objects)
//   - build and return one object literal; don't change api (2.1.8)
//   - a missing field becomes null, not undefined (decide with ??, 1.2.9)
//     why null: it's an explicit "no value", and format.js already
//     shows "-" for anything that isn't a finite number
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
