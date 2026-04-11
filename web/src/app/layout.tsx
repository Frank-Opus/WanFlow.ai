import type { Metadata } from 'next';
import { IBM_Plex_Mono, Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google';
import { LocaleProvider } from '@/components/shared/locale-provider';
import MarketingHeadSync from '@/components/shared/marketing-head-sync';
import SiteFooter from '@/components/shared/site-footer';
import SiteHeader from '@/components/shared/site-header';
import './globals.css';

const notoSerifSc = Noto_Serif_SC({
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  preload: false,
});

const notoSansSc = Noto_Sans_SC({
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
  preload: false,
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wanflowai.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'WanFlow',
  title: 'WanFlow | 企业 AI 运营与交付伙伴',
  description: 'WanFlow 万物归流帮助企业把数据处理、流程自动化和模型运营真正接进业务里',
  keywords: ['WanFlow', '万物归流', 'AI 数据标注', '自动化数据处理', '流程自动化', 'Process as a Service', '模型运营服务'],
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
    title: 'WanFlow | Data-driven AI operations for enterprise delivery',
    description: 'AI data labeling, automated data processing, workflow automation, Process as a Service, and model operations services for enterprise teams.',
    images: ['/brand/logo-wide.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WanFlow | Data-driven AI operations for enterprise delivery',
    description: 'AI data labeling, automated data processing, workflow automation, Process as a Service, and model operations services for enterprise teams.',
    images: ['/brand/logo-wide.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${notoSerifSc.variable} ${notoSansSc.variable} ${plexMono.variable} min-h-screen antialiased`}>
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
