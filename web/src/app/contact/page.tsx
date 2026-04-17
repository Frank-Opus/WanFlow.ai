import type { Metadata } from 'next';
import MarketingContactPage from '@/components/marketing/contact-page';

export const metadata: Metadata = {
  title: '联系我们 | WanFlow',
  description: '联系 WanFlow，讨论企业数据标注与治理、流程编排与自动化、企业级多智能体、人机协同交付与模型运营闭环问题。',
};

export default function ContactPage() {
  return <MarketingContactPage />;
}
