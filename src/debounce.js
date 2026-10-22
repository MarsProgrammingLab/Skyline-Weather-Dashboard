// debounce(fn, waitMs)
//   input:  a function to wrap, and a wait in milliseconds
//   output: a NEW function that callers use instead of fn
//
//   state that must survive between calls (where does it live? see 1.5.9):
//     - the ID of the pending timer, if there is one
//
//   each time the returned function is called with some arguments:
//     1. cancel the pending timer, if any
//     2. start a new timer for waitMs that will call fn with THESE arguments
export function debounce(fn, waitMs) {
    let id;

    return (...args) => {
        clearTimeout(id);
        id = setTimeout(() => fn(...args), waitMs);
    };
}
