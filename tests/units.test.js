import { test } from "node:test";
import assert from "node:assert/strict";
import { celsiusToFahrenheit, kmhToMph, mmToInches, inUnits } from "../src/units.js";


test("kmhToMph converts 14 km/h to 8.70 mph", () => {
  assert.equal(kmhToMph(14).toFixed(2), "8.70");
});

test("kmhToMph converts 0 km to 0 mile", () => {
  assert.equal(kmhToMph(0), 0);
});


test("celsiusToFahrenheit(20) converts to 68", () => {
  assert.equal(celsiusToFahrenheit(20), 68);
});

test("celsiusToFahrenheit(0) converts to 32", () => {
  assert.equal(celsiusToFahrenheit(0), 32);
});

test("celsiusToFahrenheit(-40) converts to -40", () => {
  assert.equal(celsiusToFahrenheit(-40), -40);
});

test("mmToInches(25.4) converts to 1", () => {
  assert.equal(mmToInches(25.4), 1);
});

test("mmToInches(0) converts to 0", () => {
  assert.equal(mmToInches(0), 0);
});

test("inUnits returns a metric reading unchanged", () => {
  assert.equal(inUnits(20, "metric", celsiusToFahrenheit), 20);
});

test("inUnits converts a reading when units are imperial", () => {
  assert.equal(inUnits(20, "imperial", celsiusToFahrenheit), 68);
});

test("inUnits keeps a missing reading as null in imperial", () => {
  assert.equal(inUnits(null, "imperial", celsiusToFahrenheit(null)), null);
});
