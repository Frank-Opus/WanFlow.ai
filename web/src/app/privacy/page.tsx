import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '隐私政策 | WanFlow',
  description: 'WanFlow 隐私政策，说明联系表单、站点访问与业务沟通信息的收集、使用与保护方式。',
};

const sections = [
  {
    title: '1. 适用范围',
    body:
      '本隐私政策适用于 WanFlow 官网及其公开联系页面。若你通过本站提交联系表单、发送邮件或与我们进行业务沟通，本政策将说明相关信息如何被收集和使用。',
  },
  {
    title: '2. 我们收集的信息',
    body:
      '我们可能收集你主动提交的姓名、公司/团队、工作邮箱、联系电话、关注方向、期望节奏和问题描述；同时保留必要的提交时间、系统日志和联系记录，用于业务跟进与安全审计。',
  },
  {
    title: '3. 信息使用方式',
    body:
      '这些信息仅用于回复你的咨询、评估合作场景、安排后续沟通、维护服务安全，以及保存必要的业务往来记录。未经你的明确授权，我们不会将这些信息用于与当前业务无关的营销活动。',
  },
  {
    title: '4. 信息存储与保护',
    body:
      'WanFlow 会采取合理的管理与技术措施保护所收集的信息，限制无关访问、误用、泄露或未经授权的更改。联系表单信息可能存储在内部业务系统或受控服务器环境中。',
  },
  {
    title: '5. 信息共享',
    body:
      '除法律法规要求、监管机关依法要求，或为完成你明确发起的业务合作所必需外，WanFlow 不会向无关第三方出售、出租或披露你的个人信息。',
  },
  {
    title: '6. 联系我们',
    body:
      '若你希望咨询本隐私政策、更新联系信息或申请删除不再需要的业务沟通记录，可通过官网公布的邮箱、电话或联系表单与我们联系。',
  },
] as const;

export default function PrivacyPage() {
  return (
    <main id="main-content" className="marketing-main">
      <div className="mkt-shell">
        <section className="mkt-panel mkt-grid-lines px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
          <div className="max-w-4xl space-y-5">
            <p className="mkt-kicker mkt-section-kicker-large">Privacy</p>
            <h1 className="mkt-title mkt-subpage-title">隐私政策</h1>
            <p className="mkt-copy text-base">
              本站由上海万流归智科技有限公司运营。以下内容用于说明 WanFlow 官网在业务沟通场景下如何收集、使用和保护你的信息。
            </p>
          </div>
        </section>

        <section className="mkt-card px-6 py-6 sm:px-8 lg:px-10 lg:py-8">
          <div className="max-w-4xl space-y-6">
            {sections.map((section) => (
              <article key={section.title} className="border-t border-[var(--mk-line-1)] pt-6 first:border-t-0 first:pt-0">
                <h2 className="zh-card-title mkt-card-heading-lg">{section.title}</h2>
                <p className="mkt-copy mt-3 text-sm sm:text-base">{section.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
