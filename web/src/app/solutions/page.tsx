import type { Metadata } from 'next';
import MarketingSolutionsPage from '@/components/marketing/solutions-page';

export const metadata: Metadata = {
  title: '解决方案 | WanFlow',
  description: '查看 WanFlow 如何以数据标注与治理、流程编排与自动化、企业级多智能体、人机协同交付和模型运营闭环构建企业 AI 执行体系。',
};

export default function SolutionsPage() {
  return <MarketingSolutionsPage />;
}
