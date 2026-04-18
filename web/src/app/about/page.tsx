import type { Metadata } from 'next';
import MarketingAboutPage from '@/components/marketing/about-page';

export const metadata: Metadata = {
  title: '关于 WanFlow | 企业AI交付方法与团队能力',
  description:
    '了解 WanFlow 如何通过数据治理、流程自动化、多智能体协同与模型运营，构建可持续运行的企业AI交付系统。',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return <MarketingAboutPage />;
}
