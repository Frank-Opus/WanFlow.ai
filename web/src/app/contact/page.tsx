import type { Metadata } from 'next';
import MarketingContactPage from '@/components/marketing/contact-page';

export const metadata: Metadata = {
  title: '联系我们 | WanFlow',
  description: '联系 WanFlow，讨论企业 AI 数据标注、自动化数据处理、流程自动化与模型运营问题。',
};

export default function ContactPage() {
  return <MarketingContactPage />;
}
