import type { Metadata } from 'next';
import { getMarketingCopy } from '@/lib/marketing';

export type MarketingLocale = 'zh' | 'en';

type MarketingRouteKey = '/' | '/about' | '/cases' | '/contact' | '/solutions';

type MarketingRouteMeta = {
  canonical: MarketingRouteKey;
  description: string;
  title: string;
};

const marketingRouteMeta: Record<MarketingRouteKey, Record<MarketingLocale, MarketingRouteMeta>> = {
  '/': {
    zh: {
      canonical: '/',
      title: '企业AI运营与交付伙伴：数据治理到模型运营闭环 | WanFlow',
      description:
        'WanFlow 将数据治理、流程自动化、多智能体与模型运营连接为企业AI交付体系。查看行业方案与真实案例，预约咨询获取可执行落地路径。',
    },
    en: {
      canonical: '/',
      title: 'Enterprise AI Delivery Partner | WanFlow',
      description:
        'WanFlow connects data governance, workflow automation, multi-agent systems, and model operations into one enterprise delivery system.',
    },
  },
  '/about': {
    zh: {
      canonical: '/about',
      title: '关于 WanFlow | 企业AI交付方法与团队能力',
      description:
        '了解 WanFlow 如何通过数据治理、流程自动化、多智能体协同与模型运营，构建可持续运行的企业AI交付系统。',
    },
    en: {
      canonical: '/about',
      title: 'About WanFlow | Enterprise AI Operations',
      description:
        'Learn how WanFlow connects data governance, workflow automation, multi-agent systems, and model operations.',
    },
  },
  '/cases': {
    zh: {
      canonical: '/cases',
      title: 'WanFlow 真实案例 | 企业AI运营与交付落地成果',
      description:
        '查看 WanFlow 在金融、制造、零售与企业运营场景中的真实AI交付案例，了解实施路径、交付结果与可复用方法。',
    },
    en: {
      canonical: '/cases',
      title: 'Real Cases | WanFlow',
      description:
        'Review real enterprise AI delivery cases with methods, outcomes, and operational learnings.',
    },
  },
  '/contact': {
    zh: {
      canonical: '/contact',
      title: '联系 WanFlow | 预约企业AI运营与交付咨询',
      description:
        '联系 WanFlow 获取企业AI项目评估与落地建议。提交需求后，我们将在业务日24小时内回复并给出可执行路径。',
    },
    en: {
      canonical: '/contact',
      title: 'Contact WanFlow | Book an AI Operations Review',
      description:
        'Contact WanFlow for an executable enterprise AI delivery plan. We respond within 24 business hours.',
    },
  },
  '/solutions': {
    zh: {
      canonical: '/solutions',
      title: '行业解决方案 | WanFlow 企业AI运营与交付体系',
      description:
        '查看 WanFlow 面向金融、制造、零售、汽车零部件、医疗和企业运营等场景的AI解决方案，了解数据、流程和多智能体协同的落地方式。',
    },
    en: {
      canonical: '/solutions',
      title: 'Industry Solutions | WanFlow Enterprise AI Delivery',
      description:
        'Explore WanFlow solutions for finance, manufacturing, retail, automotive parts, healthcare, and enterprise operations.',
    },
  },
};

export function normalizeMarketingRoute(pathname: string): MarketingRouteKey | null {
  if (pathname === '/') return '/';
  if (pathname.startsWith('/about')) return '/about';
  if (pathname.startsWith('/cases')) return '/cases';
  if (pathname.startsWith('/contact')) return '/contact';
  if (pathname.startsWith('/solutions')) return '/solutions';
  return null;
}

export function getMarketingRouteMeta(pathname: string, locale: MarketingLocale): MarketingRouteMeta {
  const routeKey = normalizeMarketingRoute(pathname);

  if (routeKey) {
    return marketingRouteMeta[routeKey][locale];
  }

  const copy = getMarketingCopy(locale);
  return {
    canonical: '/',
    description: copy.site.description,
    title: copy.site.title,
  };
}

export function createMarketingPageMetadata(routeKey: MarketingRouteKey): Metadata {
  const { canonical, description, title } = marketingRouteMeta[routeKey].zh;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
  };
}
