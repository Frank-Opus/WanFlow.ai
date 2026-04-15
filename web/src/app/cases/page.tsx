import type { Metadata } from 'next';
import MarketingCasesPage from '@/components/marketing/cases-page';

export const metadata: Metadata = {
  title: '真实案例 | WanFlow',
  description: '查看 WanFlow 在金融、制造、零售、汽车零部件和企业共享服务等场景中的匿名真实案例，以及对应的交付内容与量化结果。',
};

export default function CasesPage() {
  return <MarketingCasesPage />;
}
