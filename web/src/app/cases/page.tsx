import type { Metadata } from 'next';
import MarketingCasesPage from '@/components/marketing/cases-page';

export const metadata: Metadata = {
  title: '真实案例 | WanFlow',
  description: '查看 WanFlow 在金融、制造、零售、医疗和企业共享服务等场景中的匿名化真实案例，以及具体的方案组合与交付结果。',
};

export default function CasesPage() {
  return <MarketingCasesPage />;
}
