import { test } from "node:test";
import assert from "node:assert/strict";
import { toCurrent, toDaily } from "../src/forecast.js";
import { CURRENT_RESPONSE } from "./fixtures/open-meteo-current.js";
import { DAILY_RESPONSE } from "./fixtures/open-meteo-daily.js";


test("reads the timezone from the top level", () => {
    const result = toCurrent(CURRENT_RESPONSE);

    assert.equal(result.timezone, CURRENT_RESPONSE.timezone);
});

test("maps every current field to Skyline's shape", () => {
    const result = toCurrent(CURRENT_RESPONSE);
    const c = CURRENT_RESPONSE.current;

    const expected = {
        time: c.time,
        timezone: CURRENT_RESPONSE.timezone,
        tempC: c.temperature_2m,
        feelsLikeC: c.apparent_temperature,
        humidity: c.relative_humidity_2m,
        windKmh: c.wind_speed_10m,
        precipMm: c.precipitation,
        weatherCode: c.weather_code,
    };

    assert.deepEqual(result, expected);
});

test("keeps real zeros instead of turning them into null", () => {
    const calm = {
        ...CURRENT_RESPONSE,
        current: { ...CURRENT_RESPONSE.current, precipitation: 0, weather_code: 0 },
    };

    const result = toCurrent(calm);

    assert.equal(result.precipMm, 0);
    assert.equal(result.weatherCode, 0);
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

    assert.equal(result.precipMm, null);                                  // the removed field is null
    assert.equal(result.tempC, CURRENT_RESPONSE.current.temperature_2m);  // the fields you kept still come through
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
