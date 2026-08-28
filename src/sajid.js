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

  /** Flatten a nested array one level deep. */
  S.flatten = function (arr) {
    return arr.reduce((acc, item) => acc.concat(item), []);
  };

  /** Return an array of numbers from `start` to `end` (inclusive). */
  S.range = function (start, end, step = 1) {
    const out = [];
    if (end === undefined) {
      end = start;
      start = 0;
    }
    for (let i = start; i <= end; i += step) out.push(i);
    return out;
  };

  /** Remove falsy values (false, null, 0, "", undefined, NaN). */
  S.compact = function (arr) {
    return arr.filter(Boolean);
  };

  /** Last element of an array (or a default if empty). */
  S.last = function (arr, fallback) {
    return arr.length ? arr[arr.length - 1] : fallback;
  };

  /** Group array items by a key function or key name. */
  S.groupBy = function (arr, key) {
    const isFn = typeof key === "function";
    return arr.reduce((map, item) => {
      const k = isFn ? key(item) : item[key];
      (map[k] = map[k] || []).push(item);
      return map;
    }, {});
  };

  /** Intersection of two arrays (unique shared values). */
  S.intersection = function (a, b) {
    const set = new Set(b);
    return [...new Set(a)].filter((x) => set.has(x));
  };

  /** First element of an array (or a default if empty). */
  S.first = function (arr, fallback) {
    return arr.length ? arr[0] : fallback;
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

  /** Convert "HelloWorld" / "hello_world" to "hello-world". */
  S.kebabCase = function (str) {
    return S.snakeCase(str).replace(/_/g, "-");
  };

  /** Convert "hello world" to "helloWorld". */
  S.camelCase = function (str) {
    const words = str
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .toLowerCase()
      .replace(/[_\s-]+/g, " ")
      .trim()
      .split(" ");
    return words[0] + words.slice(1).map((w) => S.capitalize(w)).join("");
  };

  /** Title Case: "hello world" -> "Hello World". */
  S.titleCase = function (str) {
    return str
      .toLowerCase()
      .replace(/[_\s-]+/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((w) => S.capitalize(w))
      .join(" ");
  };

  /** Reverse a string. */
  S.reverse = function (str) {
    return str.split("").reverse().join("");
  };

  /** Count occurrences of a substring. */
  S.countOccurrences = function (str, sub) {
    if (!sub) return 0;
    return str.split(sub).length - 1;
  };

  /** Mask a string, showing only the last `visible` characters. */
  S.mask = function (str, visible = 4, maskChar = "*") {
    if (str.length <= visible) return str;
    return maskChar.repeat(str.length - visible) + str.slice(-visible);
  };

  /** Escape a string for safe use in a RegExp. */
  S.escapeRegExp = function (str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  /** Pad a string to a given length from either side (default left). */
  S.pad = function (str, length, char = " ", left = true) {
    if (str.length >= length) return str;
    const pad = char.repeat(length - str.length);
    if (left) return pad + str;
    return str + pad;
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

  /** Check if a number is within [min, max] (inclusive). */
  S.inRange = function (num, min, max) {
    return num >= min && num <= max;
  };

  /** Random float between min and max. */
  S.randomFloat = function (min = 0, max = 1) {
    return Math.random() * (max - min) + min;
  };

  /** Sum of an array of numbers. */
  S.sum = function (arr) {
    return arr.reduce((a, b) => a + (b || 0), 0);
  };

  /** Average of an array of numbers. */
  S.average = function (arr) {
    return arr.length ? S.sum(arr) / arr.length : 0;
  };

  /** True if a number is even. */
  S.isEven = function (num) {
    return num % 2 === 0;
  };

  /** True if a number is odd. */
  S.isOdd = function (num) {
    return num % 2 !== 0;
  };

  /** Parse an int safely, returning a fallback on failure. */
  S.parseIntSafe = function (value, fallback = NaN) {
    const n = parseInt(value, 10);
    return isNaN(n) ? fallback : n;
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

  /** Shallow-merge multiple objects (later sources win). */
  S.merge = function (...objs) {
    return Object.assign({}, ...objs);
  };

  /** Get a nested value via dot path, with a fallback. */
  S.get = function (obj, path, fallback) {
    const keys = Array.isArray(path) ? path : String(path).split(".");
    let cur = obj;
    for (const k of keys) {
      if (cur == null) return fallback;
      cur = cur[k];
    }
    return cur === undefined ? fallback : cur;
  };

  /** Set a nested value via dot path (creates intermediate objects). */
  S.set = function (obj, path, value) {
    const keys = Array.isArray(path) ? path : String(path).split(".");
    let cur = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (cur[k] == null || typeof cur[k] !== "object") cur[k] = {};
      cur = cur[k];
    }
    cur[keys[keys.length - 1]] = value;
    return obj;
  };

  /** Filter an object's entries by a predicate. */
  S.pickBy = function (obj, predicate) {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      if (predicate(v, k)) out[k] = v;
    }
    return out;
  };

  /** Map the values of an object while keeping its keys. */
  S.mapValues = function (obj, fn) {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      out[k] = fn(v, k);
    }
    return out;
  };

  /** Swap an object's keys and values. */
  S.invert = function (obj) {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      out[v] = k;
    }
    return out;
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

  /** Add a number of days to a date (returns a new Date). */
  S.addDays = function (date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  /** True if a date is today. */
  S.isToday = function (date) {
    const d = new Date(date);
    const n = new Date();
    return (
      d.getFullYear() === n.getFullYear() &&
      d.getMonth() === n.getMonth() &&
      d.getDate() === n.getDate()
    );
  };

  /** True if a year is a leap year. */
  S.isLeapYear = function (year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  /** Format a date as "YYYY-MM-DD HH:MM". */
  S.formatDate = function (date, withTime = false) {
    const d = new Date(date);
    const pad = (n) => String(n).padStart(2, "0");
    let out = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    if (withTime) out += ` ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    return out;
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

  /** Sleep (await) for a number of milliseconds. */
  S.sleep = function (ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  /** Memoize a function's results by serialized arguments. */
  S.memoize = function (fn) {
    const cache = new Map();
    return function (...args) {
      const key = JSON.stringify(args);
      if (cache.has(key)) return cache.get(key);
      const result = fn.apply(this, args);
      cache.set(key, result);
      return result;
    };
  };

  /** Wrap a function so it only runs once. */
  S.once = function (fn) {
    let called = false;
    let result;
    return function (...args) {
      if (called) return result;
      called = true;
      result = fn.apply(this, args);
      return result;
    };
  };

  /** Compose functions left-to-right (Lodash flow). */
  S.pipe = function (...fns) {
    return function (initial) {
      return fns.reduce((acc, fn) => fn(acc), initial);
    };
  };

  /** Map an iterable with a concurrency limit. */
  S.asyncMap = async function (items, limit, mapper) {
    const results = new Array(items.length);
    let index = 0;
    const workers = Array(Math.min(limit, items.length))
      .fill(0)
      .map(async () => {
        while (true) {
          const i = index++;
          if (i >= items.length) break;
          results[i] = await mapper(items[i], i);
        }
      });
    await Promise.all(workers);
    return results;
  };

  /** Run async functions in parallel, resolving all results. */
  S.parallel = function (fns) {
    return Promise.all(fns.map((fn) => (typeof fn === "function" ? fn() : fn)));
  };

  return S;
});
