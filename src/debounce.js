/**
 * Wraps a function so it runs only after calls have stopped for a set time.
 * Each call cancels the pending run and starts the wait again, so a burst of
 * calls produces a single run, using the arguments from the last call.
 * @param {Function} fn - The function to delay, e.g. a search request.
 * @param {number} waitMs - Quiet time in milliseconds before fn runs, e.g. 300.
 * @returns {Function} A debounced version of fn. Calling it returns undefined;
 *   fn runs later, on a timer.
 */
export function debounce(fn, waitMs) {
    let id;

    return (...args) => {
        clearTimeout(id);
        id = setTimeout(() => fn(...args), waitMs);
    };
}
