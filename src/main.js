import { CURRENT_RESPONSE } from "../tests/fixtures/open-meteo-current.js";
import { DAILY_RESPONSE } from "../tests/fixtures/open-meteo-daily.js";
import { HOURLY_RESPONSE } from "../tests/fixtures/open-meteo-hourly.js";
import { toCurrent, toDaily, toHourly, hoursForDay } from "./forecast.js";
import { renderCurrent, renderDaily, fillDaySelect, renderHourly} from "./render.js";

// Entry point: turns the sample responses into Skyline's shapes, renders every panel,
// and redraws the hourly list when a different day is picked.
// The three fixture imports are temporary: Phase 4 replaces them with live requests.
const hours = toHourly(HOURLY_RESPONSE);
const current = toCurrent(CURRENT_RESPONSE);
const days = toDaily(DAILY_RESPONSE);

fillDaySelect(days);
renderHourly(hoursForDay(hours, days[0].date));
renderCurrent(current, "Charlotte, North Carolina");
renderDaily(days);


const daySelect = document.getElementById("day");

daySelect.addEventListener("change", (event) => {
    const daySelected = event.target.value;
    renderHourly(hoursForDay(hours, daySelected));
});
