import { test } from "node:test";
import assert from "node:assert/strict";
import { toHourly, hoursForDay } from "../src/forecast.js";
import { HOURLY_RESPONSE } from "./fixtures/open-meteo-hourly.js";

// ---- toHourly ----

test("toHourly returns one entry per hour", () => {
    const result = toHourly(HOURLY_RESPONSE);

    assert.equal(result.length, HOURLY_RESPONSE.hourly.time.length);
});

test("toHourly maps the first and last hour to Skyline's shape", () => {
    const result = toHourly(HOURLY_RESPONSE);
    const h = HOURLY_RESPONSE.hourly;
    const last = h.time.length - 1;

    assert.deepEqual(result[0], {
        time: h.time[0],
        tempC: h.temperature_2m[0],
        weatherCode: h.weather_code[0],
    });
    assert.deepEqual(result[last], {
        time: h.time[last],
        tempC: h.temperature_2m[last],
        weatherCode: h.weather_code[last],
    });
});

test("toHourly turns null gaps into null, not undefined", () => {
    const withGap = {
        ...HOURLY_RESPONSE,
        hourly: {
            ...HOURLY_RESPONSE.hourly,
            temperature_2m: [null, ...HOURLY_RESPONSE.hourly.temperature_2m.slice(1)],
        },
    };

    const result = toHourly(withGap);

    assert.equal(result[0].tempC, null);
    assert.equal(result[1].tempC, HOURLY_RESPONSE.hourly.temperature_2m[1]);
});

test("toHourly does not change the response it was given", () => {
    const before = structuredClone(HOURLY_RESPONSE);

    toHourly(HOURLY_RESPONSE);

    assert.deepEqual(HOURLY_RESPONSE, before);
});

// ---- hoursForDay ----

const HOURS = [
    { time: "2026-10-22T22:00", tempC: 12, weatherCode: 0 },
    { time: "2026-10-22T23:00", tempC: 11, weatherCode: 0 },
    { time: "2026-10-23T00:00", tempC: 10, weatherCode: 1 },
    { time: "2026-10-23T01:00", tempC: 9, weatherCode: 3 },
];

test("hoursForDay keeps only the hours on that date", () => {
    const result = hoursForDay(HOURS, "2026-10-23");

    assert.deepEqual(result, [HOURS[2], HOURS[3]]);
});

test("hoursForDay keeps the hours in their original order", () => {
    const result = hoursForDay(HOURS, "2026-10-22");

    assert.deepEqual(result.map((hour) => hour.time), ["2026-10-22T22:00", "2026-10-22T23:00"]);
});

test("hoursForDay returns an empty list for a date with no hours", () => {
    assert.deepEqual(hoursForDay(HOURS, "2026-10-30"), []);
});

test("hoursForDay does not change the list it was given", () => {
    const before = structuredClone(HOURS);

    hoursForDay(HOURS, "2026-10-23");

    assert.deepEqual(HOURS, before);
});

test("each day in the real response has 24 hours", () => {
    const hours = toHourly(HOURLY_RESPONSE);
    const firstDate = HOURLY_RESPONSE.hourly.time[0].slice(0, 10);

    const firstDay = hoursForDay(hours, firstDate);

    assert.equal(firstDay.length, 24);
    assert.equal(firstDay[0].time, `${firstDate}T00:00`);
    assert.equal(firstDay[23].time, `${firstDate}T23:00`);
});
