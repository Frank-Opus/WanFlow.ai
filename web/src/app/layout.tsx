import type { Metadata } from 'next';
import { LocaleProvider } from '@/components/shared/locale-provider';
import MarketingHeadSync from '@/components/shared/marketing-head-sync';
import SiteFooter from '@/components/shared/site-footer';
import SiteHeader from '@/components/shared/site-header';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wanflowai.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'WanFlow',
  title: '企业AI运营与交付体系 | WanFlow 万流归智',
  description:
    'WanFlow 帮助企业把数据治理、流程自动化、多智能体协同与模型运营接入真实业务。查看行业方案与案例，预约咨询并获取可落地的AI交付路径。',
  keywords: [
    'WanFlow',
    '企业AI运营',
    '企业AI交付',
    '数据治理',
    '流程自动化',
    '多智能体',
    '模型运营',
  ],
  category: 'technology',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/brand/logo-mark.png',
    shortcut: '/brand/logo-mark.png',
    apple: '/brand/logo-mark.png',
  },
  openGraph: {
    title: '企业AI运营与交付体系 | WanFlow',
    description:
      '数据治理、流程自动化、多智能体协同与模型运营一体化交付。了解 WanFlow 的行业方案、真实案例与落地方法。',
    images: ['/brand/logo-wide.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '企业AI运营与交付体系 | WanFlow',
    description:
      '数据治理、流程自动化、多智能体协同与模型运营一体化交付。了解 WanFlow 的行业方案、真实案例与落地方法。',
    images: ['/brand/logo-wide.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <LocaleProvider>
          <MarketingHeadSync />
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
