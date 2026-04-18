'use client';

import Link from 'next/link';
import { useLocale } from '@/components/shared/locale-provider';
import { FinalCtaBand, PageHero, SectionHeading } from '@/components/marketing/primitives';
import MotionReveal from '@/components/shared/motion-reveal';
import { useMarketingCopy } from '@/components/marketing/use-marketing-copy';

export default function MarketingHomePage() {
  const copy = useMarketingCopy();
  const { locale } = useLocale();
  const labels = locale === 'zh'
    ? {
        flow: '骨架',
        brief: '核心概览',
        outcome: '结果',
      }
    : {
        flow: 'Spine',
        brief: 'Key Overview',
        outcome: 'Outcome',
      };
  const faqItems = locale === 'zh'
    ? [
        {
          q: 'WanFlow 具体做什么？',
          a: 'WanFlow 是企业 AI 运营与交付团队，帮助企业把数据治理、流程自动化、多智能体协同和模型运营接入真实业务流程。',
        },
        {
          q: '适合哪些企业场景？',
          a: '适合金融、制造、零售、医疗及企业运营场景，尤其适合需要跨部门协同、可追踪交付和持续优化的企业 AI 项目。',
        },
        {
          q: '如何开始合作？',
          a: '你可以从联系页提交咨询信息，我们会在业务日 24 小时内回复，并给出可执行的评估与落地路径建议。',
        },
      ]
    : [
        {
          q: 'What does WanFlow do?',
          a: 'WanFlow helps enterprise teams connect data governance, workflow automation, multi-agent collaboration, and model operations into one delivery system.',
        },
        {
          q: 'Which business scenarios are suitable?',
          a: 'It is suitable for finance, manufacturing, retail, healthcare, and enterprise operations where cross-team execution and traceable delivery matter.',
        },
        {
          q: 'How can we get started?',
          a: 'Submit your needs through the contact page. Our team responds within 24 business hours with an executable evaluation and rollout path.',
        },
      ];
  const solutionsLabel = copy.nav.find((item) => item.href === '/solutions')?.label ?? '/solutions';
  const casesLabel = copy.nav.find((item) => item.href === '/cases')?.label ?? '/cases';
  const getMetricValueClass = (value: string) => {
    if (value.length > 8) return 'mkt-metric-value mkt-metric-value-tight';
    if (value.length > 3) return 'mkt-metric-value mkt-metric-value-compact';
    return 'mkt-metric-value';
  };

  return (
    <main id="main-content" className="marketing-main">
      <div className="mkt-shell">
        <MotionReveal delay={0} intensity="hero" initiallyVisible>
          <PageHero
            eyebrow={copy.home.hero.eyebrow}
            eyebrowClassName="mkt-section-kicker-large"
            title={locale === 'zh'
              ? (
                  <span className="mkt-home-title">
                    让数据、流程和 <span className="mkt-home-title-accent">AI</span> 在业务里真正
                    <span className="mkt-home-title-glow"> 汇流</span>
                  </span>
                )
              : (
                  <span className="mkt-home-title">
                    Bring data, workflows, and <span className="mkt-home-title-accent">AI</span> into real business
                    <span className="mkt-home-title-glow"> execution</span>
                  </span>
                )}
            body={copy.home.hero.statement}
            primary={copy.home.hero.primary}
            secondary={copy.home.hero.secondary}
            aside={
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="mkt-kicker mkt-section-kicker-large">{labels.brief}</p>
                  <p className="mkt-copy text-sm text-[var(--mk-text-0)]">{copy.home.hero.body}</p>
                </div>
                <div className="mkt-stagger-grid grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
                  {copy.home.supportSignals.map((metric, index) => (
                    <article
                      key={metric.label}
                      className={index === copy.home.supportSignals.length - 1 ? 'mkt-card min-w-0 px-5 py-5 sm:col-span-2 xl:col-span-1' : 'mkt-card min-w-0 px-5 py-5'}
                    >
                      <p className={getMetricValueClass(metric.value)}>
                        {metric.value}
                      </p>
                      <p className="mkt-metric-label mt-3">{metric.label}</p>
                      <p className="mkt-copy mt-2 text-sm">{metric.detail}</p>
                    </article>
                  ))}
                </div>
              </div>
            }
          />
        </MotionReveal>

        <MotionReveal as="section" delay={60} intensity="strong" className="mkt-panel mkt-editorial-band px-6 py-8 sm:px-8 lg:px-10">
          <div className="mkt-card mb-6 px-5 py-5 sm:px-6 sm:py-6">
            <p className="mkt-kicker mkt-section-kicker-large">
              {locale === 'zh' ? '关键结论' : 'Key takeaways'}
            </p>
            <p className="mkt-copy mt-2 text-sm">
              {locale === 'zh'
                ? '更新日期：2026-04-18。WanFlow 提供企业 AI 运营与交付体系，核心价值在于把数据治理、流程自动化、多智能体协同与模型运营接入真实业务流程。'
                : 'Updated: 2026-04-18. WanFlow delivers an enterprise AI operating system by connecting data governance, workflow automation, multi-agent collaboration, and model operations.'}
            </p>
            <ul className="mkt-copy mt-3 list-disc space-y-1 pl-5 text-sm">
              <li>{locale === 'zh' ? '覆盖金融、制造、零售、医疗与企业运营场景' : 'Coverage spans finance, manufacturing, retail, healthcare, and enterprise operations.'}</li>
              <li>{locale === 'zh' ? '强调可追踪交付与持续优化闭环' : 'Delivery is designed for traceability and continuous optimization.'}</li>
              <li>{locale === 'zh' ? '支持预约咨询并在业务日 24 小时内响应' : 'Consultation requests are handled within 24 business hours.'}</li>
            </ul>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="border border-[var(--mk-line-1)] px-3 py-2 text-left">{locale === 'zh' ? '指标' : 'Metric'}</th>
                    <th className="border border-[var(--mk-line-1)] px-3 py-2 text-left">{locale === 'zh' ? '方法' : 'Method'}</th>
                    <th className="border border-[var(--mk-line-1)] px-3 py-2 text-left">{locale === 'zh' ? '目标结果' : 'Target outcome'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[var(--mk-line-1)] px-3 py-2">{locale === 'zh' ? '线索响应时效' : 'Lead response window'}</td>
                    <td className="border border-[var(--mk-line-1)] px-3 py-2">{locale === 'zh' ? '流程编排 + 协同路由' : 'Workflow orchestration + routing'}</td>
                    <td className="border border-[var(--mk-line-1)] px-3 py-2">{locale === 'zh' ? '业务日 24 小时内' : 'Within 24 business hours'}</td>
                  </tr>
                  <tr>
                    <td className="border border-[var(--mk-line-1)] px-3 py-2">{locale === 'zh' ? '交付闭环' : 'Delivery loop'}</td>
                    <td className="border border-[var(--mk-line-1)] px-3 py-2">{locale === 'zh' ? '数据治理 + 模型运营' : 'Data governance + model operations'}</td>
                    <td className="border border-[var(--mk-line-1)] px-3 py-2">{locale === 'zh' ? '持续优化迭代' : 'Continuous optimization'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <SectionHeading
              eyebrow={copy.home.platformView.eyebrow}
              title={copy.home.platformView.title}
              body={copy.home.platformView.body}
              size="large"
            />
            <div className="mkt-stagger-grid grid gap-3 md:grid-cols-2">
              {copy.home.platformView.bullets.map((bullet, index) => (
                <article
                  key={bullet}
                  className={index === 0 ? 'mkt-split-callout px-5 py-5 md:col-span-2' : 'mkt-rail-card px-5 py-5'}
                >
                  <span className="mkt-card-index">{labels.flow} 0{index + 1}</span>
                  <p className="mkt-card-heading-sm mt-4">{bullet}</p>
                </article>
              ))}
            </div>
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={90} intensity="strong" className="space-y-6">
          <SectionHeading
            eyebrow={copy.home.capabilityModules.eyebrow}
            title={copy.home.capabilityModules.title}
            body={copy.home.capabilityModules.body}
            size="large"
          />
          <div className="mkt-stagger-grid grid gap-4 lg:grid-cols-12">
            {copy.home.capabilityModules.items.map((item, index) => (
              <article
                key={item.title}
                className={[
                  'mkt-module-card px-5 py-5 sm:px-6 sm:py-6',
                  index === 0 ? 'lg:col-span-5 lg:row-span-2' : '',
                  index === 1 ? 'lg:col-span-7' : '',
                  index === 2 ? 'lg:col-span-4' : '',
                  index === 3 ? 'lg:col-span-3' : '',
                  index === 4 ? 'lg:col-span-5' : '',
                ].filter(Boolean).join(' ')}
              >
                <span className="mkt-card-index">0{index + 1}</span>
                <h3 className="zh-card-title mkt-card-heading mt-4">{item.title}</h3>
                <p className="mkt-copy mt-3">{item.body}</p>
                <p className="mt-6 border-t border-[var(--mk-line-1)] pt-4 text-sm text-[var(--mk-brand-1)]">
                  {labels.outcome}: {item.outcome}
                </p>
              </article>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={110} intensity="strong" className="mkt-panel px-6 py-7 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              eyebrow={copy.home.deliveryFramework.eyebrow}
              title={copy.home.deliveryFramework.title}
              body={copy.home.deliveryFramework.body}
              size="large"
            />
            <div className="mkt-stagger-grid space-y-3">
              {copy.home.deliveryFramework.steps.map((step) => (
                <article key={step.step} className="mkt-flow-step">
                  <div className="mkt-flow-marker">{step.step}</div>
                  <div>
                    <h3 className="zh-card-title mkt-card-heading-sm">{step.title}</h3>
                    <p className="mkt-copy mt-2 text-sm">{step.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={130} intensity="strong" className="mkt-panel px-6 py-6 sm:px-8 sm:py-7 lg:px-10">
          <div className="mkt-home-entry-grid">
            <Link href="/solutions" className="mkt-home-entry-card mkt-home-entry-card-primary">
              <span>{solutionsLabel}</span>
            </Link>
            <Link href="/cases" className="mkt-home-entry-card">
              <span>{casesLabel}</span>
            </Link>
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={140} intensity="strong" className="mkt-panel px-6 py-7 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow={locale === 'zh' ? 'FAQ' : 'FAQ'}
            title={locale === 'zh' ? '常见问题（便于 AI 直接提取）' : 'Frequently asked questions'}
            body={locale === 'zh'
              ? '以下问答与首页结构化数据保持一致，用于提升可提取性与引用准确性。'
              : 'These Q&A pairs are aligned with structured data to improve extractability and citation accuracy.'}
            size="large"
          />
          <div className="mt-6 space-y-4">
            {faqItems.map((item) => (
              <article key={item.q} className="mkt-card px-5 py-5 sm:px-6 sm:py-6">
                <h3 className="zh-card-title mkt-card-heading-sm">{item.q}</h3>
                <p className="mkt-copy mt-2 text-sm">{item.a}</p>
              </article>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={145} intensity="strong" className="mkt-panel px-6 py-7 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow={locale === 'zh' ? '参考依据' : 'References'}
            title={locale === 'zh' ? '方法与治理参考' : 'Method and governance references'}
            body={locale === 'zh'
              ? '以下公开标准与研究用于支撑企业 AI 运营治理、风险控制与评估流程设计。'
              : 'The following public standards and research are used as references for enterprise AI governance and evaluation design.'}
            size="large"
          />
          <ul className="mkt-copy mt-5 list-disc space-y-2 pl-5 text-sm">
            <li>
              <a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noreferrer" className="underline">
                NIST AI Risk Management Framework (AI RMF 1.0)
              </a>
            </li>
            <li>
              <a href="https://www.iso.org/standard/81230.html" target="_blank" rel="noreferrer" className="underline">
                ISO/IEC 42001:2023 - AI Management System
              </a>
            </li>
            <li>
              <a href="https://arxiv.org/abs/2308.11432" target="_blank" rel="noreferrer" className="underline">
                AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation
              </a>
            </li>
          </ul>
        </MotionReveal>

        <MotionReveal delay={150} intensity="strong">
          <FinalCtaBand
            eyebrow={copy.home.finalCta.eyebrow}
            title={copy.home.finalCta.title}
            body={copy.home.finalCta.body}
            primary={{ href: '/contact', label: copy.common.finalPrimary }}
            secondary={{ href: '/cases', label: copy.common.finalSecondary }}
            size="large"
          />
        </MotionReveal>
      </div>
    </main>
  );
}
