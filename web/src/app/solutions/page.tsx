import type { Metadata } from 'next';
import MarketingSolutionsPage from '@/components/marketing/solutions-page';
import { createMarketingPageMetadata } from '@/lib/marketing-metadata';

export const metadata: Metadata = createMarketingPageMetadata('/solutions');

export default function SolutionsPage() {
  return <MarketingSolutionsPage />;
}
