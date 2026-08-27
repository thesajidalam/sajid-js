/**
 * sajid-js
 * A modern, dependency-free JavaScript utility toolkit.
 * Zero dependencies. Works in browsers and Node.js.
 */
(function (global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory();
  } else {
    global.sajid = factory();
  }
})(typeof window !== "undefined" ? window : this, function () {
  "use strict";

  const S = {};

  /* ============ Arrays ============ */

  /** Shuffle an array (Fisher–Yates). Returns a new array. */
  S.shuffle = function (arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  /** Get a random element from an array. */
  S.pick = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  /** Remove duplicates — works with any value types (strict equality). */
  S.unique = function (arr) {
    return [...new Set(arr)];
  };

  /** Chunk an array into arrays of at most `size` elements. */
  S.chunk = function (arr, size) {
    const out = [];
    for (let i = 0; i < arr.length; i += size) {
      out.push(arr.slice(i, i + size));
    }
    return out;
  };

  /** Sort an array of objects by a numeric/string key. */
  S.sortBy = function (arr, key, ascending = true) {
    const dir = ascending ? 1 : -1;
    return arr.slice().sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  };

  /** Convert an array of objects into a single object keyed by `key`. */
  S.keyBy = function (arr, key) {
    const map = {};
    arr.forEach((item) => {
      map[item[key]] = item;
    });
    return map;
  };

  /* ============ Strings ============ */

  /** Capitalize the first letter of a string. */
  S.capitalize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  /** Convert "hello world" / "hello-world" to "HelloWorld". */
  S.pascalCase = function (str) {
    return S.capitalize(
      str
        .replace(/[_\s-]+/g, " ")
        .split(" ")
        .map((w) => S.capitalize(w.toLowerCase()))
        .join("")
    );
  };

  /** Convert "HelloWorld" / "hello-world" to "hello_world". */
  S.snakeCase = function (str) {
    return str
      .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
      .replace(/[\s-]+/g, "_")
      .toLowerCase();
  };

  /** Truncate a string with an ellipsis. */
  S.truncate = function (str, length, ellipsis = "…") {
    if (str.length <= length) return str;
    return str.slice(0, length).trimEnd() + ellipsis;
  };

  /** Test if a string is a valid email (simple, pragmatic check). */
  S.isEmail = function (str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  };

  /** Slugify: "Hello, World!" -> "hello-world". */
  S.slugify = function (str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  /* ============ Numbers ============ */

  /** Clamp a number between min and max. */
  S.clamp = function (num, min, max) {
    return Math.min(Math.max(num, min), max);
  };

  /** Format a number with thousands separators. */
  S.formatNumber = function (num) {
    return num.toLocaleString("en-US");
  };

  /** Round to a given number of decimal places. */
  S.round = function (num, places = 0) {
    const f = Math.pow(10, places);
    return Math.round(num * f) / f;
  };

  /** Random integer between min and max (inclusive). */
  S.randInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /** Basic hash of a string (djb2), returns unsigned 32-bit int. */
  S.hash = function (str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++) {
      h = (h * 33) ^ str.charCodeAt(i);
    }
    return h >>> 0;
  };

  /* ============ Objects ============ */

  /** Shallow clone of an object. */
  S.clone = function (obj) {
    return { ...obj };
  };

  /** Deep clone (JSON-safe objects/arrays). */
  S.deepClone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
  };

  /** Pick selected keys from an object into a new object. */
  S.select = function (obj, keys) {
    const out = {};
    keys.forEach((k) => {
      if (k in obj) out[k] = obj[k];
    });
    return out;
  };

  /** Omit selected keys from an object. */
  S.omit = function (obj, keys) {
    const out = { ...obj };
    keys.forEach((k) => delete out[k]);
    return out;
  };

  /** Check if an object is empty (no own enumerable keys). */
  S.isEmpty = function (obj) {
    return Object.keys(obj).length === 0;
  };

  /* ============ Dates ============ */

  /** Format a Date into "YYYY-MM-DD". */
  S.toDateString = function (date) {
    const d = new Date(date);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  /** Relative time like "3 hours ago". */
  S.timeAgo = function (date) {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };
    for (const [unit, secs] of Object.entries(intervals)) {
      const count = Math.floor(seconds / secs);
      if (count >= 1) return count === 1 ? `1 ${unit} ago` : `${count} ${unit}s ago`;
    }
    return "just now";
  };

  /** Start of the day for a given date. */
  S.startOfDay = function (date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  /** Difference in days between two dates. */
  S.daysBetween = function (a, b) {
    const ms = Math.abs(new Date(a) - new Date(b));
    return Math.floor(ms / 86400000);
  };

  /* ============ Async / Decorators ============ */

  /** Debounce a function — waits `wait` ms after the last call. */
  S.debounce = function (fn, wait = 200) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  };

  /** Throttle a function — at most one call per `limit` ms. */
  S.throttle = function (fn, limit = 200) {
    let last = 0;
    return function (...args) {
      const now = Date.now();
      if (now - last >= limit) {
        last = now;
        fn.apply(this, args);
      }
    };
  };

  /**
   * Retry an async function a number of times with backoff.
   * @returns {Promise} resolves with fn() result or throws last error.
   */
  S.retry = async function (fn, { times = 3, delay = 300 } = {}) {
    let lastErr;
    for (let i = 0; i < times; i++) {
      try {
        return await fn();
      } catch (err) {
        lastErr = err;
        if (i < times - 1) await new Promise((r) => setTimeout(r, delay));
      }
    }
    throw lastErr;
  };

  /** Run a promise with a hard timeout. */
  S.withTimeout = function (promise, ms, message = "Operation timed out") {
    return Promise.race([
      promise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error(message)), ms)
      ),
    ]);
  };

  return S;
});
