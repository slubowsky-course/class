import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createStorage } from '../../js/services/storage.js';

function fakeBackend() {
  const map = new Map();
  return {
    map,
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => map.set(k, v),
    removeItem: (k) => map.delete(k),
  };
}

const throwing = {
  getItem() { throw new Error('blocked'); },
  setItem() { throw new Error('blocked'); },
  removeItem() { throw new Error('blocked'); },
};

const isObj = (d) => typeof d?.x === 'number';

test('round-trips versioned data', () => {
  const storage = createStorage(fakeBackend());
  storage.set('k', 1, { x: 5 });
  assert.deepEqual(storage.get('k', 1, isObj), { x: 5 });
});

test('discards corrupt JSON', () => {
  const backend = fakeBackend();
  backend.map.set('k', '{not json');
  const storage = createStorage(backend);
  assert.equal(storage.get('k', 1, isObj), null);
  assert.equal(backend.map.has('k'), false);
});

test('discards a version mismatch', () => {
  const backend = fakeBackend();
  const storage = createStorage(backend);
  storage.set('k', 1, { x: 5 });
  assert.equal(storage.get('k', 2, isObj), null);
  assert.equal(backend.map.has('k'), false);
});

test('discards data that fails validation', () => {
  const backend = fakeBackend();
  const storage = createStorage(backend);
  storage.set('k', 1, { x: 'nope' });
  assert.equal(storage.get('k', 1, isObj), null);
});

test('falls back to memory when storage throws', () => {
  const storage = createStorage(throwing);
  storage.set('k', 1, { x: 7 });
  assert.deepEqual(storage.get('k', 1, isObj), { x: 7 });
  assert.equal(storage.isPersistent, false);
  storage.remove('k');
  assert.equal(storage.get('k', 1, isObj), null);
});

test('works with a null backend', () => {
  const storage = createStorage(null);
  storage.set('k', 1, { x: 1 });
  assert.deepEqual(storage.get('k', 1, isObj), { x: 1 });
});
