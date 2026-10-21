// ----- private helper (NOT exported) -----
// isMissing(value)
//  one line: return the opposite of "value is a finite number"
function isMissing(value) {
    return !Number.isFinite(value);
}

//  ----- formatTemp(value) -----
//  JSDoc: @param {number|null} value - degrees, any unit; @returns {string} e.g. "20°", or "–" if missing
//      1. guard: if the value is missing, return "–"
//      2. round to a whole number
//      3. return it with "°" after it (template literal)
export function formatTemp(value) {
    if (isMissing(value)) {
        return "-";
    }
    return `${Math.round(value)}°`;
}

//  ----- formatWind(value, unit) -----
// JSDoc: value is a speed already in the right unit; unit is "km/h" or "mph"
//      1. same guard as formatTemp
//      2. round to a whole number
//      3. return number + one space + unit       e.g. "9 mph"
export function formatWind(value, unit) {
    if (isMissing(value)) {
        return "-";
    } 
    return `${Math.round(value)} ${unit}`
}
//  ----- formatPrecip(value, unit) -----
// JSDoc: value already in the right unit; unit is "mm" or "in"
//   1. same guard
//   2. decide decimal places from the unit with ? :
//        inches → 1 decimal; mm → check the design (whole number or 1 decimal?)
//   3. format with toFixed(thatNumber), then add a space and the unit
export function formatPrecip(value, unit) {
    if (isMissing(value)) {
        return "-";
    }
    return `${value.toFixed(1)} ${unit}`
}

//  ----- getHour(isoTime) -----
// JSDoc: isoTime like "2026-10-08T15:00"; @returns {number} 0–23
//   1. take the two characters that hold the hour (they always start at position 11)
//   2. convert them to a number and return it
//
export function getHour(isoTime) {
    let hour = isoTime.split('T')[1].split(":")[0];
    return Number(hour);
}

//  ----- formatHour(hour) -----
// JSDoc: hour 0–23; @returns {string} like "3 PM"
//   1. suffix: "AM" if the hour is before 12, otherwise "PM"     (? :)
//   2. twelve-hour number: hour % 12
//   3. if that result is 0, it should be 12 instead              (? : or ||  — think: is 0 the only falsy result possible here?)
//   4. return number + space + suffix
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
