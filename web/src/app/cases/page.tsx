import type { Metadata } from 'next';
import MarketingCasesPage from '@/components/marketing/cases-page';

export const metadata: Metadata = {
  title: '案例 | WanFlow',
  description: '查看 WanFlow 以匿名化方式展示的企业 AI 数据治理、流程自动化与模型运营案例结构。',
};

export default function CasesPage() {
  return <MarketingCasesPage />;
}
