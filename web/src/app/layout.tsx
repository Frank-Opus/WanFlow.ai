import type { Metadata } from 'next';
import { LocaleProvider } from '@/components/shared/locale-provider';
import SiteFooter from '@/components/shared/site-footer';
import SiteHeader from '@/components/shared/site-header';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://127.0.0.1:3010';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'WanFlow.ai - BenchmarkOps',
  description: 'Enterprise evaluation workspace for source intake, benchmark execution, artifact replay, and delivery orchestration.',
  icons: {
    icon: '/brand/logo-mark.png',
    shortcut: '/brand/logo-mark.png',
    apple: '/brand/logo-mark.png',
  },
  openGraph: {
    title: 'WanFlow.ai - BenchmarkOps',
    description: 'Enterprise evaluation workspace for source intake, benchmark execution, artifact replay, and delivery orchestration.',
    images: ['/brand/logo-mark.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WanFlow.ai - BenchmarkOps',
    description: 'Enterprise evaluation workspace for source intake, benchmark execution, artifact replay, and delivery orchestration.',
    images: ['/brand/logo-mark.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen">
        <LocaleProvider>
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
