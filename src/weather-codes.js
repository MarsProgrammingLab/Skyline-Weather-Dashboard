// weatherCodeToIcon(code)
//   input:  a WMO code (number), e.g. 63
//   output: one of the 8 icon keys (string), e.g. "rain"
//   - a switch on code
//   - group the cases: several `case` lines stacked above one `return`
//     (fall-through on purpose; no break needed because return exits)
//   - default: see "Decision" below
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

// iconLabel(icon)
//   input:  an icon key, e.g. "partly-cloudy"
//   output: readable alt text, e.g. "Partly cloudy"
//   - another switch, one case per key
//   - default: decide what makes sense for alt text
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

// iconPath(icon)
//   input:  an icon key, e.g. "storm"
//   output: "assets/images/icon-storm.webp"
//   - one template literal
//   - no leading slash (the GitHub Pages lesson from Build 5)
export function iconPath(iconName) {
    return `../assets/images/icon-${iconName}.webp`;
}
