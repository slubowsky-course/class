import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createCredentialService } from '../../js/services/credentialService.js';
import { createStorage } from '../../js/services/storage.js';
import { AppError } from '../../js/core/errors.js';

const GOOD = '0123456789abcdef0123456789abcdef';

function setup(validate = async () => 'valid') {
  const provider = {
    id: 'fake',
    credentials: [{ pattern: /^[a-f0-9]{32}$/i }],
    validateCredentials: async (creds, opts) => validate(creds, opts),
  };
  const storage = createStorage(null);
  return { service: createCredentialService({ storage, provider }), storage, provider };
}

test('rejects a badly formatted key without calling the provider', async () => {
  let called = false;
  const { service } = setup(async () => { called = true; return 'valid'; });
  const result = await service.save('too-short');
  assert.deepEqual(result, { ok: false, reason: 'format' });
  assert.equal(called, false);
  assert.equal(service.hasKey(), false);
});

test('trims whitespace and stores a valid key', async () => {
  const { service } = setup();
  const result = await service.save(`  ${GOOD}\n`);
  assert.equal(result.ok, true);
  assert.deepEqual(service.getCredentials(), { apiKey: GOOD });
  assert.equal(service.hint(), '…cdef');
});

test('does not store a key the provider rejects', async () => {
  const { service } = setup(async () => 'invalid');
  const result = await service.save(GOOD);
  assert.deepEqual(result, { ok: false, reason: 'rejected' });
  assert.equal(service.hasKey(), false);
});

test('force stores a well-formed key without validating', async () => {
  let called = false;
  const { service } = setup(async () => { called = true; return 'invalid'; });
  const result = await service.save(GOOD, { force: true });
  assert.equal(result.ok, true);
  assert.equal(called, false);
  assert.equal(service.hasKey(), true);
});

test('force still enforces the format check', async () => {
  const { service } = setup();
  assert.deepEqual(await service.save('nope', { force: true }), { ok: false, reason: 'format' });
});

test('a network error is reported, not stored', async () => {
  const error = new AppError('OFFLINE', 'offline');
  const { service } = setup(async () => { throw error; });
  const result = await service.save(GOOD);
  assert.deepEqual(result, { ok: false, reason: 'error', error });
  assert.equal(service.hasKey(), false);
});

test('clear removes the key', async () => {
  const { service } = setup();
  await service.save(GOOD);
  service.clear();
  assert.equal(service.hasKey(), false);
  assert.equal(service.hint(), null);
});

test('a key saved for a different provider is ignored', async () => {
  const { service, storage, provider } = setup();
  await service.save(GOOD);
  const other = createCredentialService({ storage, provider: { ...provider, id: 'other' } });
  assert.equal(other.hasKey(), false);
});
