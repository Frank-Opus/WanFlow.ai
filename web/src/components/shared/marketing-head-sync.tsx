'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/components/shared/locale-provider';
import { getMarketingCopy } from '@/lib/marketing';

function getRouteMeta(pathname: string, locale: 'zh' | 'en') {
  const copy = getMarketingCopy(locale);

  if (pathname === '/') {
    return locale === 'zh'
      ? {
          title: '企业AI运营与交付伙伴：数据治理到模型运营闭环 | WanFlow',
          description: 'WanFlow 将数据治理、流程自动化、多智能体与模型运营连接为企业AI交付体系。查看行业方案与真实案例，预约咨询获取可执行落地路径。',
        }
      : {
          title: 'Enterprise AI Delivery Partner | WanFlow',
          description: 'WanFlow connects data governance, workflow automation, multi-agent systems, and model operations into one enterprise delivery system.',
        };
  }

  if (pathname.startsWith('/solutions')) {
    return locale === 'zh'
      ? {
          title: '行业解决方案 | WanFlow 企业AI运营与交付体系',
          description: '查看 WanFlow 面向金融、制造、零售、医疗和企业运营场景的 AI 解决方案，了解数据、流程和多智能体协同的落地方式。',
        }
      : {
          title: 'Industry Solutions | WanFlow Enterprise AI Delivery',
          description: 'Explore WanFlow solutions for finance, manufacturing, retail, healthcare, and enterprise operations.',
        };
  }

  if (pathname.startsWith('/cases')) {
    return locale === 'zh'
      ? {
          title: 'WanFlow 真实案例 | 企业AI运营与交付落地成果',
          description: '查看 WanFlow 在多行业场景中的真实交付案例，了解实施路径、关键结果与可复用方法。',
        }
      : {
          title: 'Real Cases | WanFlow',
          description: 'Review real enterprise AI delivery cases with methods, outcomes, and operational learnings.',
        };
  }

  if (pathname.startsWith('/about')) {
    return locale === 'zh'
      ? {
          title: '关于 WanFlow | 企业AI交付方法与团队能力',
          description: '了解 WanFlow 如何通过数据治理、流程自动化、多智能体协同与模型运营构建企业 AI 交付系统。',
        }
      : {
          title: 'About WanFlow | Enterprise AI Operations',
          description: 'Learn how WanFlow connects data governance, workflow automation, multi-agent systems, and model operations.',
        };
  }

  if (pathname.startsWith('/contact')) {
    return locale === 'zh'
      ? {
          title: '联系 WanFlow | 预约企业AI运营与交付咨询',
          description: '提交企业 AI 项目需求，WanFlow 将在业务日 24 小时内回复并提供可执行的评估与落地建议。',
        }
      : {
          title: 'Contact WanFlow | Book an AI Operations Review',
          description: 'Contact WanFlow for an executable enterprise AI delivery plan. We respond within 24 business hours.',
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
