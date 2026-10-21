# Skyline
 
A weather app that answers "How's the sky looking today?" for any place in the world. Search a city to see current conditions, the next seven days, and an hour-by-hour forecast for any day of the week, in metric or imperial units.
 
Built with plain HTML, CSS, and JavaScript (no frameworks, no libraries, no build step), based on the [Weather app](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49) design from Frontend Mentor.
 
<!-- Add a screenshot or short GIF here once the layout is done: ![Skyline on desktop](docs/screenshot.png) -->
 
## Features
 
- [ ] Search any place by name, with suggestions as you type
- [ ] Current conditions: temperature, weather icon, place, and date
- [ ] Feels-like temperature, humidity, wind speed, and precipitation
- [ ] 7-day forecast with daily highs, lows, and icons
- [ ] Hourly forecast for any day of the week, picked from a day selector
- [ ] Units menu: switch everything between metric and imperial, or set temperature, wind, and precipitation units one at a time
- [ ] Responsive from 320 px phones to large desktops, with hover and focus states on every control
- [ ] Remembers your units and last search, and opens offline with the last forecast
## Technical highlights
 
- **No API key.** Forecasts and place search come from [Open-Meteo](https://open-meteo.com), so there's no secret to expose in a browser-only app.
- **Instant unit switching.** Data is fetched once in metric and converted in the browser, so changing units never makes a new request.
- **Local times everywhere.** Each place's forecast is shown in that place's own time zone.
- **One module talks to the API.** The rest of the app works with Skyline's own forecast shape, so an API change touches a single file.
- **Offline support.** Preferences live in `localStorage`; the last forecast is cached in IndexedDB.

## Decisions

**Unknown or missing weather codes fall back to the overcast icon.**
Open-Meteo describes the weather with a WMO code, and the design has an icon for each group of codes but none for "unknown". Any code outside the table, plus `undefined` and `null` (Open-Meteo uses `null` for gaps in its hourly data), returns `"overcast"`.

- *Why:* the code comes from the network, so a bad value shouldn't break the page. Overcast is the most neutral of the eight icons: a grey cloud doesn't claim sun, rain, or a storm, so it misleads the least.
- *Trade-off:* a bad or missing code shows up as overcast weather instead of failing loudly, so the bug is easy to miss. The alt text also says "Overcast" when the honest answer is "unknown".
- *Alternatives considered:* returning `null` (every caller would have to check before building an image path) and throwing an error (one bad hour would break the whole hourly list unless every render call caught it).
- *Follow-up:* when rendering, show "Weather unavailable" as the alt text for a missing code, so screen-reader users get the truth even though the icon is a fallback.

## Running locally
 
Clone the repository and serve the folder with any static server, then open the address it prints:
 
```bash
npx serve .
```
 
VS Code's Live Server extension works too. Opening `index.html` directly from disk won't work once the code uses ES modules.
 
## Credits
 
- Design: [Frontend Mentor — Weather app](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49)
- Weather data: [Open-Meteo](https://open-meteo.com), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
