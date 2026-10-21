export const KM_PER_MILE = 1.60934;
export const MM_PER_INCH = 25.4;

/**
 * Converts celsius to fahrenheit
 * @param {number} c
 * @returns 
 */
export function celsiusToFahrenheit(c) {
    return c * (9/5) + 32;
}
/**
 * Converts km/h to mph
 * @param {number} kmh
 * @returns 
 */
export function kmhToMph(kmh) {
    return kmh / KM_PER_MILE;
}
/**
 * Convers millimeters to inches
 * @param {number} mm 
 * @returns 
 */
export function mmToInches(mm) {
    return mm / MM_PER_INCH;
}
