import type { Metadata } from 'next';
import MarketingSolutionsPage from '@/components/marketing/solutions-page';

export const metadata: Metadata = {
  title: '行业解决方案 | WanFlow 企业AI运营与交付体系',
  description:
    '查看 WanFlow 面向金融、制造、零售、汽车零部件、医疗和企业运营等场景的AI解决方案，了解数据、流程和多智能体协同的落地方式。',
  alternates: {
    canonical: '/solutions',
  },
};

export default function SolutionsPage() {
  return <MarketingSolutionsPage />;
}
