import type { Metadata } from 'next';
import MarketingHomePage from '@/components/marketing/home-page';
import { siteContact } from '@/lib/marketing';

const PAGE_PUBLISHED = '2026-04-18';
const PAGE_MODIFIED = '2026-04-18';

export const metadata: Metadata = {
  title: '企业AI运营与交付伙伴：数据治理到模型运营闭环 | WanFlow',
  description:
    'WanFlow 将数据治理、流程自动化、多智能体与模型运营连接为企业AI交付体系。查看行业方案与真实案例，预约咨询获取可执行落地路径。',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WanFlow',
    alternateName: 'WanFlow 万流归智',
    url: 'https://wanflowai.com',
    logo: 'https://wanflowai.com/brand/logo-wide.png',
    description:
      'WanFlow 提供企业AI运营与交付能力，覆盖数据治理、流程自动化、多智能体协同与模型运营闭环。',
    sameAs: ['https://github.com/Frank-Opus/WanFlow.ai'],
    email: siteContact.email,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: siteContact.email,
        telephone: siteContact.phone,
        availableLanguage: ['zh-CN', 'en'],
      },
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WanFlow',
    url: 'https://wanflowai.com',
    inLanguage: ['zh-CN', 'en'],
    publisher: {
      '@type': 'Organization',
      name: 'WanFlow',
    },
  };

  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '企业AI运营与交付伙伴 | WanFlow',
    url: 'https://wanflowai.com/',
    datePublished: PAGE_PUBLISHED,
    dateModified: PAGE_MODIFIED,
    isPartOf: {
      '@type': 'WebSite',
      url: 'https://wanflowai.com',
      name: 'WanFlow',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'WanFlow 具体做什么？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'WanFlow 是企业AI运营与交付团队，帮助企业把数据治理、流程自动化、多智能体协同和模型运营接入真实业务流程。',
        },
      },
      {
        '@type': 'Question',
        name: '适合哪些企业场景？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '适合金融、制造、零售、医疗及企业运营场景，尤其适合需要跨部门协同、可追踪交付和持续优化的企业AI项目。',
        },
      },
      {
        '@type': 'Question',
        name: '如何开始合作？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '你可以从联系页提交咨询信息，我们会在业务日24小时内回复，并给出可执行的评估与落地路径建议。',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MarketingHomePage />
    </>
  );
}
