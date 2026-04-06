import test from 'node:test';
import assert from 'node:assert/strict';
import { deriveRunNote, deriveRunStatus } from './proofbench.ts';

test('deriveRunStatus maps unauthorized model calls to error instead of incorrect', () => {
  const error = '401 Client Error: Unauthorized for url: http://35.220.164.252:3888/v1/chat/completions';
  assert.equal(deriveRunStatus(false, error), 'error');
});

test('deriveRunStatus keeps timeout as timeout', () => {
  assert.equal(deriveRunStatus(false, 'Read timed out.'), 'timeout');
});

test('deriveRunNote preserves auth failure detail for operator diagnosis', () => {
  const note = deriveRunNote({
    is_correct: false,
    error: '401 Client Error: Unauthorized for url: http://35.220.164.252:3888/v1/chat/completions',
    predicted_answer: '',
  });
  assert.equal(note.noteCode, 'error');
  assert.match(note.note, /Unauthorized/);
});
