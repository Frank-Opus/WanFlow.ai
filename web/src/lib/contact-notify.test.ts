import assert from 'node:assert/strict';
import { mkdtemp, readdir, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { buildContactNotificationMessage, getContactNotificationConfig, sendContactNotification, type ContactLeadRecord } from '@/lib/contact-notify';

const sampleRecord: ContactLeadRecord = {
  id: 'contact-1',
  createdAt: '2026-04-11T06:30:00.000Z',
  name: '测试用户',
  company: 'WanFlow QA',
  email: 'qa@wanflow.ai',
  interest: '流程自动化',
  timeline: '尽快开始',
  message: '需要尽快沟通自动化流程。',
};

test('getContactNotificationConfig defaults to disabled mode without SMTP credentials', () => {
  const config = getContactNotificationConfig({
    WANFLOW_ADMIN_EMAIL: 'wanflow@163.com',
  });

  assert.equal(config.mode, 'disabled');
  assert.equal(config.notifyTo, 'wanflow@163.com');
});

test('buildContactNotificationMessage targets the configured inbox', () => {
  const message = buildContactNotificationMessage(sampleRecord, {
    WANFLOW_ADMIN_EMAIL: 'wanflow@163.com',
  });

  assert.equal(message.to, 'wanflow@163.com');
  assert.equal(message.replyTo, sampleRecord.email);
  assert.match(message.subject, /WanFlow QA \/ 测试用户/);
});

test('sendContactNotification writes a JSON outbox message in json mode', async () => {
  const outboxDir = await mkdtemp(path.join(os.tmpdir(), 'wanflow-contact-email-'));
  const result = await sendContactNotification(sampleRecord, {
    WANFLOW_ADMIN_EMAIL: 'wanflow@163.com',
    WANFLOW_CONTACT_EMAIL_MODE: 'json',
    WANFLOW_CONTACT_EMAIL_JSON_DIR: outboxDir,
  });

  assert.equal(result.delivered, true);
  assert.equal(result.mode, 'json');

  const files = await readdir(outboxDir);
  assert.equal(files.length, 1);

  const payload = JSON.parse(await readFile(path.join(outboxDir, files[0]), 'utf8')) as {
    to?: Array<{ address?: string }>;
    replyTo?: Array<{ address?: string }>;
    subject?: string;
  };
  assert.equal(payload.to?.[0]?.address, 'wanflow@163.com');
  assert.equal(payload.replyTo?.[0]?.address, sampleRecord.email);
  assert.match(payload.subject ?? '', /WanFlow QA \/ 测试用户/);
});
