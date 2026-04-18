import type { Metadata } from 'next';
import MarketingContactPage from '@/components/marketing/contact-page';

export const metadata: Metadata = {
  title: '联系 WanFlow | 预约企业AI运营与交付咨询',
  description:
    '联系 WanFlow 获取企业AI项目评估与落地建议。提交需求后，我们将在业务日24小时内回复并给出可执行路径。',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <MarketingContactPage />;
}
