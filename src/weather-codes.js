/**
 * Maps an Open-Meteo WMO weather code to one of Skyline's eight icon keys.
 * Unknown codes, `undefined`, and `null` fall back to "overcast" (see README → Decisions).
 * @param {number} code - WMO weather code from Open-Meteo, e.g. 63.
 * @returns {string} Icon key: "sunny", "partly-cloudy", "overcast", "fog",
 *   "drizzle", "rain", "snow", or "storm".
 */
export function weatherCodeToIcon(code) {
    switch (code) {
        case 0:
            return 'sunny';
        case 1: case 2:
            return 'partly-cloudy';
        case 3:
            return 'overcast';
        case 45: case 48:
            return 'fog';
        case 51: case 53: case 55: case 56: case 57:
            return 'drizzle';
        case 61: case 63: case 65: case 66: case 67: case 80: case 81: case 82:
            return 'rain';
        case 71: case 73: case 75: case 77: case 85: case 86:
            return 'snow';
        case 95: case 96: case 99:
            return 'storm';
        default:
            return "overcast";
    }
}

/**
 * Returns human-readable alt text for an icon key.
 * @param {string} iconName - One of the eight icon keys, e.g. "partly-cloudy".
 * @returns {string} Alt text, e.g. "Partly cloudy".
 * @throws {Error} If iconName is not one of the eight keys (a bug in the caller).
 */
export function iconLabel(iconName) {
    switch (iconName) {
        case 'sunny':
            return 'Sunny';
        case 'partly-cloudy':
            return 'Partly cloudy';
        case 'overcast':
            return 'Overcast';
        case 'fog':
            return 'Fog';
        case 'drizzle':
            return 'Drizzle';
        case 'rain':
            return 'Rain';
        case 'snow':
            return 'Snow';
        case 'storm':
            return 'Storm';
        default:
            throw new Error(`Unknown icon name: ${iconName}`);
    }
}

/**
 * Builds the image path for an icon key, relative to index.html.
 * @param {string} iconName - One of the eight icon keys, e.g. "storm".
 * @returns {string} Image path, e.g. "assets/images/icon-storm.webp".
 */
export function iconPath(iconName) {
    return `assets/images/icon-${iconName}.webp`;
}
