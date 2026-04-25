import type { Metadata } from 'next';
import MarketingAboutPage from '@/components/marketing/about-page';
import { createMarketingPageMetadata } from '@/lib/marketing-metadata';

export const metadata: Metadata = createMarketingPageMetadata('/about');

export default function AboutPage() {
  return <MarketingAboutPage />;
}
