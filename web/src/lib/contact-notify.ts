import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import nodemailer from 'nodemailer';
import { siteContact } from '@/lib/marketing';

export type ContactLeadRecord = {
  id: string;
  createdAt: string;
  name: string;
  company: string;
  email: string;
  interest: string;
  timeline: string;
  message: string;
};

type ContactNotificationMode = 'disabled' | 'json' | 'smtp';

type ContactNotificationConfig = {
  mode: ContactNotificationMode;
  notifyTo: string;
  from: string;
  replyTo: string;
  jsonDir: string | null;
  smtp:
    | {
        host: string;
        port: number;
        secure: boolean;
        user: string;
        pass: string;
      }
    | null;
};

type ContactNotificationResult = {
  delivered: boolean;
  mode: ContactNotificationMode;
  messageId: string | null;
};

function normalize(value: string | undefined) {
  return value?.trim() ?? '';
}

function parseSecureFlag(value: string | undefined, fallback: boolean) {
  const normalized = normalize(value).toLowerCase();
  if (!normalized) return fallback;
  return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on';
}

export function getContactNotificationConfig(env: NodeJS.ProcessEnv = process.env): ContactNotificationConfig {
  const modeValue = normalize(env.WANFLOW_CONTACT_EMAIL_MODE).toLowerCase();
  const notifyTo = normalize(env.WANFLOW_CONTACT_NOTIFY_TO) || normalize(env.WANFLOW_ADMIN_EMAIL) || siteContact.email;
  const smtpHost = normalize(env.WANFLOW_CONTACT_SMTP_HOST);
  const smtpPortValue = normalize(env.WANFLOW_CONTACT_SMTP_PORT);
  const smtpPort = smtpPortValue ? Number.parseInt(smtpPortValue, 10) : 465;
  const smtpUser = normalize(env.WANFLOW_CONTACT_SMTP_USER) || notifyTo;
  const smtpPass = normalize(env.WANFLOW_CONTACT_SMTP_PASS);
  const smtpSecure = parseSecureFlag(env.WANFLOW_CONTACT_SMTP_SECURE, smtpPort === 465);
  const from = normalize(env.WANFLOW_CONTACT_SMTP_FROM) || smtpUser || notifyTo;
  const jsonDir = normalize(env.WANFLOW_CONTACT_EMAIL_JSON_DIR) || null;
  const replyTo = siteContact.email;

  if (modeValue === 'json') {
    if (!jsonDir) {
      throw new Error('WANFLOW_CONTACT_EMAIL_JSON_DIR is required when WANFLOW_CONTACT_EMAIL_MODE=json.');
    }

    return {
      mode: 'json',
      notifyTo,
      from,
      replyTo,
      jsonDir,
      smtp: null,
    };
  }

  const hasCompleteSmtpConfig = Boolean(smtpHost && smtpUser && smtpPass && Number.isFinite(smtpPort));
  if (modeValue === 'smtp') {
    if (!hasCompleteSmtpConfig) {
      throw new Error('SMTP forwarding requires WANFLOW_CONTACT_SMTP_HOST, WANFLOW_CONTACT_SMTP_PORT, WANFLOW_CONTACT_SMTP_USER, and WANFLOW_CONTACT_SMTP_PASS.');
    }

    return {
      mode: 'smtp',
      notifyTo,
      from,
      replyTo,
      jsonDir: null,
      smtp: {
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        user: smtpUser,
        pass: smtpPass,
      },
    };
  }

  if (hasCompleteSmtpConfig) {
    return {
      mode: 'smtp',
      notifyTo,
      from,
      replyTo,
      jsonDir: null,
      smtp: {
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        user: smtpUser,
        pass: smtpPass,
      },
    };
  }

  return {
    mode: 'disabled',
    notifyTo,
    from: from || notifyTo,
    replyTo,
    jsonDir: null,
    smtp: null,
  };
}

export function buildContactNotificationMessage(record: ContactLeadRecord, env: NodeJS.ProcessEnv = process.env) {
  const config = getContactNotificationConfig(env);
  const subject = `[WanFlow Contact] ${record.company} / ${record.name}`;
  const text = [
    'WanFlow 收到一条新的联系表单。',
    '',
    `提交时间: ${record.createdAt}`,
    `姓名: ${record.name}`,
    `公司/团队: ${record.company}`,
    `邮箱: ${record.email}`,
    `关注方向: ${record.interest || '未填写'}`,
    `期望节奏: ${record.timeline || '未填写'}`,
    '',
    '问题描述:',
    record.message,
  ].join('\n');

  const html = `
    <h2>WanFlow 收到一条新的联系表单</h2>
    <p><strong>提交时间：</strong>${record.createdAt}</p>
    <p><strong>姓名：</strong>${record.name}</p>
    <p><strong>公司 / 团队：</strong>${record.company}</p>
    <p><strong>邮箱：</strong>${record.email}</p>
    <p><strong>关注方向：</strong>${record.interest || '未填写'}</p>
    <p><strong>期望节奏：</strong>${record.timeline || '未填写'}</p>
    <p><strong>问题描述：</strong></p>
    <pre style="white-space:pre-wrap;font:inherit;">${escapeHtml(record.message)}</pre>
  `.trim();

  return {
    from: config.from,
    to: config.notifyTo,
    replyTo: record.email,
    subject,
    text,
    html,
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function sendContactNotification(
  record: ContactLeadRecord,
  env: NodeJS.ProcessEnv = process.env,
): Promise<ContactNotificationResult> {
  const config = getContactNotificationConfig(env);
  const message = buildContactNotificationMessage(record, env);

  if (config.mode === 'disabled') {
    return {
      delivered: false,
      mode: 'disabled',
      messageId: null,
    };
  }

  if (config.mode === 'json') {
    const transporter = nodemailer.createTransport({ jsonTransport: true });
    const info = await transporter.sendMail(message);
    const serialized = typeof info.message === 'string' ? info.message : JSON.stringify(info.message);
    await mkdir(config.jsonDir!, { recursive: true });
    await writeFile(
      path.join(config.jsonDir!, `${record.createdAt.replace(/[:.]/g, '-')}-${record.id}.json`),
      serialized,
    );

    return {
      delivered: true,
      mode: 'json',
      messageId: info.messageId,
    };
  }

  const transporter = nodemailer.createTransport({
    host: config.smtp!.host,
    port: config.smtp!.port,
    secure: config.smtp!.secure,
    auth: {
      user: config.smtp!.user,
      pass: config.smtp!.pass,
    },
  });

  const info = await transporter.sendMail(message);
  if (info.rejected.length > 0) {
    throw new Error(`Contact email rejected for: ${info.rejected.join(', ')}`);
  }

  return {
    delivered: true,
    mode: 'smtp',
    messageId: info.messageId,
  };
}
