import { CURRENT_RESPONSE } from "../tests/fixtures/open-meteo-current.js";
import { DAILY_RESPONSE } from "../tests/fixtures/open-meteo-daily.js";
import { HOURLY_RESPONSE } from "../tests/fixtures/open-meteo-hourly.js";
import { toCurrent, toDaily, toHourly, hoursForDay } from "./forecast.js";
import { renderCurrent, renderDaily, fillDaySelect, renderHourly} from "./render.js";
import { getForecast } from "./api.js";

// Entry point: turns the sample responses into Skyline's shapes, renders every panel,
// and redraws the hourly list when a different day is picked.
// The three fixture imports are temporary: Phase 4 replaces them with live requests.

const hours = toHourly(HOURLY_RESPONSE);
const current = toCurrent(CURRENT_RESPONSE);
const days = toDaily(DAILY_RESPONSE);

let units = "metric";
let selectedDate = days[0].date;

const daySelect = document.getElementById("day");
const unitsBtn = document.querySelector(".units-btn");



/** Draws every region from the current state. */
function render() {
    renderHourly(hoursForDay(hours, selectedDate), units);
    renderCurrent(current, "Charlotte, North Carolina", units);
    renderDaily(days, units);
    unitsBtn.textContent = units === "imperial" ? "Switch to metric" : "Switch to imperial";
}

fillDaySelect(days);
render();


daySelect.addEventListener("change", (event) => {
    selectedDate = event.target.value;
    render();
});

unitsBtn.addEventListener("click", () => {
    units = units === "imperial" ? "metric" : "imperial";
    render();
});

