import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '服务条款 | WanFlow',
  description: 'WanFlow 官网服务条款，说明站点使用、咨询提交和业务沟通的基本规则。',
};

const sections = [
  {
    title: '1. 站点用途',
    body:
      'WanFlow 官网主要用于介绍公司服务能力、展示公开信息，并为潜在客户或合作方提供联系入口。你可以浏览公开页面、提交联系表单，并基于真实业务需求发起沟通。',
  },
  {
    title: '2. 信息真实性',
    body:
      '通过联系表单、邮件或电话向 WanFlow 提交信息时，你应确保所提供的信息真实、准确且与你当前的业务沟通目的相关。不得提交违法、侵权、恶意骚扰或明显虚假的内容。',
  },
  {
    title: '3. 知识产权',
    body:
      '除另有说明外，本站页面内容、品牌标识、文案结构、界面设计及相关资料均由 WanFlow 或其合法权利人持有。未经书面授权，不得擅自复制、转发、出售或用于误导性商业用途。',
  },
  {
    title: '4. 无保证条款',
    body:
      '本站展示的信息以当前公开版本为准，可能因产品、服务、交付方式或商业安排变化而调整。WanFlow 不保证站点中的所有说明在任何时间点都构成正式报价或最终承诺。',
  },
  {
    title: '5. 服务沟通与后续合作',
    body:
      '通过本站发起沟通，并不当然构成合同关系或正式合作承诺。具体合作范围、交付边界、保密要求、价格、服务级别和责任分配，应以双方后续签署的正式协议为准。',
  },
  {
    title: '6. 联系主体',
    body:
      '本站运营主体为上海万流归智科技有限公司。如对本条款有疑问，可通过 WanFlow 官网底部公布的联系方式与我们联系。',
  },
] as const;

export default function TermsPage() {
  return (
    <main id="main-content" className="marketing-main">
      <div className="mkt-shell">
        <section className="mkt-panel mkt-grid-lines px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
          <div className="max-w-4xl space-y-5">
            <p className="mkt-kicker">Terms</p>
            <h1 className="mkt-title">服务条款</h1>
            <p className="mkt-copy text-base">
              以下条款说明你访问 WanFlow 官网、使用公开联系入口以及基于本站信息发起业务沟通时适用的基本规则。
            </p>
          </div>
        </section>

        <section className="mkt-card px-6 py-6 sm:px-8 lg:px-10 lg:py-8">
          <div className="max-w-4xl space-y-6">
            {sections.map((section) => (
              <article key={section.title} className="border-t border-[var(--mk-line-1)] pt-6 first:border-t-0 first:pt-0">
                <h2 className="zh-card-title text-xl font-semibold text-[var(--mk-text-0)]">{section.title}</h2>
                <p className="mkt-copy mt-3 text-sm sm:text-base">{section.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
