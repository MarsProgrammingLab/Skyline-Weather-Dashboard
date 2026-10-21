import { test } from "node:test";
import assert from "node:assert/strict";
import { formatTemp, formatWind, formatPrecip, getHour, formatHour } from "../src/format.js";

test("formatWind(14, 'km/h') returns '14 km/h'", () => {
    assert.equal(formatWind(14, 'km/h'), "14 km/h");
});

test("formatWind(8.7, 'mph') returns '9 mph'", () => {
    assert.equal(formatWind(8.7, 'mph'), "9 mph");
});

test("formatWind(undefined, 'mph') returns '-'", () => {
    assert.equal(formatWind(undefined, 'mph'), "-");
});

// ----- formatPrecip in millimetres -----
test("formatPrecip(0, 'mm') returns '0.0 mm'", () => {
  assert.equal(formatPrecip(0, "mm"), "0.0 mm");
});

test("formatPrecip(0.098, 'in') returns '0.1 in'", () => {
    assert.equal(formatPrecip(0.098, 'in'), "0.1 in");
});

test("formatPrecip(0, 'in') returns '0.0 in'", () => {
    assert.equal(formatPrecip(0, 'in'), "0.0 in");
});

test("formatPrecip(null, 'in') returns '-'", () => {
    assert.equal(formatPrecip(null, 'in'), "-");
});

test('getHour("2026-10-08T15:00") returns 15', () => {
    assert.equal(getHour("2026-10-08T15:00"), 15);
});

test('getHour("2026-10-08T00:00") returns 0', () => {
    assert.equal(getHour("2026-10-08T00:00"), 0);
});

test("formatHour(0) returns '12 AM'", () => {
    assert.equal(formatHour(0), '12 AM');
});

test("formatHour(11) returns '11 AM'", () => {
    assert.equal(formatHour(11), '11 AM');
});

test("formatHour(12) returns '12 PM'", () => {
    assert.equal(formatHour(12), '12 PM');
});

test("formatHour(13) returns '1 PM'", () => {
    assert.equal(formatHour(13), '1 PM');
});

test("formatHour(23) returns '11 PM'", () => {
    assert.equal(formatHour(23), '11 PM');
});

// ----- formatTemp -----
test("formatTemp(20.4) rounds to '20°'", () => {
  assert.equal(formatTemp(20.4), "20°");
});

test("formatTemp(0) returns '0°' (zero is a real reading, not missing)", () => {
  assert.equal(formatTemp(0), "0°");
});

test("formatTemp(-3.6) rounds to '-4°'", () => {
  assert.equal(formatTemp(-3.6), "-4°");
});

test("formatTemp(null) returns '-'", () => {
  assert.equal(formatTemp(null), "-");
});

test("formatTemp(NaN) returns '-'", () => {
  assert.equal(formatTemp(NaN), "-");
});

// ----- getHour and formatHour together, the way the page will use them -----
test("formatHour(getHour(...)) shows midnight as '12 AM'", () => {
  assert.equal(formatHour(getHour("2026-10-08T00:00")), "12 AM");
});
