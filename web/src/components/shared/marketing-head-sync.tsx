'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/components/shared/locale-provider';
import { getMarketingCopy } from '@/lib/marketing';

function getRouteMeta(pathname: string, locale: 'zh' | 'en') {
  const copy = getMarketingCopy(locale);

  if (pathname.startsWith('/solutions')) {
    return locale === 'zh'
      ? {
          title: '行业解决方案 | WanFlow',
          description: '查看 WanFlow 面向金融、制造、零售、医疗和企业运营等行业的 AI 解决方案，以及对应的数据、流程和多智能体交付能力。',
        }
      : {
          title: 'Industry Solutions | WanFlow',
          description: 'See how WanFlow serves finance, manufacturing, retail, healthcare, and enterprise operations with practical AI delivery combinations.',
        };
  }

  if (pathname.startsWith('/cases')) {
    return locale === 'zh'
      ? {
          title: '真实案例 | WanFlow',
          description: '查看 WanFlow 在金融、制造、零售、汽车零部件和企业共享服务等场景中的匿名真实案例，以及对应的交付内容与量化结果。',
        }
      : {
          title: 'Real Cases | WanFlow',
          description: 'Review anonymized WanFlow delivery cases across finance, manufacturing, retail, automotive parts, and enterprise shared services.',
        };
  }

  if (pathname.startsWith('/about')) {
    return locale === 'zh'
      ? {
          title: '关于我们 | WanFlow',
          description: '了解 WanFlow 万物归流如何用数据、流程与模型运营视角建设企业 AI 交付系统。',
        }
      : {
          title: 'About | WanFlow',
          description: 'Learn how WanFlow builds enterprise AI delivery systems through data, workflow, and model operations.',
        };
  }

  if (pathname.startsWith('/contact')) {
    return locale === 'zh'
      ? {
          title: '联系我们 | WanFlow',
          description: '联系 WanFlow，讨论企业 AI 数据标注、自动化数据处理、流程自动化与模型运营问题。',
        }
      : {
          title: 'Contact | WanFlow',
          description: 'Contact WanFlow to discuss enterprise AI data labeling, automated data processing, workflow automation, and model operations.',
        };
  }

  return {
    title: copy.site.title,
    description: copy.site.description,
  };
}

export default function MarketingHeadSync() {
  const pathname = usePathname();
  const { locale } = useLocale();

  useEffect(() => {
    const isMarketingRoute =
      pathname === '/' ||
      pathname.startsWith('/solutions') ||
      pathname.startsWith('/cases') ||
      pathname.startsWith('/about') ||
      pathname.startsWith('/contact');

    if (!isMarketingRoute) {
      return;
    }

    const meta = getRouteMeta(pathname, locale);
    document.title = meta.title;

    const selectors = [
      ['meta[name="description"]', meta.description],
      ['meta[property="og:title"]', meta.title],
      ['meta[property="og:description"]', meta.description],
      ['meta[name="twitter:title"]', meta.title],
      ['meta[name="twitter:description"]', meta.description],
    ] as const;

    for (const [selector, content] of selectors) {
      const element = document.head.querySelector(selector);
      if (element) {
        element.setAttribute('content', content);
      }
    }
  }, [locale, pathname]);

  return null;
}
