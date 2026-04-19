import { expect, test } from '@playwright/test';

const desktopPages = [
  { name: 'home', path: '/' },
  { name: 'solutions', path: '/solutions' },
  { name: 'cases', path: '/cases' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' },
] as const;

test.describe('marketing desktop regressions', () => {
  test.skip(({ isMobile }) => isMobile);

  test('desktop header navigation stays stable across route changes', async ({ page }) => {
    const measureHeader = async (path: string) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      return page.evaluate(() => {
        const nav = document.querySelector('header nav[aria-label]') as HTMLElement | null;
        const activeLink = document.querySelector('header nav[aria-label] a[aria-current="page"]') as HTMLElement | null;

        if (!nav || !activeLink) {
          throw new Error('Header navigation or active link not found');
        }

        const navRect = nav.getBoundingClientRect();
        const activeRect = activeLink.getBoundingClientRect();

        return {
          navLeft: Math.round(navRect.left),
          navTop: Math.round(navRect.top),
          navHeight: Math.round(navRect.height),
          activeHeight: Math.round(activeRect.height),
        };
      });
    };

    const home = await measureHeader('/');
    const solutions = await measureHeader('/solutions');

    expect(Math.abs(home.navLeft - solutions.navLeft)).toBeLessThanOrEqual(1);
    expect(Math.abs(home.navTop - solutions.navTop)).toBeLessThanOrEqual(1);
    expect(Math.abs(home.navHeight - solutions.navHeight)).toBeLessThanOrEqual(1);
    expect(Math.abs(home.activeHeight - solutions.activeHeight)).toBeLessThanOrEqual(1);
  });

  for (const pageCase of desktopPages) {
    test(pageCase.name + ' renders without desktop overflow', async ({ page }, testInfo) => {
      if (pageCase.name === 'solutions') {
        test.slow();
      }

      await page.goto(pageCase.path);
      await page.waitForLoadState('networkidle');

      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('main h1').first()).toBeVisible();
      await expect(page.locator('header').first()).toBeVisible();
      await expect(page.locator('header nav[aria-label]').first()).toBeVisible();

      const overflow = await page.evaluate(() => {
        const root = document.documentElement;
        return {
          scrollWidth: root.scrollWidth,
          clientWidth: root.clientWidth,
          overflowX: Math.max(0, root.scrollWidth - root.clientWidth),
        };
      });

      expect(overflow.overflowX).toBeLessThanOrEqual(1);

      const screenshotPath = testInfo.outputPath(pageCase.name + '-desktop.png');
      await page.screenshot({
        path: screenshotPath,
        fullPage: pageCase.name !== 'solutions',
        animations: 'disabled',
        timeout: pageCase.name === 'solutions' ? 20_000 : 45_000,
      });
      await testInfo.attach(pageCase.name + '-desktop', {
        path: screenshotPath,
        contentType: 'image/png',
      });
    });
  }

  test('solutions industry rail stays inside the industry card and remains swipeable on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1200 });
    await page.goto('/solutions');
    await page.waitForLoadState('networkidle');

    const firstIndustryMetrics = await page.evaluate(() => {
      const strip = document.querySelector('.mkt-industry-strip');
      const rail = strip?.querySelector('.mkt-industry-rail');
      const firstCard = rail?.querySelector('.mkt-industry-module-card');
      const mainImage = strip?.querySelector('.mkt-industry-media-frame .mkt-solution-image-main');
      const moduleImage = rail?.querySelector('.mkt-solution-image-module');

      if (
        !(strip instanceof HTMLElement) ||
        !(rail instanceof HTMLElement) ||
        !(firstCard instanceof HTMLElement) ||
        !(mainImage instanceof HTMLElement) ||
        !(moduleImage instanceof HTMLElement)
      ) {
        throw new Error('Solutions industry layout elements are missing');
      }

      const stripRect = strip.getBoundingClientRect();
      const railRect = rail.getBoundingClientRect();
      const cardRect = firstCard.getBoundingClientRect();
      const parseScale = (transform: string) => {
        if (!transform || transform === 'none') return 1;
        const match = transform.match(/matrix\(([^,]+)/);
        return match ? Number.parseFloat(match[1]) : 1;
      };

      return {
        railOverflow: Math.round(rail.scrollWidth - rail.clientWidth),
        railWithinStrip:
          railRect.left >= stripRect.left - 1 &&
          railRect.right <= stripRect.right + 1,
        cardWidth: Math.round(cardRect.width),
        railWidth: Math.round(rail.clientWidth),
        peekWidth: Math.round(rail.clientWidth - cardRect.width),
        mainScale: parseScale(getComputedStyle(mainImage).transform),
        moduleScale: parseScale(getComputedStyle(moduleImage).transform),
      };
    });

    expect(firstIndustryMetrics.railWithinStrip).toBe(true);
    expect(firstIndustryMetrics.railOverflow).toBeGreaterThan(40);
    expect(firstIndustryMetrics.cardWidth).toBeLessThan(firstIndustryMetrics.railWidth);
    expect(firstIndustryMetrics.peekWidth).toBeGreaterThanOrEqual(24);
    expect(firstIndustryMetrics.mainScale).toBeGreaterThanOrEqual(1.18);
    expect(firstIndustryMetrics.mainScale).toBeLessThanOrEqual(1.22);
    expect(firstIndustryMetrics.moduleScale).toBeGreaterThanOrEqual(1.1);
  });

  test('cases page keeps main visuals zoomed without overflow', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1200 });
    await page.goto('/cases');
    await page.waitForLoadState('networkidle');

    const metrics = await page.evaluate(() => {
      const image = document.querySelector('.mkt-case-image-main');
      const parseScale = (transform: string) => {
        if (!transform || transform === 'none') return 1;
        const match = transform.match(/matrix\(([^,]+)/);
        return match ? Number.parseFloat(match[1]) : 1;
      };

      if (!(image instanceof HTMLElement)) {
        throw new Error('Cases main image is missing');
      }

      return {
        scale: parseScale(getComputedStyle(image).transform),
      };
    });

    expect(metrics.scale).toBeGreaterThanOrEqual(1.48);
    expect(metrics.scale).toBeLessThanOrEqual(1.52);
  });

  test('home page wires motion hooks and desktop header actions', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('.mkt-reveal').first()).toBeVisible();
    await expect(page.locator('.mkt-hero-stage-1').first()).toBeVisible();
    await expect(page.locator('.mkt-stagger-grid').first()).toBeVisible();
    await expect(page.locator('header a[href="/contact"]').first()).toBeVisible();

    const screenshotPath = testInfo.outputPath('home-motion-hooks.png');
    await page.screenshot({ path: screenshotPath, fullPage: false, animations: 'disabled', timeout: 20_000 });
    await testInfo.attach('home-motion-hooks', {
      path: screenshotPath,
      contentType: 'image/png',
    });
  });

  test('proofbench entry redirects unauthenticated visitors to login', async ({ page }) => {
    await page.goto('/dataflow/proofbench');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/\/dataflow\/proofbench\/login\?next=%2Fdataflow%2Fproofbench$/);
    await expect(page.getByRole('heading', { name: '登录 BenchmarkOps 企业评测台' })).toBeVisible();
  });

  test('english marketing pages stay aligned with the current public narrative', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'EN' }).click();
    await expect(page.locator('main h1').first()).toHaveText('Bring data, workflows, and AI into real business execution');

    await page.goto('/solutions');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('main')).toContainText('Industry Solutions');
    await expect(page.locator('main')).toContainText('Automotive & Parts Manufacturing');
    await expect(page.locator('main')).not.toContainText('Healthcare & Pharma');

    await page.goto('/cases');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('article.mkt-case-detail-card')).toHaveCount(3);
    await expect(page.locator('main')).toContainText('Review and recheck workflow redesign for a consumer finance institution');
    await expect(page.locator('main')).toContainText('Exception and inventory coordination redesign for a discrete manufacturer');
    await expect(page.locator('main')).toContainText('Operations automation and weekly reporting for an e-commerce brand');
    await expect(page.locator('main')).not.toContainText('Healthcare & Pharma');
  });

  test('about credentials carousel keeps desktop slides reachable', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1200 });
    await page.goto('/about');
    await page.waitForLoadState('networkidle');

    const stage = page.locator('.mkt-credentials-stage');
    const viewport = page.locator('.mkt-credentials-viewport');
    const slides = page.locator('.mkt-credentials-slide');
    const prevArrow = page.locator('.mkt-credentials-arrow').first();
    const nextArrow = page.locator('.mkt-credentials-arrow').last();
    const readProbe = async (clicks: number) => page.evaluate((clickCount) => {
      const prev = document.querySelectorAll('.mkt-credentials-arrow')[0];
      const next = document.querySelectorAll('.mkt-credentials-arrow')[1];
      const stageEl = document.querySelector('.mkt-credentials-stage');
      const viewportEl = document.querySelector('.mkt-credentials-viewport');
      const activeSlide = document.querySelector('.mkt-credentials-slide-active');
      const slidesInDom = Array.from(document.querySelectorAll('.mkt-credentials-slide'));

      if (!(viewportEl instanceof HTMLElement) || !(stageEl instanceof HTMLElement) || !(activeSlide instanceof HTMLElement)) {
        throw new Error('Credentials carousel elements are missing');
      }

      const stageRect = stageEl.getBoundingClientRect();
      const prevRect = prev instanceof HTMLElement ? prev.getBoundingClientRect() : null;
      const nextRect = next instanceof HTMLElement ? next.getBoundingClientRect() : null;
      const visibleSlides = slidesInDom
        .map((slide, index) => {
          if (!(slide instanceof HTMLElement)) return null;

          const rect = slide.getBoundingClientRect();
          const intersectsStage = rect.right > stageRect.left && rect.left < stageRect.right;

          if (!intersectsStage) return null;

          return { index, left: rect.left, right: rect.right };
        })
        .filter((slide): slide is { index: number; left: number; right: number } => Boolean(slide))
        .sort((a, b) => a.left - b.left);
      const visibleGaps = visibleSlides.slice(1).map((slide, index) =>
        Math.round((slide.left - visibleSlides[index].right) * 100) / 100,
      );
      const gapSpread = visibleGaps.length > 1
        ? Math.round((Math.max(...visibleGaps) - Math.min(...visibleGaps)) * 100) / 100
        : 0;
      const prevSlide = slidesInDom.find(
        (slide): slide is HTMLElement => slide instanceof HTMLElement && slide.classList.contains('mkt-credentials-slide-prev'),
      );
      const nextSlide = slidesInDom.find(
        (slide): slide is HTMLElement => slide instanceof HTMLElement && slide.classList.contains('mkt-credentials-slide-next'),
      );
      const activeCard = activeSlide.querySelector('.mkt-credentials-card');
      const prevCard = prevSlide?.querySelector('.mkt-credentials-card') ?? null;
      const nextCard = nextSlide?.querySelector('.mkt-credentials-card') ?? null;
      const activeRect = activeCard instanceof HTMLElement ? activeCard.getBoundingClientRect() : null;
      const prevCardRect = prevCard instanceof HTMLElement ? prevCard.getBoundingClientRect() : null;
      const nextCardRect = nextCard instanceof HTMLElement ? nextCard.getBoundingClientRect() : null;
      const leftGap = activeRect && prevCardRect
        ? Math.round((activeRect.left - prevCardRect.right) * 100) / 100
        : null;
      const rightGap = activeRect && nextCardRect
        ? Math.round((nextCardRect.left - activeRect.right) * 100) / 100
        : null;
      const sideGapDelta = leftGap !== null && rightGap !== null
        ? Math.round(Math.abs(leftGap - rightGap) * 100) / 100
        : null;

      return {
        clicks: clickCount,
        activeTitle: activeSlide.querySelector('.mkt-credentials-card-title')?.textContent?.trim() ?? null,
        viewportRight: Math.round(viewportEl.getBoundingClientRect().right),
        stageLeft: Math.round(stageRect.left),
        stageRight: Math.round(stageRect.right),
        prevCenter: prevRect ? Math.round(prevRect.left + prevRect.width / 2) : null,
        nextCenter: nextRect ? Math.round(nextRect.left + nextRect.width / 2) : null,
        prevDisabled: prev instanceof HTMLButtonElement ? prev.disabled : null,
        nextDisabled: next instanceof HTMLButtonElement ? next.disabled : null,
        visibleGaps,
        gapSpread,
        leftGap,
        rightGap,
        sideGapDelta,
      };
    }, clicks);

    await expect(stage).toBeVisible();
    await expect(viewport).toBeVisible();
    await expect(slides).toHaveCount(12);
    await expect(page.locator('.mkt-credential-preview').first()).toBeVisible();
    await expect.poll(() => readProbe(0)).toMatchObject({
      clicks: 0,
      prevDisabled: false,
      nextDisabled: false,
    });
    const initialProbe = await readProbe(0);
    await expect(prevArrow).toBeEnabled();
    await expect(nextArrow).toBeEnabled();

    let clicks = 0;
    for (let index = 0; index < 2; index += 1) {
      await nextArrow.click();
      clicks += 1;
    }

    await expect.poll(() => readProbe(clicks)).toMatchObject({
      prevDisabled: false,
      nextDisabled: false,
    });
    await expect.poll(async () => {
      const probe = await readProbe(clicks);
      return {
        clicks: probe.clicks,
        prevDisabled: probe.prevDisabled,
        nextDisabled: probe.nextDisabled,
        arrowsWrappedStage:
          probe.prevCenter !== null &&
          probe.nextCenter !== null &&
          probe.prevCenter <= probe.stageLeft + 40 &&
          probe.nextCenter >= probe.stageRight - 40,
        titleChangedFromInitial:
          Boolean(probe.activeTitle) &&
          probe.activeTitle !== initialProbe.activeTitle,
        sideGapsBalanced:
          probe.leftGap !== null &&
          probe.rightGap !== null &&
          probe.leftGap >= 12 &&
          probe.rightGap >= 12 &&
          probe.sideGapDelta !== null &&
          probe.sideGapDelta <= 6,
      };
    }).toEqual({
      clicks,
      prevDisabled: false,
      nextDisabled: false,
      arrowsWrappedStage: true,
      titleChangedFromInitial: true,
      sideGapsBalanced: true,
    });

    expect(clicks).toBeGreaterThan(0);
  });
});

