import type { Metadata } from 'next';
import MarketingAboutPage from '@/components/marketing/about-page';

export const metadata: Metadata = {
  title: '关于我们 | WanFlow',
  description: '了解 WanFlow 万物归流如何用数据、流程与模型运营视角建设企业 AI 交付系统。',
};

export default function AboutPage() {
  return <MarketingAboutPage />;
}
