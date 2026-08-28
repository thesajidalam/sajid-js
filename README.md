<div align="center">

# ⚡ sajid-js

**A modern, dependency-free JavaScript utility toolkit with 65+ helpers for the everyday.**

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Zero dependencies](https://img.shields.io/badge/dependencies-0-00FFAA?style=for-the-badge)
![Works everywhere](https://img.shields.io/badge/browser%20%2B%20node-yes-00D9FF?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-8b949e?style=for-the-badge)

**Live playground & docs: [sajid.js.org](https://sajid.js.org) · Source: [thesajidalam/sajid-js](https://github.com/thesajidalam/sajid-js)**

</div>

---

## What is sajid-js?

`sajid-js` is a collection of small, reliable, dependency-free JavaScript helper
functions covering **arrays, strings, numbers, objects, dates and async
patterns**. It's built to be a thin, readable, tree-shakeable alternative to
reaching for a heavy utility library — grab only the one or two functions you
need, or bring the whole toolkit.

It runs **anywhere JavaScript runs**:

- 🖥️ **Browsers** — via a `<script>` tag or a bundler
- ⚙️ **Node.js** — CommonJS `require()`
- 🌐 **Deno / web workers** — plain ES module-ready code

Every function is documented, and the whole library is covered by a passing
test suite (`node test/test.js`).

## ✨ Highlights

|                            |                                                                             |
| -------------------------- | --------------------------------------------------------------------------- |
| 🧩 **65+ functions**       | Arrays, strings, numbers, objects, dates, async — one flat, learnable API    |
| 🪶 **Zero dependencies**   | Pure JavaScript, no install, no build step required                         |
| 🧪 **Fully tested**        | Skip the risk — every helper has an assertion in `test/test.js`             |
| 🎮 **Live playground**     | Run every function right in your browser at **sajid.js.org**                |
| 📦 **Tree-shakeable**      | Import only what you need; dead code is dropped naturally                   |
| 🌍 **Isomorphic**          | Same API in Node and the browser                                            |

## 🚀 Getting started

### Browser

```html
<script src="https://sajid.js.org/src/sajid.js"></script>
<script>
  window.sajid.unique([1, 1, 2, 3]); // [1, 2, 3]
</script>
```

### Node.js

```bash
npm install sajid-js
```

```js
const sajid = require('sajid-js');

sajid.pascalCase('hello world');   // 'HelloWorld'
sajid.chunk([1, 2, 3, 4, 5], 2);   // [[1,2],[3,4],[5]]
sajid.timeAgo(Date.now() - 3600e3);// '1 hour ago'
```

## 🧰 Quick examples

```js
// Arrays
sajid.shuffle([1,2,3,4,5]);          // random order
sajid.unique([1,1,2,2,3]);           // [1,2,3]
sajid.flatten([1,[2,3],[4]]);        // [1,2,3,4]
sajid.groupBy(users, 'role');        // { admin: [...], user: [...] }

// Strings
sajid.slugify('Hello, World!');      // 'hello-world'
sajid.camelCase('hello world');      // 'helloWorld'
sajid.mask('12345678');              // '****5678'
sajid.isEmail('a@b.com');            // true

// Numbers
sajid.clamp(42, 0, 10);              // 10
sajid.formatNumber(1234567);         // '1,234,567'
sajid.average([1,2,3]);              // 2

// Objects
sajid.get(user, 'profile.address.city', 'n/a');
sajid.set({}, 'a.b.c', 1);           // { a: { b: { c: 1 } } }
sajid.pickBy({a:1,b:2}, v => v>1);   // { b: 2 }

// Dates
sajid.timeAgo(Date.now() - 86400e3); // '1 day ago'
sajid.addDays('2024-01-01', 3);      // Jan 4, 2024
sajid.isLeapYear(2024);              // true

// Async & decorators
sajid.debounce(fn, 200);
sajid.throttle(fn, 250);
const memo = sajid.memoize(expensiveFn);
sajid.once(init);
```

## 📚 Full API

### Arrays

| Function | Description |
|----------|-------------|
| `shuffle(arr)` | Randomize order (Fisher–Yates), returns a new array |
| `pick(arr)` | Random element |
| `unique(arr)` | Remove duplicates (works with any value types) |
| `chunk(arr, size)` | Split into chunks of at most `size` |
| `sortBy(arr, key, asc?)` | Sort objects by a key |
| `keyBy(arr, key)` | Index objects by a key |
| `flatten(arr)` | Flatten one level deep |
| `range(start, end?, step?)` | Array of numbers between bounds |
| `compact(arr)` | Remove all falsy values |
| `first(arr, fallback?)` | First element |
| `last(arr, fallback?)` | Last element |
| `groupBy(arr, keyOrFn)` | Group items by key or function |
| `intersection(a, b)` | Unique shared values |

### Strings

| Function | Description |
|----------|-------------|
| `capitalize(str)` | Uppercase first letter |
| `pascalCase(str)` | `hello world` → `HelloWorld` |
| `camelCase(str)` | `hello world` → `helloWorld` |
| `snakeCase(str)` | `Hello World` → `hello_world` |
| `kebabCase(str)` | `HelloWorld` → `hello-world` |
| `titleCase(str)` | `hello world` → `Hello World` |
| `slugify(str)` | `Hello, World!` → `hello-world` |
| `truncate(str, len, ellipsis?)` | Cut with an ellipsis |
| `reverse(str)` | Reverse the string |
| `countOccurrences(str, sub)` | Count substring occurrences |
| `mask(str, visible?, char?)` | `12345678` → `****5678` |
| `escapeRegExp(str)` | Escape for safe regex use |
| `pad(str, len, char?, left?)` | Pad to a length |
| `isEmail(str)` | Pragmatic email check |

### Numbers

| Function | Description |
|----------|-------------|
| `clamp(num, min, max)` | Constrain between bounds |
| `formatNumber(num)` | Thousands separators |
| `round(num, places?)` | Round to N decimals |
| `randInt(min, max)` | Random integer inclusive |
| `randomFloat(min?, max?)` | Random float |
| `sum(arr)` | Total of an array |
| `average(arr)` | Mean of an array |
| `isEven(num)` / `isOdd(num)` | Parity checks |
| `inRange(num, min, max)` | Inclusive range check |
| `hash(str)` | djb2 32-bit hash |
| `parseIntSafe(value, fb?)` | Tolerant int parsing |

### Objects

| Function | Description |
|----------|-------------|
| `clone(obj)` / `deepClone(obj)` | Copy |
| `select(obj, keys)` | Pick keys |
| `omit(obj, keys)` | Drop keys |
| `pickBy(obj, predicate)` | Filter entries |
| `mapValues(obj, fn)` | Transform values |
| `merge(...objects)` | Shallow merge |
| `invert(obj)` | Swap keys ↔ values |
| `isEmpty(obj)` | No own keys |
| `get(obj, path, fb?)` | Safe nested read (`'a.b.c'`) |
| `set(obj, path, value)` | Nested write (creates objects) |

### Dates

| Function | Description |
|----------|-------------|
| `toDateString(date)` | `YYYY-MM-DD` |
| `formatDate(date, time?)` | `YYYY-MM-DD HH:MM` |
| `timeAgo(date)` | `'3 hours ago'` |
| `daysBetween(a, b)` | Whole days apart |
| `addDays(date, n)` | Shift by days |
| `startOfDay(date)` | Midnight |
| `isToday(date)` | Today check |
| `isLeapYear(year)` | Leap check |

### Async & decorators

| Function | Description |
|----------|-------------|
| `debounce(fn, wait?)` | Debounced function |
| `throttle(fn, limit?)` | At most once per window |
| `retry(fn, {times, delay})` | Async with backoff |
| `withTimeout(promise, ms)` | Hard timeout |
| `sleep(ms)` | Awaitable delay |
| `memoize(fn)` | Cache results by args |
| `once(fn)` | Run exactly once |
| `pipe(...fns)` | Left-to-right composition |
| `asyncMap(items, limit, fn)` | Concurrency-limited map |
| `parallel(fns)` | Run all, resolve all |

## 🧪 Tests

```bash
npm test
# All sajid-js tests passed ✓
```

The test suite runs with Node's built-in `assert` — no test framework needed.

## 🎮 Live playground

> **https://sajid.js.org**

The site is an interactive playground: pick any function, tweak the inputs, and
see the result instantly — right in the browser. It's both the landing page and
a working demonstration of the library.

## 📄 License

MIT — use it anywhere, for anything.

---

<div align="center">
  <sub>Built with JavaScript by <a href="https://github.com/thesajidalam">@thesajidalam</a></sub>
</div>
