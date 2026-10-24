import { formatTemp, formatWind, formatPrecip, getHour, formatHour } from "./format.js";
import { weatherCodeToIcon, iconPath, iconLabel } from "./weather-codes.js";

// Selectors
const placeEl =  document.querySelector("#location-title");
const dateEl = document.querySelector(".today-place time");
const tempEl   = document.querySelector(".location-temp");
const iconEl   = document.querySelector(".today-icon");
const feelsEl  = document.querySelector(".metric-feels");
const humidEl  = document.querySelector(".metric-humidity");
const windEl   = document.querySelector(".metric-wind");
const precipEl = document.querySelector(".metric-precip");
const dayListEl     = document.querySelector(".day-list");
const dayTemplateEl = document.querySelector("#day-template");
const hourListEl = document.querySelector(".hourly-row");
const hourTemplateEl = document.querySelector("#hour-template");
const daySelectEl = document.querySelector(".day");

// Date formatters
// Example output: "Thursday, October 22, 2026"
const longDate = new Intl.DateTimeFormat("en-US", 
    {
        weekday: "long", 
        month: "long", 
        day: "numeric", 
        year: "numeric"
    });

// Example output: "Thursday"
const weekDay = new Intl.DateTimeFormat("en-US", 
    {
        weekday: "long", 
        timeZone: "UTC" 
    });

/**
 * Fills the current-conditions card.
 * @param {object} current - From toCurrent.
 * @param {string} placeName - Shown as the heading, e.g. "Charlotte, North Carolina".
 */
export function renderCurrent(current, placeName) {
    // current -> object from toCurrent
    // placeName -> name of location (e.g. Charlotte, North Carolina)
    const iconKey = weatherCodeToIcon(current.weatherCode);

    placeEl.textContent = placeName;
    dateEl.textContent = longDate.format(new Date(current.time));
    dateEl.dateTime = current.time.slice(0,10);
    tempEl.textContent = formatTemp(current.tempC);
    iconEl.src = iconPath(iconKey);
    iconEl.alt = iconLabel(iconKey);
    feelsEl.textContent = formatTemp(current.feelsLikeC);
    humidEl.textContent = `${current.humidity}%`;
    windEl.textContent = formatWind(current.windKmh, "km/h");
    precipEl.textContent = formatPrecip(current.precipMm, "mm");
}

/**
 * Draws one card per day in the 7-day list, replacing what was there.
 * @param {object[]} days - From toDaily.
 */
export function renderDaily(days) {
    const items = days.map(createDay);
    dayListEl.replaceChildren(...items);
}

/**
 * Builds one day card from the day template.
 * @param {object} day - One entry from toDaily.
 * @returns {HTMLLIElement} The filled <li>, not yet on the page.
 */
function createDay(day) {
    // day -> one object from toDaily: { date, weatherCode, maxC, minC }
    const li = dayTemplateEl.content.firstElementChild.cloneNode(true);
    // find elements inside li
    const timeEl = li.querySelector("time");
    const imgEl = li.querySelector("img");
    const highEl = li.querySelector(".high-temp");
    const lowEl = li.querySelector(".low-temp");

    timeEl.textContent = weekDay.format(new Date(day.date));
    timeEl.dateTime = day.date;
    const iconKey = weatherCodeToIcon(day.weatherCode);

    imgEl.src = iconPath(iconKey);
    imgEl.alt = iconLabel(iconKey);

    highEl.textContent = formatTemp(day.maxC);
    lowEl.textContent = formatTemp(day.minC);

    return li;
}

/**
 * Fills the day dropdown: weekday names as the text, dates as the values.
 * @param {object[]} days - From toDaily.
 */
export function fillDaySelect(days) {
    daySelectEl.replaceChildren(...days.map((day) => new Option(weekDay.format(new Date(day.date)), day.date)));
}

/**
 * Builds one hour row from the hour template.
 * @param {object} hour - One entry from toHourly.
 * @returns {HTMLLIElement} The filled <li>, not yet on the page.
 */
function createHour(hour) {
    // hour -> one object from toHourly: { time, tempC, weatherCode }
    const li = hourTemplateEl.content.firstElementChild.cloneNode(true);
    const imgEl = li.querySelector("img");
    const timeEl = li.querySelector("time");
    const hourTempEl = li.querySelector(".hourly-temp");

    const iconKey = weatherCodeToIcon(hour.weatherCode);
    imgEl.src = iconPath(iconKey);
    imgEl.alt = iconLabel(iconKey);

    timeEl.textContent = formatHour(getHour(hour.time));
    timeEl.dateTime = hour.time;

    hourTempEl.textContent = formatTemp(hour.tempC);

    return li;
}

/**
 * Draws the hourly list, replacing what was there.
 * @param {object[]} hours - Entries from toHourly, usually one day's worth.
 */
export function renderHourly(hours) {
    const items = hours.map(createHour);
    hourListEl.replaceChildren(...items);
}
