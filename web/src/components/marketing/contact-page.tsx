'use client';

import ContactForm from '@/components/marketing/contact-form';
import { PageHero, useMarketingCopy } from '@/components/marketing/primitives';

export default function MarketingContactPage() {
  const copy = useMarketingCopy();

  return (
    <main id="main-content" className="marketing-main">
      <div className="mkt-shell">
        <PageHero
          eyebrow={copy.contact.hero.eyebrow}
          title={copy.contact.hero.title}
          body={copy.contact.hero.body}
          primary={{ href: '/contact', label: copy.common.primaryCta }}
          secondary={{ href: '/solutions', label: copy.nav[1].label }}
          aside={
            <div className="mkt-proof-panel space-y-4">
              <p className="mkt-kicker">{copy.contact.side.responseTitle}</p>
              <h3 className="text-[1.45rem] font-semibold tracking-[-0.03em] text-[var(--mk-text-0)]">{copy.contact.side.title}</h3>
              <p className="mkt-copy text-sm">{copy.contact.side.responseBody}</p>
            </div>
          }
        />

        <section className="grid gap-5 xl:grid-cols-[1.02fr_0.98fr]">
          <ContactForm />

          <div className="grid gap-5">
            <section className="mkt-card px-6 py-6">
              <p className="mkt-kicker">{copy.contact.side.title}</p>
              <div className="mt-4 space-y-3">
                {copy.contact.side.reasons.map((reason) => (
                  <article key={reason} className="mkt-list-row">
                    <span className="mkt-list-dot" />
                    <p className="mkt-copy text-sm">{reason}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mkt-card px-6 py-6">
              <p className="mkt-kicker">{copy.contact.side.responseTitle}</p>
              <p className="mkt-copy mt-4 text-sm">{copy.contact.side.responseBody}</p>
              <div className="mt-4 space-y-3 text-sm text-[var(--mk-text-1)]">
                {copy.contact.side.contactItems.map((item) => (
                  <p key={item} className="mkt-list-item">{item}</p>
                ))}
              </div>
            </section>

            <section className="mkt-card px-6 py-6">
              <p className="mkt-kicker">FAQ</p>
              <div className="mt-4 space-y-4">
                {copy.contact.faq.map((item) => (
                  <article key={item.question} className="border-t border-[var(--mk-line-1)] pt-4 first:border-t-0 first:pt-0">
                    <h3 className="text-base font-semibold text-[var(--mk-text-0)]">{item.question}</h3>
                    <p className="mkt-copy mt-2 text-sm">{item.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
