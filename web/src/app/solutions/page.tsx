import type { Metadata } from 'next';
import MarketingSolutionsPage from '@/components/marketing/solutions-page';

export const metadata: Metadata = {
  title: '行业解决方案 | WanFlow',
  description: '查看 WanFlow 面向金融、制造、零售、医疗和企业运营等行业的 AI 解决方案，以及对应的数据、流程和多智能体交付能力。',
};

export default function SolutionsPage() {
  return <MarketingSolutionsPage />;
}
