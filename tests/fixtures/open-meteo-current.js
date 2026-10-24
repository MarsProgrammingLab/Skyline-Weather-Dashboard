// Source: https://api.open-meteo.com/v1/forecast?latitude=35.23&longitude=-80.84&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&timezone=auto

export const CURRENT_RESPONSE = {
  "latitude": 35.216976,
  "longitude": -80.83189,
  "generationtime_ms": 0.28836727142333984,
  "utc_offset_seconds": -14400,
  "timezone": "America/New_York",
  "timezone_abbreviation": "GMT-4",
  "elevation": 239.0,
  "current_units": {
    "time": "iso8601",
    "interval": "seconds",
    "temperature_2m": "°C",
    "apparent_temperature": "°C",
    "relative_humidity_2m": "%",
    "precipitation": "mm",
    "weather_code": "wmo code",
    "wind_speed_10m": "km/h"
  },
  "current": {
    "time": "2026-10-24T18:15",
    "interval": 900,
    "temperature_2m": 16.5,
    "apparent_temperature": 13.6,
    "relative_humidity_2m": 47,
    "precipitation": 0.00,
    "weather_code": 0,
    "wind_speed_10m": 11.7
  }
};
