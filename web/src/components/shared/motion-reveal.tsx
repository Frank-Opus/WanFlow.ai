'use client';

import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

type MotionRevealProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  children: ReactNode;
  delay?: number;
  intensity?: 'base' | 'strong' | 'hero';
  initiallyVisible?: boolean;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
};

function MotionRevealStatic({
  as: Tag = 'div',
  children,
  className,
  delay = 0,
  intensity = 'base',
  initiallyVisible = false,
  style,
  ...rest
}: MotionRevealProps) {
  return (
    <Tag
      data-in-view="true"
      data-initially-visible={initiallyVisible ? 'true' : 'false'}
      className={['mkt-reveal', `mkt-reveal-${intensity}`, className].filter(Boolean).join(' ')}
      style={{ '--reveal-delay': `${delay}ms`, ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function MotionRevealObserved({
  as: Tag = 'div',
  children,
  className,
  delay = 0,
  intensity = 'base',
  initiallyVisible = false,
  once = true,
  threshold = 0.18,
  rootMargin = '0px 0px -10% 0px',
  style,
  ...rest
}: MotionRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(initiallyVisible);

  useEffect(() => {
    if (initiallyVisible) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [initiallyVisible, once, rootMargin, threshold]);

  return (
    <Tag
      ref={ref}
      data-in-view={visible ? 'true' : 'false'}
      data-initially-visible={initiallyVisible ? 'true' : 'false'}
      className={['mkt-reveal', `mkt-reveal-${intensity}`, className].filter(Boolean).join(' ')}
      style={{ '--reveal-delay': `${delay}ms`, ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default function MotionReveal(props: MotionRevealProps) {
  if (props.initiallyVisible) {
    return <MotionRevealStatic {...props} />;
  }

  return <MotionRevealObserved {...props} />;
}
