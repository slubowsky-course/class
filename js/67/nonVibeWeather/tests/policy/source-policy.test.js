import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

function listJs(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? listJs(full) : full.endsWith('.js') ? [full] : [];
  });
}

const files = listJs(join(root, 'js'));

test('no raw HTML injection or dynamic code in app source', () => {
  const banned = /\.(innerHTML|outerHTML)\s*=|insertAdjacentHTML|document\.write|\beval\s*\(|new Function\s*\(/;
  const offenders = files.filter((f) => banned.test(readFileSync(f, 'utf8')));
  assert.deepEqual(offenders, []);
});

test('no absolute-path or protocol-relative URLs in index.html', () => {
  const html = readFileSync(join(root, 'index.html'), 'utf8');
  const bad = [...html.matchAll(/(?:href|src)="(\/[^"]*)"/g)].map((m) => m[1]);
  assert.deepEqual(bad, []);
});
