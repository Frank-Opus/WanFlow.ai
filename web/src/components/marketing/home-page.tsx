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
        openSolutions: '进入行业解决方案页',
        openCases: '进入真实案例页',
      }
    : {
        flow: 'Spine',
        brief: 'Key Overview',
        outcome: 'Outcome',
        openSolutions: 'Open the solutions page',
        openCases: 'Open the cases page',
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

        <MotionReveal as="section" delay={60} intensity="strong" className="mkt-panel px-6 py-8 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <SectionHeading
              eyebrow={locale === 'zh' ? '业务速览' : 'Business snapshot'}
              title={locale === 'zh' ? '企业 AI 运营与交付概览' : 'Enterprise AI operations snapshot'}
              body={locale === 'zh'
                ? 'WanFlow 围绕数据治理、流程自动化、多智能体协同与模型运营，帮助企业建立稳定、可复用的执行链路，并以统一术语、清晰输入输出和可验证指标支撑跨团队决策与规模化落地'
                : 'WanFlow aligns data governance, workflow automation, multi-agent collaboration, and model operations to build a stable, reusable execution chain with consistent terminology, clear input-output mapping, and verifiable indicators for cross-team decisions and scaled delivery'}
              size="large"
            />
            <div className="mkt-card px-5 py-5 sm:px-6 sm:py-6">
              <p className="mkt-kicker mkt-section-kicker-large">
                {locale === 'zh' ? '执行骨架' : 'Execution spine'}
              </p>
              <p className="mkt-copy mt-3 text-sm text-[var(--mk-text-1)]">{copy.home.platformView.body}</p>
              <ul className="mkt-copy mt-4 space-y-2 text-sm text-[var(--mk-text-0)]">
                {copy.home.platformView.bullets.map((bullet, index) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="mkt-card-index shrink-0">{labels.flow} 0{index + 1}</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mkt-snapshot-table-wrap mt-6 overflow-x-auto">
            <table className="mkt-snapshot-table min-w-full border-collapse text-sm">
              <colgroup className="mkt-snapshot-colgroup">
                <col className="mkt-snapshot-col mkt-snapshot-col-focus" />
                <col className="mkt-snapshot-col mkt-snapshot-col-io" />
                <col className="mkt-snapshot-col mkt-snapshot-col-kpi" />
              </colgroup>
              <thead>
                <tr>
                  <th className="mkt-snapshot-th text-left">{locale === 'zh' ? '客户关注' : 'Client concern'}</th>
                  <th className="mkt-snapshot-th text-left">{locale === 'zh' ? '输入到输出' : 'Input to output'}</th>
                  <th className="mkt-snapshot-th text-left">{locale === 'zh' ? 'KPI / 周期' : 'KPI / timeline'}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="mkt-snapshot-td">{locale === 'zh' ? '响应时效' : 'Response speed'}</td>
                  <td className="mkt-snapshot-td">{locale === 'zh' ? '咨询需求 -> 诊断建议与行动清单' : 'Consultation request -> diagnostic recommendations and action plan'}</td>
                  <td className="mkt-snapshot-td">{locale === 'zh' ? '24 小时内首轮回复 · 1 个工作日确认计划' : 'Initial response within 24 hours · plan confirmation in 1 business day'}</td>
                </tr>
                <tr>
                  <td className="mkt-snapshot-td">{locale === 'zh' ? '项目推进' : 'Project progress'}</td>
                  <td className="mkt-snapshot-td">{locale === 'zh' ? '业务目标与现状 -> 里程碑方案与阶段交付' : 'Business goals and baseline -> milestone plan and phased delivery'}</td>
                  <td className="mkt-snapshot-td">{locale === 'zh' ? '里程碑按期率 >95% · 2-6 周首期落地' : 'Milestone on-time rate >95% · first phase in 2-6 weeks'}</td>
                </tr>
                <tr>
                  <td className="mkt-snapshot-td">{locale === 'zh' ? '交付结果' : 'Delivery outcome'}</td>
                  <td className="mkt-snapshot-td">{locale === 'zh' ? '数据与流程基础 -> 可复用的 AI 运营闭环' : 'Data and workflow foundation -> reusable AI operations loop'}</td>
                  <td className="mkt-snapshot-td">{locale === 'zh' ? '关键流程稳定运行 · 持续迭代优化' : 'Stable operation of critical workflows · continuous iteration'}</td>
                </tr>
              </tbody>
            </table>
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
            <Link
              href="/solutions"
              aria-label={labels.openSolutions}
              className="group mkt-home-entry-card mkt-home-entry-card-primary touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(214,244,255,0.9)] focus-visible:ring-offset-4 focus-visible:ring-offset-[rgba(22,58,75,0.3)] active:translate-y-px active:scale-[0.992]"
            >
              <span className="mkt-home-entry-card-surface flex w-full items-center justify-center">
                <span className="mkt-home-entry-card-body flex min-w-0 flex-col items-center gap-1.5">
                  <span className="mkt-home-entry-card-label transition-transform duration-200 group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5 group-active:translate-y-0">
                    {solutionsLabel}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mkt-home-entry-card-feedback h-1.5 w-10 rounded-full bg-white/0 transition-all duration-200 group-hover:bg-white/18 group-focus-visible:bg-white/30 group-active:w-8"
                  />
                </span>
              </span>
            </Link>
            <Link
              href="/cases"
              aria-label={labels.openCases}
              className="group mkt-home-entry-card touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(47,143,184,0.42)] focus-visible:ring-offset-4 focus-visible:ring-offset-[rgba(242,248,251,0.92)] active:translate-y-px active:scale-[0.992]"
            >
              <span className="mkt-home-entry-card-surface flex w-full items-center justify-center">
                <span className="mkt-home-entry-card-body flex min-w-0 flex-col items-center gap-1.5">
                  <span className="mkt-home-entry-card-label transition-transform duration-200 group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5 group-active:translate-y-0">
                    {casesLabel}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mkt-home-entry-card-feedback h-1.5 w-10 rounded-full bg-[var(--mk-brand-1)]/0 transition-all duration-200 group-hover:bg-[var(--mk-brand-1)]/12 group-focus-visible:bg-[var(--mk-brand-1)]/18 group-active:w-8"
                  />
                </span>
              </span>
            </Link>
          </div>
        </MotionReveal>

        <MotionReveal as="section" delay={140} intensity="strong" className="mkt-panel px-6 py-7 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow={locale === 'zh' ? 'FAQ' : 'FAQ'}
            title={locale === 'zh' ? '常见问题' : 'Frequently asked questions'}
            body={locale === 'zh'
              ? '以下问答围绕服务范围、合作方式与交付节奏，帮助你快速了解 WanFlow 的合作路径。'
              : 'These answers cover service scope, collaboration model, and delivery cadence to help teams evaluate engagement quickly.'}
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
            eyebrow={locale === 'zh' ? '治理框架' : 'Governance framework'}
            title={locale === 'zh' ? '治理与实施标准' : 'Governance and implementation standards'}
            body={locale === 'zh'
              ? '我们参考以下公开标准与研究，作为企业 AI 项目治理、风险控制与交付评估的实践基线。'
              : 'These public standards and research references provide practical baselines for enterprise AI governance, risk control, and delivery evaluation.'}
            size="large"
          />
          <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-[var(--mk-text-1)]">
            <li>
              <a
                href="https://www.nist.gov/itl/ai-risk-management-framework"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-[var(--mk-brand-2)] underline-offset-4 transition-colors duration-200 text-[var(--mk-brand-4)] hover:text-[var(--mk-brand-1)]"
              >
                NIST AI Risk Management Framework (AI RMF 1.0)
              </a>
            </li>
            <li>
              <a
                href="https://www.iso.org/standard/81230.html"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-[var(--mk-brand-2)] underline-offset-4 transition-colors duration-200 text-[var(--mk-brand-4)] hover:text-[var(--mk-brand-1)]"
              >
                ISO/IEC 42001:2023 - AI Management System
              </a>
            </li>
            <li>
              <a
                href="https://arxiv.org/abs/2308.11432"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-[var(--mk-brand-2)] underline-offset-4 transition-colors duration-200 text-[var(--mk-brand-4)] hover:text-[var(--mk-brand-1)]"
              >
                AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation
              </a>
            </li>
          </ul>
          <p className="mt-4 text-right text-xs text-[var(--mk-text-2)]">
            {locale === 'zh' ? '内容版本更新：4-20' : 'Content version updated: 4-20'}
          </p>
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
