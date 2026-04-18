import type { Metadata } from 'next';
import MarketingCasesPage from '@/components/marketing/cases-page';

export const metadata: Metadata = {
  title: 'WanFlow 真实案例 | 企业AI运营与交付落地成果',
  description:
    '查看 WanFlow 在金融、制造、零售与企业运营场景中的真实AI交付案例，了解实施路径、交付结果与可复用方法。',
  alternates: {
    canonical: '/cases',
  },
};

export default function CasesPage() {
  return <MarketingCasesPage />;
}
