import { toCurrent, toDaily, toHourly, hoursForDay } from "./forecast.js";
import { renderCurrent, renderDaily, fillDaySelect, renderHourly } from "./render.js";
import { searchPlace, getForecast } from "./api.js";

// Entry point: holds the page state, draws it, and reacts to user input.

// State
let status = "loading";
let placeName = "";
let current = null;
let days = [];
let hours = [];
let units = "metric";
let selectedDate = null;
let lastQuery = "";

// Elements
const daySelect = document.getElementById("day");
const unitsBtn = document.querySelector(".units-btn");
const searchBtn = document.querySelector(".search-btn");
const statusEl = document.querySelector(".search-status");
const dashboardEl = document.querySelector(".dashboard");
const errorEl = document.querySelector(".error-state");
const formEl = document.getElementById("search-form");
const retryBtn = document.querySelector(".retry-btn");

/** Draws every region from the current state. */
function render() {
    dashboardEl.hidden = status !== "success";
    errorEl.hidden = status !== "error";
    statusEl.hidden = status !== "loading" && status !== "empty";

    statusEl.textContent = status === "loading" ? "Loading…" : "No search result found!";
    
    searchBtn.disabled = status === "loading";

    if (status === "success") {
        renderHourly(hoursForDay(hours, selectedDate), units);
        renderCurrent(current, placeName, units);
        renderDaily(days, units);
    }
    
    unitsBtn.textContent = units === "imperial" ? "Switch to metric" : "Switch to imperial";
}

/**
 * Searches for a place, loads its forecast, and updates the state for however it ends.
 * @param {string} query - The place name to search for.
 */
async function loadPlace(query) {
    lastQuery = query;
    status = "loading";

    render();

    try {
        const place = await searchPlace(query);

        if (place === null) {
            status = "empty";
        } else {
            const forecastData = await getForecast(place.latitude, place.longitude);

            current = toCurrent(forecastData);
            days = toDaily(forecastData);
            hours = toHourly(forecastData);

            placeName = `${place.name}, ${place.country}`;

            selectedDate = days[0].date;
            fillDaySelect(days);
            status = "success";
        }
    } catch (error) {
        console.error(error);
        status = "error";
    }

    render();
}

loadPlace("Charlotte");

// Event listeners
daySelect.addEventListener("change", (event) => {
    selectedDate = event.target.value;
    render();
});

unitsBtn.addEventListener("click", () => {
    units = units === "imperial" ? "metric" : "imperial";
    render();
});

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const query = event.target.elements.q.value.trim();
    if (query === "") return;

    loadPlace(query);
});

retryBtn.addEventListener("click", () => {
    loadPlace(lastQuery);
});
