'use client';

import Link from 'next/link';
import { useLocale } from '@/components/shared/locale-provider';

const COPY = {
  zh: {
    eyebrow: 'WanFlow.ai 企业评测基础设施',
    title: '把数据评测升级成可运行、可交付的平台。',
    body:
      '这不是单题演示页。WanFlow BenchmarkOps 围绕 Project、SourceFile、ProblemItem、BenchmarkRun、Artifact 五个核心对象，统一承接文件导入、题目治理、同步/异步评测、结果回看与交付导出。',
    primary: '进入 BenchmarkOps',
    secondary: '跳到运行中心',
    modelLabel: '默认展示模型',
    modelValue: 'Qwen/Qwen3-235B-A22B-Thinking-2507',
    infraTitle: '平台基线',
    infraBody:
      '前台是企业工作台，后台仍保留 Python 评测引擎与文件型平台数据层。上传、运行、下载、回放都落在同一条真实执行链上。',
    priorities: [
      { title: '输入统一', body: '支持 PDF、DOCX、JSON、TXT、Markdown、TeX、文件夹导入，先归一化再抽题。' },
      { title: '运行统一', body: '同步和异步共用同一套 API 与 Python runner，不分两套逻辑。' },
      { title: '交付统一', body: '每次评测都沉淀 JSON、XLSX 与诊断产物，方便内部复盘与客户回传。' },
    ],
    architectureEyebrow: '平台工作流',
    architectureTitle: '同一站点，覆盖数据公司最常见的评测闭环。',
    architectureBody:
      '首页不堆花哨指标，而是把真正关键的闭环讲清楚：源文件怎么进来、题目如何形成、评测如何执行、结果如何成为交付物。',
    flow: [
      { step: '01', title: '接收异构源文件', body: '浏览文件夹后上传，保留相对路径，并生成原文件与标准化产物。' },
      { step: '02', title: '抽取与治理题目', body: 'JSON 导入与人工补录并存，统一归档到 ProblemItem。' },
      { step: '03', title: '发起真实评测', body: '以当前题目和模型配置触发 sync / async run，并写入 BenchmarkRun。' },
      { step: '04', title: '交付证据包', body: '从 Artifact 下载 JSON、XLSX、LaTeX 与诊断文件，形成客户可读交付。' },
    ],
    objectsEyebrow: '固定核心对象',
    objectsTitle: '所有页面都围绕固定对象工作，而不是围绕单道题目堆功能。',
    objects: [
      { name: 'Project', body: '项目是顶层工作容器，沉淀成员、配置、运行与交付上下文。' },
      { name: 'SourceFile', body: '源文件支持多格式输入，并保留原件、标准化 JSON、抽取文本、LaTeX。' },
      { name: 'ProblemItem', body: '题目对象承接结构化字段、标签、答案与后续治理流程。' },
      { name: 'BenchmarkRun', body: '每次评测都有独立运行记录，包含状态、配置、命中率、耗时和错误信息。' },
      { name: 'Artifact', body: '产物对象负责下载、复放与企业交付，避免结果只停留在页面截图。' },
    ],
    deliveryEyebrow: '企业交付视角',
    deliveryTitle: '页面内容的组织方式，也按照真正的业务优先级来设计。',
    deliveryBody:
      '最重要的是运行中心、结果中心与预览中心，其次才是项目管理和治理信息。这样运营、算法和交付团队进入页面后，先看到要做的事，再看到元信息。',
    deliveryCards: [
      { title: '前端不是样品页', body: '首页负责讲清平台能力；工作台负责承接真实操作；页脚承接正式发布信息。' },
      { title: 'Python 引擎继续保留', body: '评测逻辑不迁走、不替换，平台只负责更好地编排与呈现结果。' },
      { title: '中英双语同步维护', body: '默认中文，但保留 English 切换，适合内外部双语演示与交付场景。' },
    ],
    finalTitle: '准备好直接进入企业工作台。',
    finalBody: '如果你要做真实导入、真实运行和真实下载，下一步不是继续看演示，而是直接进入 BenchmarkOps。',
    finalPrimary: '打开工作台',
    finalSecondary: '查看平台首页顶部导航',
  },
  en: {
    eyebrow: 'WanFlow.ai enterprise evaluation infrastructure',
    title: 'Turn data evaluation into an operable, delivery-ready platform.',
    body:
      'This is not a one-off workflow. WanFlow BenchmarkOps is built around five fixed objects: Project, SourceFile, ProblemItem, BenchmarkRun, and Artifact, covering intake, authoring, sync/async execution, review, and export.',
    primary: 'Open BenchmarkOps',
    secondary: 'Jump to run center',
    modelLabel: 'Default display model',
    modelValue: 'Qwen/Qwen3-235B-A22B-Thinking-2507',
    infraTitle: 'Platform baseline',
    infraBody:
      'The web layer is an enterprise workbench, while the Python evaluator and file-backed platform data remain intact underneath. Upload, execution, download, and replay stay on one real execution chain.',
    priorities: [
      { title: 'Unified intake', body: 'Accept PDF, DOCX, JSON, TXT, Markdown, TeX, and folders, then normalize before extraction.' },
      { title: 'Unified execution', body: 'Sync and async use the same API contract and Python runner instead of split logic.' },
      { title: 'Unified delivery', body: 'Each run persists JSON, XLSX, and diagnostics for internal review and client handoff.' },
    ],
    architectureEyebrow: 'Platform workflow',
    architectureTitle: 'One site covers the evaluation loop that data companies actually run.',
    architectureBody:
      'The homepage explains the real loop instead of decorating it with vanity metrics: how sources enter, how items are formed, how runs execute, and how results become deliverables.',
    flow: [
      { step: '01', title: 'Receive heterogeneous inputs', body: 'Browse folders, upload files, keep relative paths, and generate normalized derivatives.' },
      { step: '02', title: 'Extract and govern items', body: 'Structured JSON import and manual item authoring coexist under ProblemItem.' },
      { step: '03', title: 'Launch real benchmark runs', body: 'Trigger sync or async execution from the same run configuration and persist BenchmarkRun records.' },
      { step: '04', title: 'Ship evidence packs', body: 'Download JSON, XLSX, LaTeX, and diagnostics as enterprise-ready Artifacts.' },
    ],
    objectsEyebrow: 'Fixed domain model',
    objectsTitle: 'Every page is organized around the platform objects, not a single-problem prototype.',
    objects: [
      { name: 'Project', body: 'The anchor workspace for members, configuration, runs, and delivery context.' },
      { name: 'SourceFile', body: 'A multi-format source object that keeps originals, normalized JSON, extracted text, and LaTeX.' },
      { name: 'ProblemItem', body: 'The structured item object with fields, tags, answers, and later governance workflows.' },
      { name: 'BenchmarkRun', body: 'An execution record with status, config, accuracy, latency, and failure visibility.' },
      { name: 'Artifact', body: 'The delivery object used for download, replay, and enterprise evidence exchange.' },
    ],
    deliveryEyebrow: 'Enterprise delivery view',
    deliveryTitle: 'The information architecture follows business priority, not random widget order.',
    deliveryBody:
      'Run center, results center, and preview come first. Project management and governance follow after that, so operators see the job to do before meta-information.',
    deliveryCards: [
      { title: 'The frontend is not a sample page', body: 'The homepage explains the platform, the workbench handles the operation, and the footer supports formal publishing.' },
      { title: 'The Python engine stays', body: 'Evaluation logic remains in Python; the platform improves orchestration and presentation without replacing it.' },
      { title: 'Bilingual by default', body: 'Chinese is the default, while English stays available for external reviews and delivery scenarios.' },
    ],
    finalTitle: 'The next step is the real workbench.',
    finalBody: 'For real uploads, real benchmark execution, and real artifact downloads, go straight into BenchmarkOps.',
    finalPrimary: 'Open workbench',
    finalSecondary: 'Review top navigation',
  },
} as const;