test.describe('marketing mobile smoke', () => {
  test.skip(({ isMobile }) => !isMobile);

  test('solutions page keeps scenario cards swipeable on mobile', async ({ page }) => {
    await page.goto('/solutions');
    await page.waitForLoadState('networkidle');

    const rail = page.locator('.mkt-industry-scenarios.mkt-industry-rail').first();
    await expect(rail).toBeVisible();

    const metrics = await rail.evaluate((element) => {
      const cardNodes = Array.from(element.querySelectorAll('.mkt-industry-module-card'));
      const cards = cardNodes.filter((node): node is HTMLElement => node instanceof HTMLElement);

      return {
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
        cardCount: cards.length,
        firstWidth: cards[0]?.getBoundingClientRect().width ?? null,
        firstTop: cards[0]?.getBoundingClientRect().top ?? null,
        secondTop: cards[1]?.getBoundingClientRect().top ?? null,
      };
    });

    expect(metrics.cardCount).toBeGreaterThanOrEqual(3);
    expect(metrics.scrollWidth).toBeGreaterThan(metrics.clientWidth + 40);
    expect(metrics.firstWidth ?? metrics.clientWidth).toBeLessThan(metrics.clientWidth);
    expect(Math.abs((metrics.firstTop ?? 0) - (metrics.secondTop ?? 0))).toBeLessThanOrEqual(2);
  });

  test('home page mobile menu opens and layout stays within viewport', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const menuButton = page.getByRole('button', { name: /菜单|menu/i });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    await expect(page.locator('#mobile-marketing-nav')).toBeVisible();
    await expect(page.locator('#mobile-marketing-nav a[href="/solutions"]')).toBeVisible();

    const overflow = await page.evaluate(() => {
      const root = document.documentElement;
      return Math.max(0, root.scrollWidth - root.clientWidth);
    });

    expect(overflow).toBeLessThanOrEqual(1);

    const screenshotPath = testInfo.outputPath('home-mobile-menu.png');
    await page.screenshot({ path: screenshotPath, fullPage: false, animations: 'disabled', timeout: 20_000 });
    await testInfo.attach('home-mobile-menu', {
      path: screenshotPath,
      contentType: 'image/png',
    });
  });

  test('about page hero fits the mobile viewport without overflow', async ({ page }, testInfo) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('.mkt-about-hero')).toBeVisible();
    await expect(page.locator('.mkt-about-copy-panel')).toBeVisible();
    await expect(page.locator('.mkt-about-aside')).toBeVisible();
    await expect(page.locator('.mkt-credentials-toggle')).toHaveCount(0);
    await expect(page.locator('.mkt-credentials-arrow')).toHaveCount(2);

    const metrics = await page.evaluate(() => {
      const root = document.documentElement;
      const hero = document.querySelector('.mkt-about-hero') as HTMLElement | null;

      if (!hero) {
        throw new Error('About hero not found');
      }

      const styles = window.getComputedStyle(hero);

      return {
        overflowX: Math.max(0, root.scrollWidth - root.clientWidth),
        backgroundSize: styles.backgroundSize,
        backgroundPosition: styles.backgroundPosition,
        minHeight: styles.minHeight,
      };
    });

    expect(metrics.overflowX).toBeLessThanOrEqual(1);
    expect(metrics.backgroundSize).not.toBe('cover');

    const screenshotPath = testInfo.outputPath('about-mobile-hero.png');
    await page.screenshot({ path: screenshotPath, fullPage: false, animations: 'disabled', timeout: 20_000 });
    await testInfo.attach('about-mobile-hero', {
      path: screenshotPath,
      contentType: 'image/png',
    });
  });
});
