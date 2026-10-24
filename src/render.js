import { formatTemp, formatWind, formatPrecip } from "./format.js";
import { weatherCodeToIcon, iconPath, iconLabel } from "./weather-codes.js"

// DOM elements
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

export function renderCurrent(current, placeName) {
    // current -> object from toCurrent
    // placeName -> name of location (e.g. Charlotte, North Carolina)
    const iconKey = weatherCodeToIcon(current.weatherCode);

    placeEl.textContent = placeName;
    dateEl.textContent = longDate.format(new Date(current.time));
    dateEl.dateTime = current.date;
    tempEl.textContent = formatTemp(current.tempC);
    iconEl.src = iconPath(iconKey);
    iconEl.alt = iconLabel(iconKey);
    feelsEl.textContent = formatTemp(current.feelsLikeC);
    humidEl.textContent = `${current.humidity}%`;
    windEl.textContent = formatWind(current.windKmh, "km/h");
    precipEl.textContent = formatPrecip(current.precipMm, "mm");
}


export function renderDaily(days) {
    const items = days.map(createDay);
    dayListEl.replaceChildren(...items);
}


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
