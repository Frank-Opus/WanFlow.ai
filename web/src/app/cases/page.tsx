import type { Metadata } from 'next';
import MarketingCasesPage from '@/components/marketing/cases-page';

export const metadata: Metadata = {
  title: '案例 | WanFlow',
  description: '查看 WanFlow 以匿名化方式展示的数据标注与治理、流程编排与自动化、人机协同交付和模型运营闭环案例结构。',
};

export default function CasesPage() {
  return <MarketingCasesPage />;
}
