<div align="center">
  <h1>⚡ sajid-js</h1>
  <p>A modern, dependency-free JavaScript utility toolkit.</p>
  <p>
    <a href="https://sajid.js.org"><img src="https://img.shields.io/badge/live-sajid.js.org-00D9FF?style=for-the-badge&logo=google-chrome&logoColor=white" /></a>
    <img src="https://img.shields.io/badge/zero%20dependencies-100%25-00FFAA?style=for-the-badge" />
    <img src="https://img.shields.io/badge/license-MIT-8b949e?style=for-the-badge" />
  </p>
  <img src="https://capsule-render.vercel.app/api?type=waving&height=120&color=0:0d1117,50:00d9ff,100:00ffaa&section=header" width="100%" />
</div>

---

**sajid-js** is a collection of small, reliable, dependency-free JavaScript helper functions covering **arrays, strings, numbers, objects, dates, and async patterns**. It works in the browser and in Node.js.

## 🎮 Live Playground

> **https://sajid.js.org**

The subdomain hosts an interactive playground where you can run every function live in your browser.

## ✨ Features

- **Zero dependencies** — just plain JavaScript
- **UMD build** — works with `<script>` tags and CommonJS
- **30+ utilities** — arrays, strings, numbers, objects, dates, async
- **Well-tested** — see `test/`
- **Tree-shakeable** — import just what you need

## 🚀 Install

```html
<!-- Browser -->
<script src="src/sajid.js"></script>
<script>window.sajid.shuffle([1,2,3]);</script>
```

```bash
# Node / npm
npm install sajid-js
```

```js
const sajid = require('sajid-js');
sajid.pascalCase('hello world'); // 'HelloWorld'
```

## 📦 Quick Examples

```js
sajid.shuffle([1,2,3,4,5]);        // random order
sajid.unique([1,1,2,2,3]);         // [1,2,3]
sajid.chunk([1,2,3,4,5], 2);       // [[1,2],[3,4],[5]]
sajid.slugify('Hello, World!');    // 'hello-world'
sajid.isEmail('a@b.com');          // true
sajid.clamp(42, 0, 10);            // 10
sajid.timeAgo(Date.now() - 3600e3);// '1 hour ago'
sajid.debounce(fn, 200);           // debounced fn
```

## 📂 API

| Group | Functions |
|-------|-----------|
| **Arrays** | `shuffle`, `pick`, `unique`, `chunk`, `sortBy`, `keyBy` |
| **Strings** | `capitalize`, `pascalCase`, `snakeCase`, `truncate`, `isEmail`, `slugify` |
| **Numbers** | `clamp`, `formatNumber`, `round`, `randInt`, `hash` |
| **Objects** | `select`, `omit`, `isEmpty`, `deepClone` |
| **Dates** | `toDateString`, `timeAgo`, `daysBetween`, `startOfDay` |
| **Async** | `debounce`, `throttle`, `retry`, `withTimeout` |

## 🧪 Tests

```bash
npm test
```

## 📄 License

MIT — do whatever you want with it.

---

<div align="center">
  <sub>Built with JavaScript by <a href="https://github.com/thesajidalam">@thesajidalam</a></sub>
</div>
