import { test } from "node:test";
import assert from "node:assert/strict";
import { weatherCodeToIcon, iconLabel, iconPath } from "../src/weather-codes.js";

test("maps clear sky to sunny", () => {
    assert.equal(weatherCodeToIcon(0), "sunny");
});

test("maps both partly-cloudy codes", () => {
    const codes = [1,2];
    for (const code of codes) {
        assert.equal(weatherCodeToIcon(code), "partly-cloudy");
    }  
});

test("maps the first and last code of each group", () => {
    // single-code groups
    assert.equal(weatherCodeToIcon(0), "sunny");
    assert.equal(weatherCodeToIcon(3), "overcast");

    // partly cloudy: 1–2
    assert.equal(weatherCodeToIcon(1), "partly-cloudy");
    assert.equal(weatherCodeToIcon(2), "partly-cloudy");

    // fog: 45, 48
    assert.equal(weatherCodeToIcon(45), "fog");
    assert.equal(weatherCodeToIcon(48), "fog");

    // drizzle: 51–57
    assert.equal(weatherCodeToIcon(51), "drizzle");
    assert.equal(weatherCodeToIcon(57), "drizzle");

    // rain: 61–82
    assert.equal(weatherCodeToIcon(61), "rain");
    assert.equal(weatherCodeToIcon(82), "rain");

    // snow: 71–86
    assert.equal(weatherCodeToIcon(71), "snow");
    assert.equal(weatherCodeToIcon(86), "snow");

    // storm: 95–99
    assert.equal(weatherCodeToIcon(95), "storm");
    assert.equal(weatherCodeToIcon(99), "storm");
});

test("maps rain showers to rain", () => {
    assert.equal(weatherCodeToIcon(80), "rain");
});

test("handles an unknown code", () => {
    assert.equal(weatherCodeToIcon(42), "overcast");
});

test("handles a missing code", () => {
    assert.equal(weatherCodeToIcon(undefined), "overcast");
    assert.equal(weatherCodeToIcon(null), "overcast");
});

test("labels every icon key", () => {
    assert.equal(iconLabel("sunny"), "Sunny");
    assert.equal(iconLabel("partly-cloudy"), "Partly cloudy");
    assert.equal(iconLabel("overcast"), "Overcast");
    assert.equal(iconLabel("fog"), "Fog");
    assert.equal(iconLabel("drizzle"), "Drizzle");
    assert.equal(iconLabel("rain"), "Rain");
    assert.equal(iconLabel("snow"), "Snow");
    assert.equal(iconLabel("storm"), "Storm");
});

test("throws for an unknown icon key", () => {
    assert.throws(() => iconLabel("tornado"), Error);
    assert.throws(() => iconLabel(undefined), Error);
});

test("builds a relative image path", () => {
    assert.equal(iconPath("storm"), "assets/images/icon-storm.webp");
});

test("code → path end to end", () => {
    assert.equal(iconPath(weatherCodeToIcon(3)), "assets/images/icon-overcast.webp");
});
