import { test } from "node:test";
import assert from "node:assert/strict";
import { toCurrent, toDaily } from "../src/forecast.js";
import { CURRENT_RESPONSE } from "./fixtures/open-meteo-current.js";
import { DAILY_RESPONSE } from "./fixtures/open-meteo-daily.js";


test("reads the timezone from the top level", () => {
    const result = toCurrent(CURRENT_RESPONSE);

    assert.equal(result.timezone, "America/New_York");
});

test("maps every current field to Skyline's shape", () => {
    const result = toCurrent(CURRENT_RESPONSE);

    const expected = {
        time: "2026-10-22T14:15",
        timezone: "America/New_York",
        tempC: 21.6,
        feelsLikeC: 19.2,
        humidity: 35,
        windKmh: 14.4,
        precipMm: 0,
        weatherCode: 0,
    };

    assert.deepEqual(result, expected);
});

test("missing fields become null", () => {
    const copy = {
        ...CURRENT_RESPONSE,
        current: {
            ...CURRENT_RESPONSE.current,
            precipitation: undefined,
        },
    };

    const result = toCurrent(copy);

    assert.equal(result.precipMm, null);   // the removed field is null
    assert.equal(result.tempC, 21.6);      // and the fields you kept still come through
});

test("does not change the response it was given", () => {
    // takes a full, independent snapshot of the input before the function can touch it
    const before = structuredClone(CURRENT_RESPONSE);
    toCurrent(CURRENT_RESPONSE);
    // checks that the input still matches the snapshot.
    assert.deepEqual(CURRENT_RESPONSE, before);
});

test("returns a new object each call", () => {
    const first = toCurrent(CURRENT_RESPONSE);
    const second = toCurrent(CURRENT_RESPONSE);

    // checks that the contents are the same
    assert.deepEqual(first, second);
    // checks that both are different objects
    assert.notEqual(first, second); 
});

test("throws when the response has no current block", () => {
    const broken = { timezone: "America/New_York" };
    // toCurrent fields with api.current expects the object to have current
    // because it does not exist, a TypeError should be the output
    assert.throws(() => toCurrent(broken), TypeError);
});


test("returns one day per date", () => {
    const result = toDaily(DAILY_RESPONSE);

    assert.equal(result.length, 7);
    assert.equal(result[0].date, DAILY_RESPONSE.daily.time[0]);
});

test("maps the first and last day to Skyline's shape", () => {
    const result = toDaily(DAILY_RESPONSE);
    const d = DAILY_RESPONSE.daily;

    assert.deepEqual(result[0], {
        date: d.time[0],
        weatherCode: d.weather_code[0],
        maxC: d.temperature_2m_max[0],
        minC: d.temperature_2m_min[0],
    });
    assert.deepEqual(result[6], {
        date: d.time[6],
        weatherCode: d.weather_code[6],
        maxC: d.temperature_2m_max[6],
        minC: d.temperature_2m_min[6],
    });
});

test("a short array gives null for the missing day, not undefined", () => {
    const shortMax = {
        ...DAILY_RESPONSE,
        daily: {
            ...DAILY_RESPONSE.daily,
            temperature_2m_max: DAILY_RESPONSE.daily.temperature_2m_max.slice(0, 6),
        },
    };

    const result = toDaily(shortMax);

    assert.equal(result.length, 7);
    assert.equal(result[6].maxC, null);
    assert.equal(result[6].minC, DAILY_RESPONSE.daily.temperature_2m_min[6]);
});

test("does not change the daily response it was given", () => {
    const before = structuredClone(DAILY_RESPONSE);

    toDaily(DAILY_RESPONSE);

    assert.deepEqual(DAILY_RESPONSE, before);
});

test("an empty forecast gives an empty list", () => {
    const empty = {
        daily: { time: [], weather_code: [], temperature_2m_max: [], temperature_2m_min: [] },
    };

    assert.deepEqual(toDaily(empty), []);
});
