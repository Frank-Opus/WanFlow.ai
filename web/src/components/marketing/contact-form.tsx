'use client';

import { useMemo, useState } from 'react';
import { useMarketingCopy } from '@/components/marketing/use-marketing-copy';

type FormState = {
  name: string;
  company: string;
  email: string;
  interest: string;
  timeline: string;
  message: string;
};

const initialState: FormState = {
  name: '',
  company: '',
  email: '',
  interest: '',
  timeline: '',
  message: '',
};

export default function ContactForm() {
  const copy = useMarketingCopy();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const interestOptions = useMemo(() => copy.contact.form.interests, [copy]);
  const timelineOptions = useMemo(() => copy.contact.form.timelines, [copy]);

  function validate(current: FormState) {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!current.name.trim()) nextErrors.name = copy.contact.form.validation.name;
    if (!current.company.trim()) nextErrors.company = copy.contact.form.validation.company;
    if (!/^\S+@\S+\.\S+$/.test(current.email.trim())) nextErrors.email = copy.contact.form.validation.email;
    if (!current.message.trim()) nextErrors.message = copy.contact.form.validation.message;
    return nextErrors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      setServerMessage(copy.contact.form.error);
      return;
    }

    setStatus('submitting');
    setServerMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(payload.message || copy.contact.form.error);
      }

      setStatus('success');
      setServerMessage(copy.contact.form.success);
      setForm(initialState);
      setErrors({});
    } catch (error) {
      setStatus('error');
      setServerMessage(error instanceof Error ? error.message : copy.contact.form.error);
    }
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  }

  return (
    <form className="mkt-form-panel" onSubmit={handleSubmit} noValidate>
      <div className="space-y-3">
        <p className="mkt-kicker">{copy.contact.form.title}</p>
        <h2 className="mkt-title text-[2rem] sm:text-[2.4rem]">{copy.contact.form.body}</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="mkt-form-field">
          <span>{copy.contact.form.fields.name}</span>
          <input
            value={form.name}
            onChange={(event) => update('name', event.target.value)}
            className="mkt-input"
            name="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-error-name' : undefined}
          />
          {errors.name ? <em id="contact-error-name" className="mkt-field-error">{errors.name}</em> : null}
        </label>

        <label className="mkt-form-field">
          <span>{copy.contact.form.fields.company}</span>
          <input
            value={form.company}
            onChange={(event) => update('company', event.target.value)}
            className="mkt-input"
            name="company"
            autoComplete="organization"
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? 'contact-error-company' : undefined}
          />
          {errors.company ? <em id="contact-error-company" className="mkt-field-error">{errors.company}</em> : null}
        </label>

        <label className="mkt-form-field">
          <span>{copy.contact.form.fields.email}</span>
          <input
            value={form.email}
            onChange={(event) => update('email', event.target.value)}
            className="mkt-input"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-error-email' : undefined}
          />
          {errors.email ? <em id="contact-error-email" className="mkt-field-error">{errors.email}</em> : null}
        </label>

        <label className="mkt-form-field">
          <span>{copy.contact.form.fields.interest}</span>
          <select
            value={form.interest}
            onChange={(event) => update('interest', event.target.value)}
            className="mkt-input"
            name="interest"
          >
            <option value="">--</option>
            {interestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="mkt-form-field md:col-span-2">
          <span>{copy.contact.form.fields.timeline}</span>
          <select
            value={form.timeline}
            onChange={(event) => update('timeline', event.target.value)}
            className="mkt-input"
            name="timeline"
          >
            <option value="">--</option>
            {timelineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="mkt-form-field md:col-span-2">
          <span>{copy.contact.form.fields.message}</span>
          <textarea
            value={form.message}
            onChange={(event) => update('message', event.target.value)}
            className="mkt-input min-h-[170px] resize-y"
            name="message"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'contact-error-message' : 'contact-privacy'}
          />
          {errors.message ? <em id="contact-error-message" className="mkt-field-error">{errors.message}</em> : null}
        </label>
      </div>

      <div className="flex flex-col gap-4 pt-2">
        <button type="submit" className="mkt-button-primary w-fit" disabled={status === 'submitting'}>
          {status === 'submitting' ? copy.contact.form.submitting : copy.contact.form.submit}
        </button>
        <p id="contact-privacy" className="mkt-copy text-sm">
          {copy.contact.form.privacy}
        </p>
        {status !== 'idle' ? (
          <p
            role={status === 'error' ? 'alert' : 'status'}
            className={status === 'success' ? 'mkt-status-success' : 'mkt-status-error'}
          >
            {serverMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
