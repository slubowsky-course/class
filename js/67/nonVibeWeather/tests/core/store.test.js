import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createStore } from '../../js/core/store.js';
import { initialState, reducer } from '../../js/state.js';

test('dispatch replaces state and notifies subscribers', () => {
  const store = createStore(reducer, initialState);
  const seen = [];
  store.subscribe((s) => seen.push(s.net.online));

  store.dispatch({ type: 'net/set', online: false });

  assert.deepEqual(seen, [false]);
  assert.equal(store.getState().net.online, false);
  assert.equal(initialState.net.online, true);
});

test('no-op action does not notify', () => {
  const store = createStore(reducer, initialState);
  let calls = 0;
  store.subscribe(() => calls++);

  store.dispatch({ type: 'net/set', online: true });
  store.dispatch({ type: 'unknown' });

  assert.equal(calls, 0);
});

test('unsubscribe stops notifications', () => {
  const store = createStore(reducer, initialState);
  let calls = 0;
  const off = store.subscribe(() => calls++);
  off();

  store.dispatch({ type: 'net/set', online: false });

  assert.equal(calls, 0);
});

test('a listener unsubscribing during notify does not skip the next one', () => {
  const store = createStore(reducer, initialState);
  let second = 0;
  const off = store.subscribe(() => off());
  store.subscribe(() => second++);

  store.dispatch({ type: 'net/set', online: false });

  assert.equal(second, 1);
});
