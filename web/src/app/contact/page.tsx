import type { Metadata } from 'next';
import MarketingContactPage from '@/components/marketing/contact-page';
import { createMarketingPageMetadata } from '@/lib/marketing-metadata';

export const metadata: Metadata = createMarketingPageMetadata('/contact');

export default function ContactPage() {
  return <MarketingContactPage />;
}
