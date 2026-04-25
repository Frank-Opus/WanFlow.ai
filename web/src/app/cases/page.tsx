import type { Metadata } from 'next';
import MarketingCasesPage from '@/components/marketing/cases-page';
import { createMarketingPageMetadata } from '@/lib/marketing-metadata';

export const metadata: Metadata = createMarketingPageMetadata('/cases');

export default function CasesPage() {
  return <MarketingCasesPage />;
}
