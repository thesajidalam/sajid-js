const assert = require('assert');
const S = require('../src/sajid.js');

// ============ Arrays ============
assert.deepStrictEqual(S.unique([1, 1, 2, 2, 3]), [1, 2, 3]);
assert.deepStrictEqual(S.chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
assert.ok([1, 2, 3].includes(S.pick([1, 2, 3])));
assert.deepStrictEqual(Object.keys(S.keyBy([{ id: 1 }, { id: 2 }], 'id')), ['1', '2']);
assert.deepStrictEqual(S.flatten([1, [2, 3], [4]]), [1, 2, 3, 4]);
assert.deepStrictEqual(S.range(1, 5), [1, 2, 3, 4, 5]);
assert.deepStrictEqual(S.range(3), [0, 1, 2, 3]);
assert.deepStrictEqual(S.compact([0, 1, '', 2, null, 3]), [1, 2, 3]);
assert.strictEqual(S.last([1, 2, 3]), 3);
assert.strictEqual(S.first([1, 2, 3]), 1);
assert.deepStrictEqual(
  S.groupBy([{ t: 'a' }, { t: 'a' }, { t: 'b' }], 't'),
  { a: [{ t: 'a' }, { t: 'a' }], b: [{ t: 'b' }] }
);
assert.deepStrictEqual(S.intersection([1, 2, 3, 3], [2, 3, 4]), [2, 3]);

// ============ Strings ============
assert.strictEqual(S.capitalize('hello'), 'Hello');
assert.strictEqual(S.pascalCase('hello world'), 'HelloWorld');
assert.strictEqual(S.snakeCase('Hello World'), 'hello_world');
assert.strictEqual(S.truncate('abcdefghij', 5), 'abcde…');
assert.strictEqual(S.isEmail('a@b.com'), true);
assert.strictEqual(S.isEmail('nope'), false);
assert.strictEqual(S.slugify('Hello, World!'), 'hello-world');
assert.strictEqual(S.kebabCase('HelloWorld'), 'hello-world');
assert.strictEqual(S.camelCase('hello world'), 'helloWorld');
assert.strictEqual(S.titleCase('hello world'), 'Hello World');
assert.strictEqual(S.reverse('abc'), 'cba');
assert.strictEqual(S.countOccurrences('a-b-a-b', '-'), 3);
assert.strictEqual(S.mask('12345678'), '****5678');
assert.strictEqual(S.escapeRegExp('a.b+c'), 'a\\.b\\+c');
assert.strictEqual(S.pad('1', 3, '0'), '001');

// ============ Numbers ============
assert.strictEqual(S.clamp(42, 0, 10), 10);
assert.strictEqual(S.round(3.14159, 2), 3.14);
assert.strictEqual(typeof S.randInt(1, 2), 'number');
assert.strictEqual(typeof S.hash('test'), 'number');
assert.strictEqual(S.inRange(5, 1, 10), true);
assert.strictEqual(S.inRange(0, 1, 10), false);
assert.ok(S.randomFloat(0, 1) >= 0 && S.randomFloat(0, 1) <= 1);
assert.strictEqual(S.sum([1, 2, 3]), 6);
assert.strictEqual(S.average([1, 2, 3]), 2);
assert.strictEqual(S.isEven(4), true);
assert.strictEqual(S.isOdd(3), true);
assert.strictEqual(S.parseIntSafe('42'), 42);
assert.strictEqual(S.parseIntSafe('nope', 0), 0);

// ============ Objects ============
assert.deepStrictEqual(S.select({ a: 1, b: 2, c: 3 }, ['a', 'c']), { a: 1, c: 3 });
assert.deepStrictEqual(S.omit({ a: 1, b: 2 }, ['b']), { a: 1 });
assert.strictEqual(S.isEmpty({}), true);
assert.deepStrictEqual(S.deepClone({ a: { b: [1] } }), { a: { b: [1] } });
assert.deepStrictEqual(S.merge({ a: 1 }, { b: 2 }, { a: 9 }), { a: 9, b: 2 });
assert.strictEqual(S.get({ a: { b: { c: 42 } } }, 'a.b.c'), 42);
assert.strictEqual(S.get({}, 'x.y', 'no'), 'no');
assert.deepStrictEqual(S.set({}, 'a.b.c', 1), { a: { b: { c: 1 } } });
assert.deepStrictEqual(S.pickBy({ a: 1, b: 2, c: 5 }, (v) => v > 1), { b: 2, c: 5 });
assert.deepStrictEqual(S.mapValues({ a: 1, b: 2 }, (v) => v * 2), { a: 2, b: 4 });
assert.deepStrictEqual(S.invert({ a: 1, b: 2 }), { 1: 'a', 2: 'b' });

// ============ Dates ============
assert.strictEqual(S.toDateString(new Date('2024-01-05T10:00:00')), '2024-01-05');
assert.strictEqual(S.daysBetween('2024-01-01', '2024-01-03'), 2);
assert.strictEqual(S.toDateString(S.addDays('2024-01-01', 3)), '2024-01-04');
assert.strictEqual(S.isToday(new Date()), true);
assert.strictEqual(S.isLeapYear(2024), true);
assert.strictEqual(S.isLeapYear(2023), false);
assert.strictEqual(S.formatDate(new Date(2024, 0, 5)), '2024-01-05');

// ============ Async / Decorators ============
assert.strictEqual(S.pipe((x) => x + 1, (x) => x * 2)(3), 8);
const memo = S.memoize((x) => x * 2);
assert.strictEqual(memo(2), 4);
assert.strictEqual(memo(2), 4); // cached
let count = 0;
const once = S.once(() => ++count);
once(); once();
assert.strictEqual(count, 1);

// asyncMap
(async () => {
  const out = await S.asyncMap([1, 2, 3, 4], 2, (x) => Promise.resolve(x * 10));
  assert.deepStrictEqual(out, [10, 20, 30, 40]);
  const par = await S.parallel([async () => 1, async () => 2]);
  assert.deepStrictEqual(par, [1, 2]);
  await S.sleep(5);
  console.log('All sajid-js tests passed ✓');
})();
