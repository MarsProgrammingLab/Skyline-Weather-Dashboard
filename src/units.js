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