export default function HomePage() {
  const { locale } = useLocale();
  const text = COPY[locale];

  return (
    <main id="main-content" className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 pb-12">
        <section className="panel-strong overflow-hidden rounded-[28px] px-6 py-8 sm:px-8 lg:px-12 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div className="hero-haze relative space-y-6">
              <p className="section-kicker">{text.eyebrow}</p>
              <div className="space-y-4">
                <h1 className="display-face max-w-4xl text-[2.25rem] leading-[1.04] text-ink sm:text-[2.9rem] lg:text-[3.45rem]">
                  {text.title}
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-[var(--mist)] sm:text-[1.02rem]">{text.body}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/proofbench" className="btn-primary rounded-[16px] px-5 py-3 text-sm font-semibold">
                  {text.primary}
                </Link>
                <a href="/proofbench#run-center" className="btn-secondary rounded-[16px] px-5 py-3 text-sm font-semibold">
                  {text.secondary}
                </a>
              </div>
            </div>

            <div className="grid gap-4 lg:justify-items-end">
              <div className="dark-card w-full rounded-[24px] p-6 shadow-[0_22px_44px_rgba(18,25,38,0.14)]">
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[rgba(248,250,252,0.62)]">{text.modelLabel}</p>
                <p className="mt-3 text-xl font-semibold leading-8">{text.modelValue}</p>
                <div className="soft-rule mt-5 pt-5">
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[rgba(248,250,252,0.62)]">{text.infraTitle}</p>
                  <p className="mt-3 text-sm leading-7 text-[rgba(248,250,252,0.76)]">{text.infraBody}</p>
                </div>
              </div>

              <div className="surface-shell w-full rounded-[24px]">
                {text.priorities.map((item, index) => (
                  <article
                    key={item.title}
                    className={[
                      'grid gap-3 px-5 py-4 sm:grid-cols-[7.5rem_1fr]',
                      index > 0 ? 'border-t border-[rgba(25,40,72,0.08)]' : '',
                    ].join(' ')}
                  >
                    <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--mist)]">{item.title}</p>
                    <p className="text-sm leading-7 text-[var(--ink-soft)]">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="shell-stripe rounded-[24px] px-6 py-6 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div className="space-y-4">
              <p className="section-kicker">{text.architectureEyebrow}</p>
              <h2 className="display-face max-w-[18ch] text-[2rem] leading-tight text-ink sm:text-[2.55rem]">{text.architectureTitle}</h2>
              <p className="max-w-xl text-sm leading-7 text-[var(--mist)] sm:text-[0.98rem]">{text.architectureBody}</p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {text.flow.map((item) => (
                <article key={item.step} className="quiet-card rounded-[20px] p-5">
                  <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--mist)]">{item.step}</p>
                  <p className="mt-3 text-lg font-semibold text-ink">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--mist)]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.84fr_1.16fr]">
          <div className="panel rounded-[24px] px-6 py-7 sm:px-8">
            <p className="section-kicker">{text.objectsEyebrow}</p>
            <h2 className="mt-4 max-w-[17ch] text-[1.8rem] font-semibold leading-tight text-ink sm:text-[2.35rem]">
              {text.objectsTitle}
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {text.objects.map((item, index) => (
              <article
                key={item.name}
                className={[
                  'rounded-[20px] border p-5',
                  index === 0 || index === 3 ? 'surface-emphasis' : 'quiet-card',
                ].join(' ')}
              >
                <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[var(--mist)]">{item.name}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel rounded-[26px] px-6 py-7 sm:px-8 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr] lg:items-start">
            <div className="space-y-4">
              <p className="section-kicker">{text.deliveryEyebrow}</p>
              <h2 className="max-w-[17ch] text-[1.9rem] font-semibold leading-tight text-ink sm:text-[2.45rem]">{text.deliveryTitle}</h2>
              <p className="max-w-xl text-sm leading-7 text-[var(--mist)] sm:text-[0.98rem]">{text.deliveryBody}</p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {text.deliveryCards.map((item) => (
                <article key={item.title} className="quiet-card rounded-[20px] p-5">
                  <p className="text-base font-semibold text-ink">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--mist)]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="shell-stripe rounded-[24px] px-6 py-7 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="section-kicker">{text.finalTitle}</p>
              <p className="max-w-2xl text-sm leading-7 text-[var(--mist)] sm:text-[1rem]">{text.finalBody}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/proofbench" className="btn-primary rounded-[16px] px-5 py-3 text-sm font-semibold">
                {text.finalPrimary}
              </Link>
              <a href="#site-top" className="btn-secondary rounded-[16px] px-5 py-3 text-sm font-semibold">
                {text.finalSecondary}
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
