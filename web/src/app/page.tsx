import type { Metadata } from 'next';
import MarketingHomePage from '@/components/marketing/home-page';
import { siteContact } from '@/lib/marketing';

export const metadata: Metadata = {
  title: 'WanFlow | 数据驱动的 AI 运营与交付伙伴',
  description: 'WanFlow 万物归流面向企业提供 AI 数据标注、自动化数据处理、流程自动化、Process as a Service 与模型运营服务。',
};

export default function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WanFlow',
    alternateName: 'WanFlow 万物归流',
    url: 'https://wanflow.ai',
    logo: 'https://wanflow.ai/brand/logo-wide.png',
    email: siteContact.email,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: siteContact.email,
        availableLanguage: ['zh-CN', 'en'],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <MarketingHomePage />
    </>
  );
}
