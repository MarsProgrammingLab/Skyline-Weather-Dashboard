/** Kilometres in one mile. */
export const KM_PER_MILE = 1.60934;
/** Millimetres in one inch. */
export const MM_PER_INCH = 25.4;

/**
 * Converts a temperature from degrees Celsius to degrees Fahrenheit.
 * @param {number} c - Temperature in °C.
 * @returns {number} Temperature in °F, not rounded.
 */
export function celsiusToFahrenheit(c) {
    return c * (9/5) + 32;
}

/**
 * Converts a speed from kilometres per hour to miles per hour.
 * @param {number} kmh - Speed in km/h.
 * @returns {number} Speed in mph, not rounded.
 */
export function kmhToMph(kmh) {
    return kmh / KM_PER_MILE;
}

/**
 * Converts a precipitation amount from millimetres to inches.
 * @param {number} mm - Precipitation in millimetres.
 * @returns {number} Precipitation in inches, not rounded.
 */
export function mmToInches(mm) {
    return mm / MM_PER_INCH;
}

/**
 * Puts a metric reading in the units the user picked.
 * @param {number|null} reading - The reading as the API sends it (metric weather data).
 * @param {string} units - "metric" or "imperial".
 * @param {(value: number) => number} toImperial - The converter to use, e.g. celsiusToFahrenheit.
 * @returns {number|null} The reading in the chosen units, or null if it was missing.
 */
export function inUnits(reading, units, toImperial) {
    if (reading === null) {
        return reading;
    } 
    if (units === "metric") {
        return reading;
    }
    return toImperial(reading); 
}
