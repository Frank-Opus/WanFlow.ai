import type { Metadata } from 'next';
import MarketingHomePage from '@/components/marketing/home-page';
import { siteContact } from '@/lib/marketing';

export const metadata: Metadata = {
  title: 'WanFlow | 企业 AI 运营与交付伙伴',
  description: 'WanFlow 万物归流帮助企业把数据标注与治理、流程编排与自动化、企业级多智能体、人机协同交付和模型运营闭环真正接进业务里',
};

export default function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WanFlow',
    alternateName: 'WanFlow 万物归流',
    url: 'https://wanflowai.com',
    logo: 'https://wanflowai.com/brand/logo-wide.png',
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
