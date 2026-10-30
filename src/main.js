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

// Elements
const daySelect = document.getElementById("day");
const unitsBtn = document.querySelector(".units-btn");
const searchBtn = document.querySelector(".search-btn");
const statusEl = document.querySelector(".search-status");
const dashboardEl = document.querySelector(".dashboard");
const errorEl = document.querySelector(".error-state");

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

render();

daySelect.addEventListener("change", (event) => {
    selectedDate = event.target.value;
    render();
});

unitsBtn.addEventListener("click", () => {
    units = units === "imperial" ? "metric" : "imperial";
    render();
});

