import type { Metadata } from 'next';
import MarketingSolutionsPage from '@/components/marketing/solutions-page';

export const metadata: Metadata = {
  title: '解决方案 | WanFlow',
  description: '查看 WanFlow 如何用 AI 数据标注、自动化数据处理、流程自动化与模型运营服务构建企业 AI 执行链。',
};

export default function SolutionsPage() {
  return <MarketingSolutionsPage />;
}
