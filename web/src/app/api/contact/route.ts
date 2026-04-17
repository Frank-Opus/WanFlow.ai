import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { sendContactNotification } from '@/lib/contact-notify';
import { PLATFORM_DIR } from '@/lib/platform-store';

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  interest?: string;
  timeline?: string;
  message?: string;
};

function normalize(value: unknown, max = 1200) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }

  const record = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    name: normalize(payload.name, 120),
    company: normalize(payload.company, 160),
    email: normalize(payload.email, 180),
    interest: normalize(payload.interest, 180),
    timeline: normalize(payload.timeline, 120),
    message: normalize(payload.message, 4000),
  };

  const emailOk = /^\S+@\S+\.\S+$/.test(record.email);
  if (!record.name || !record.company || !record.message || !emailOk) {
    return NextResponse.json({ message: 'Missing or invalid required fields.' }, { status: 400 });
  }

  const configuredLeadsDir = process.env.WANFLOW_MARKETING_LEADS_DIR?.trim();
  const leadsDir = configuredLeadsDir
    ? path.resolve(configuredLeadsDir)
    : path.join(PLATFORM_DIR, 'marketing-leads');
  await mkdir(leadsDir, { recursive: true });
  await writeFile(path.join(leadsDir, `${record.createdAt.replace(/[:.]/g, '-')}-${record.id}.json`), JSON.stringify(record, null, 2));

  try {
    const notification = await sendContactNotification(record);
    return NextResponse.json({ ok: true, id: record.id, emailDelivered: notification.delivered, emailMode: notification.mode });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Contact email forwarding failed.';
    return NextResponse.json({ message }, { status: 502 });
  }
}
