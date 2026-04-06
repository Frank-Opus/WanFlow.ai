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
          title: '解决方案 | WanFlow',
          description: '查看 WanFlow 如何用 AI 数据标注、自动化数据处理、流程自动化与模型运营服务构建企业 AI 执行链。',
        }
      : {
          title: 'Solutions | WanFlow',
          description: 'See how WanFlow connects AI data labeling, automated data processing, workflow automation, and model operations into one enterprise execution system.',
        };
  }

  if (pathname.startsWith('/cases')) {
    return locale === 'zh'
      ? {
          title: '案例 | WanFlow',
          description: '查看 WanFlow 以匿名化方式展示的企业 AI 数据治理、流程自动化与模型运营案例结构。',
        }
      : {
          title: 'Cases | WanFlow',
          description: 'Review anonymized WanFlow case structures across enterprise AI data governance, workflow automation, and model operations.',
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
