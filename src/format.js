/**
 * Checks whether a reading is unusable: null, undefined, NaN, or infinite.
 * Zero counts as a real reading.
 * @param {*} value - Any value.
 * @returns {boolean} True if the value is not a finite number.
 */

function isMissing(value) {
    return !Number.isFinite(value);
}

/**
 * Formats a temperature for display, rounded to a whole number.
 * @param {number|null} value - Temperature in either unit.
 * @returns {string} e.g. "20°", or "-" if the reading is missing.
 */

export function formatTemp(value) {
    if (isMissing(value)) {
        return "-";
    }
    return `${Math.round(value)}°`;
}

/**
 * Formats a wind speed for display, rounded to a whole number.
 * @param {number|null} value - Speed, already in the unit given.
 * @param {string} unit - "km/h" or "mph".
 * @returns {string} e.g. "9 mph", or "-" if the reading is missing.
 */

export function formatWind(value, unit) {
    if (isMissing(value)) {
        return "-";
    } 
    return `${Math.round(value)} ${unit}`;
}

/**
 * Formats a precipitation amount for display with one decimal place.
 * @param {number|null} value - Amount, already in the unit given.
 * @param {string} unit - "mm" or "in".
 * @returns {string} e.g. "0.1 in", or "-" if the reading is missing.
 */

export function formatPrecip(value, unit) {
    if (isMissing(value)) {
        return "-";
    }
    return `${value.toFixed(1)} ${unit}`;
}

/**
 * Reads the hour from an ISO date-time string.
 * @param {string} isoTime - e.g. "2026-10-08T15:00".
 * @returns {number} The hour, 0–23.
 */
export function getHour(isoTime) {
    const hour = isoTime.split('T')[1].split(":")[0];
    return Number(hour);
}

/**
 * Formats an hour of the day on a 12-hour clock.
 * @param {number} hour - Hour of the day, 0–23.
 * @returns {string} e.g. "3 PM"; midnight is "12 AM" and noon is "12 PM".
 */
export function formatHour(hour) {
    if (hour === 0) {
        return "12 AM";
    } else if (hour < 12) {
        return `${hour} AM`;
    } else if (hour === 12) {
        return "12 PM"
    } 
    return `${hour % 12} PM`;
}
