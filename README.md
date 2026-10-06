
# Skyline weather dashboard
 
Search any city to see its conditions right now, the next 24 hours on a chart, and the week ahead. Save the cities you care about and switch between them with one click. It keeps working offline, showing the last forecast it loaded.
 
Built in HTML, CSS, and JavaScript.
 
---
 

## Features
 
- [ ] City search with suggestions as you type, usable with the keyboard
- [ ] Current conditions: temperature, feels-like, wind, humidity, today's high and low
- [ ] Next 24 hours on a hand-drawn canvas chart, with exact values on hover
- [ ] 7-day forecast
- [ ] Saved cities and a °F / °C toggle that persist between visits
- [ ] Works offline with the last forecast loaded, labeled with its age
 
## Technical highlights
 
- **No API key.** Forecasts and city search come from [Open-Meteo](https://open-meteo.com), so there's no secret to expose in a browser-only app.
- **Instant unit switching.** Data is fetched in metric and converted in the browser, so toggling °F / °C never makes a new request.
- **Local times everywhere.** Each city's forecast is shown in that city's own time zone.
- **One module talks to the API.** The rest of the app works with Skyline's own forecast shape, so a change in the API touches a single file.
- **Offline support.** Settings live in `localStorage` and forecasts are cached in IndexedDB.
 

## Running locally
 
Clone the repository and serve the folder with any static server, then open the address it prints:
 
```bash
npx serve .
```
 
VS Code's Live Server extension works too. Opening `index.html` directly from disk won't work once the code uses ES modules.
 
## Credits
 
Weather data by [Open-Meteo](https://open-meteo.com), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
