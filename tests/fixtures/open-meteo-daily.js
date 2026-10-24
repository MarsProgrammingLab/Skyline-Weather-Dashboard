// Source: https://api.open-meteo.com/v1/forecast?latitude=35.23&longitude=-80.84&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto

export const DAILY_RESPONSE = {
  "latitude": 35.216976,
  "longitude": -80.83189,
  "generationtime_ms": 0.37407875061035156,
  "utc_offset_seconds": -14400,
  "timezone": "America/New_York",
  "timezone_abbreviation": "GMT-4",
  "elevation": 254.0,
  "daily_units": {
    "time": "iso8601",
    "weather_code": "wmo code",
    "temperature_2m_max": "°C",
    "temperature_2m_min": "°C"
  },
  "daily": {
    "time": [
      "2026-10-24",
      "2026-10-25",
      "2026-10-26",
      "2026-10-27",
      "2026-10-28",
      "2026-10-29",
      "2026-10-30"
    ],
    "weather_code": [
      3,
      3,
      0,
      2,
      3,
      3,
      0
    ],
    "temperature_2m_max": [
      18.5,
      19.7,
      21.8,
      23.5,
      21.1,
      21.3,
      24.9
    ],
    "temperature_2m_min": [
      8.2,
      7.5,
      6.6,
      11.0,
      11.6,
      10.8,
      10.8
    ]
  }
};
