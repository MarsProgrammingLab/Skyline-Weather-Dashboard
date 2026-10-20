export const KM_PER_MILE = 1.60934;
export const MM_PER_INCH = 25.4;


export function celsiusToFahrenheit(c) {
    return c * (9/5) + 32;
}

export function kmhToMph(kmh) {
    return kmh / KM_PER_MILE;
}

export function mmToInches(mm) {
    return mm / MM_PER_INCH;
}
