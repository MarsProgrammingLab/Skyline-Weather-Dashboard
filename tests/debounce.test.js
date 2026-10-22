import { test } from "node:test";
import assert from "node:assert/strict";
import { debounce } from "../src/debounce.js";

test("does not run before the wait", (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    const fn = t.mock.fn();
    const debounced = debounce(fn, 300);

    debounced();
    t.mock.timers.tick(299);

    assert.equal(fn.mock.callCount(), 0);
});

test("runs once after the wait", (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    const fn = t.mock.fn();
    const debounced = debounce(fn, 300);

    debounced();
    t.mock.timers.tick(300);

    assert.equal(fn.mock.callCount(), 1);
});

test("a burst runs only once", (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    const fn = t.mock.fn();
    const debounced = debounce(fn, 300);

    debounced();
    t.mock.timers.tick(100);
    debounced();
    t.mock.timers.tick(100);
    debounced();
    t.mock.timers.tick(300);

    assert.equal(fn.mock.callCount(), 1);
});

test("each call restarts the wait", (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    const fn = t.mock.fn();
    const debounced = debounce(fn, 300);

    debounced();
    t.mock.timers.tick(200);
    debounced();
    t.mock.timers.tick(200);   // 400 ms since the first call, but only 200 since the last

    assert.equal(fn.mock.callCount(), 0);
});

test("uses the last call's arguments", (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    const fn = t.mock.fn();
    const debounced = debounce(fn, 300);

    debounced("Ch");
    t.mock.timers.tick(100);
    debounced("Charlotte");
    t.mock.timers.tick(300);

    assert.equal(fn.mock.callCount(), 1);
    assert.equal(fn.mock.calls[0].arguments[0], "Charlotte");
});

test("separate bursts run separately", (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    const fn = t.mock.fn();
    const debounced = debounce(fn, 300);

    debounced();
    t.mock.timers.tick(300);
    debounced();
    t.mock.timers.tick(300);

    assert.equal(fn.mock.callCount(), 2);
});

test("separate debounced functions don't share a timer", (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    const fnA = t.mock.fn();
    const fnB = t.mock.fn();
    const debouncedA = debounce(fnA, 300);
    const debouncedB = debounce(fnB, 300);

    debouncedA();
    debouncedB();
    t.mock.timers.tick(300);

    assert.equal(fnA.mock.callCount(), 1);
    assert.equal(fnB.mock.callCount(), 1);
});
