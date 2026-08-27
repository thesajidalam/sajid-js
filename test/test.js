const assert = require('assert');
const S = require('../src/sajid.js');

// Arrays
assert.deepStrictEqual(S.unique([1, 1, 2, 2, 3]), [1, 2, 3]);
assert.deepStrictEqual(S.chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
assert.ok([1, 2, 3].includes(S.pick([1, 2, 3])));
assert.deepStrictEqual(Object.keys(S.keyBy([{ id: 1 }, { id: 2 }], 'id')), ['1', '2']);

// Strings
assert.strictEqual(S.capitalize('hello'), 'Hello');
assert.strictEqual(S.pascalCase('hello world'), 'HelloWorld');
assert.strictEqual(S.snakeCase('Hello World'), 'hello_world');
assert.strictEqual(S.truncate('abcdefghij', 5), 'abcde…');
assert.strictEqual(S.isEmail('a@b.com'), true);
assert.strictEqual(S.isEmail('nope'), false);
assert.strictEqual(S.slugify('Hello, World!'), 'hello-world');

// Numbers
assert.strictEqual(S.clamp(42, 0, 10), 10);
assert.strictEqual(S.round(3.14159, 2), 3.14);
assert.strictEqual(typeof S.randInt(1, 2), 'number');
assert.strictEqual(typeof S.hash('test'), 'number');

// Objects
assert.deepStrictEqual(S.select({ a: 1, b: 2, c: 3 }, ['a', 'c']), { a: 1, c: 3 });
assert.deepStrictEqual(S.omit({ a: 1, b: 2 }, ['b']), { a: 1 });
assert.strictEqual(S.isEmpty({}), true);
assert.deepStrictEqual(S.deepClone({ a: { b: [1] } }), { a: { b: [1] } });

// Dates
assert.strictEqual(S.toDateString(new Date('2024-01-05T10:00:00')), '2024-01-05');
assert.strictEqual(S.daysBetween('2024-01-01', '2024-01-03'), 2);

console.log('All sajid-js tests passed ✓');
