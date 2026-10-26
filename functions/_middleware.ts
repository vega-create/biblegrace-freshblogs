/**
 * Cloudflare Pages middleware for agent-readiness.
 *
 *  1. Content negotiation: when a client sends `Accept: text/markdown`,
 *     serve the pre-built .md version of the requested page (built at
 *     Astro build time as src/pages/**\/*.md.ts endpoints).
 *  2. RFC 8288 Link headers on every HTML response, advertising
 *     llms.txt, llms-full.txt, sitemap, and the markdown alternate.
 */

function markdownAssetPath(pathname: string): string | null {
  const p = pathname.replace(/\/+$/, '') || '/';
  if (p === '/') return '/index.md';
  if (p.startsWith('/posts/') && p !== '/posts') return `${p}.md`;
  return null;
}

// biblegrace.freshblogs.cc → faith.chparenting.com 轉址表（2026-10-25，舊網域保留一年）
// 前 30 筆：文章一對一；後 38 筆：未搬的舊文導到新站對應分類頁
const REDIRECTS: Record<string, string> = {
  "/posts/2026-02-21-can-christians-drink-alcohol": "/blog/can-christians-drink-alcohol/",
  "/posts/2026-02-22-is-it-a-sin-to-get-a-tattoo": "/blog/is-it-a-sin-to-get-a-tattoo/",
  "/posts/2026-02-23-what-happens-when-you-die": "/blog/what-happens-when-you-die/",
  "/posts/2026-02-24-do-pets-go-to-heaven": "/blog/do-pets-go-to-heaven/",
  "/posts/2026-02-25-can-christians-date-non-christians": "/blog/can-christians-date-non-christians/",
  "/posts/2026-02-26-what-is-the-unforgivable-sin": "/blog/what-is-the-unforgivable-sin/",
  "/posts/2026-02-27-is-halloween-a-sin-for-christians": "/blog/is-halloween-a-sin-for-christians/",
  "/posts/2026-02-28-what-does-bible-say-about-divorce-remarriage": "/blog/what-does-bible-say-about-divorce-remarriage/",
  "/posts/2026-03-01-bible-verses-about-strength": "/blog/bible-verses-about-strength/",
  "/posts/2026-03-02-bible-verses-about-death": "/blog/bible-verses-about-death/",
  "/posts/2026-03-03-bible-verses-about-anxiety": "/blog/bible-verses-about-anxiety/",
  "/posts/2026-03-04-bible-verses-about-love": "/blog/bible-verses-about-love/",
  "/posts/2026-03-05-bible-verses-about-healing": "/blog/bible-verses-about-healing/",
  "/posts/2026-03-06-short-bible-verses-daily-encouragement": "/blog/short-bible-verses-daily-encouragement/",
  "/posts/2026-03-07-bible-verses-about-faith": "/blog/bible-verses-about-faith/",
  "/posts/2026-03-08-john-3-16-meaning-explained": "/blog/john-3-16-meaning-explained/",
  "/posts/2026-03-09-psalm-23-explained-lord-is-my-shepherd": "/blog/psalm-23-explained-lord-is-my-shepherd/",
  "/posts/2026-03-10-fruit-of-the-spirit-explained": "/blog/fruit-of-the-spirit-explained/",
  "/posts/2026-03-11-armor-of-god-ephesians-6": "/blog/armor-of-god-ephesians-6/",
  "/posts/2026-03-12-romans-8-28-meaning": "/blog/romans-8-28-meaning/",
  "/posts/2026-03-13-how-to-pray-beginners-guide": "/blog/how-to-pray-beginners-guide/",
  "/posts/2026-03-14-morning-prayers-start-your-day": "/blog/morning-prayers-start-your-day/",
  "/posts/2026-03-15-prayers-for-healing": "/blog/prayers-for-healing/",
  "/posts/2026-03-16-finding-peace-uncertain-times": "/blog/finding-peace-uncertain-times/",
  "/posts/2026-03-17-when-god-feels-silent": "/blog/when-god-feels-silent/",
  "/posts/2026-03-18-gods-grace-is-enough": "/blog/gods-grace-is-enough/",
  "/posts/2026-03-19-what-does-bible-say-about-depression": "/blog/what-does-bible-say-about-depression/",
  "/posts/2026-03-20-how-to-read-bible-beginners": "/blog/how-to-read-bible-beginners/",
  "/posts/2026-03-21-how-to-forgive-someone-who-hurt-you": "/blog/how-to-forgive-someone-who-hurt-you/",
  "/posts/2026-03-22-true-meaning-of-easter": "/blog/true-meaning-of-easter/",
  "/posts/2025-12-23-your-identity-in-christ-who-god-says-you-are": "/resources/",
  "/posts/2025-12-24-when-god-says-wait-devotion": "/resources/",
  "/posts/2025-12-25-how-to-pray-for-your-marriage": "/resources/",
  "/posts/2025-12-26-prayers-for-work-and-career": "/resources/",
  "/posts/2025-12-27-bible-verses-about-peace-and-calm": "/verses-by-situation/",
  "/posts/2025-12-28-bible-verses-about-hope-hard-times": "/verses-by-situation/",
  "/posts/2025-12-29-how-to-share-your-faith-without-being-pushy": "/verses-by-situation/",
  "/posts/2025-12-30-how-to-find-a-good-church": "/verses-by-situation/",
  "/posts/2025-12-31-dealing-with-doubt-as-a-christian": "/verses-by-situation/",
  "/posts/2026-01-01-what-happens-after-death-bible": "/verses-by-situation/",
  "/posts/2026-01-02-do-all-religions-lead-to-god": "/verses-by-situation/",
  "/posts/2026-01-03-why-does-god-allow-suffering": "/verses-by-situation/",
  "/posts/2026-01-04-new-year-bible-verses-fresh-start": "/notes/",
  "/posts/2026-01-05-what-is-pentecost-birthday-of-church": "/notes/",
  "/posts/2026-01-06-what-is-lent-and-should-christians-observe-it": "/notes/",
  "/posts/2026-01-07-mothers-day-bible-verses-prayers": "/notes/",
  "/posts/2026-01-08-fathers-day-bible-verses-prayers": "/notes/",
  "/posts/2026-01-09-biblical-love-on-valentines-day": "/notes/",
  "/posts/2026-01-10-true-meaning-of-christmas": "/notes/",
  "/posts/2026-01-11-thanksgiving-bible-verses-prayers": "/notes/",
  "/posts/2026-01-12-what-is-good-friday-why-it-matters": "/notes/",
  "/posts/2026-01-13-advent-guide-for-families": "/notes/",
  "/posts/2026-01-14-palm-sunday-meaning-explained": "/notes/",
  "/posts/2026-01-15-bedtime-prayers-for-peaceful-sleep": "/resources/",
  "/posts/2026-01-16-prayers-for-grieving-someone-who-died": "/resources/",
  "/posts/2026-01-17-prayers-for-your-family-and-children": "/resources/",
  "/posts/2026-01-18-learning-to-let-go-and-let-god": "/resources/",
  "/posts/2026-01-19-power-of-gratitude-in-difficult-seasons": "/resources/",
  "/posts/2026-01-20-finding-your-purpose-what-god-wants": "/resources/",
  "/posts/2026-01-21-jeremiah-29-11-meaning-explained": "/verse-meanings/",
  "/posts/2026-01-22-proverbs-3-5-6-trust-in-the-lord": "/verse-meanings/",
  "/posts/2026-01-23-philippians-4-13-meaning-in-context": "/verse-meanings/",
  "/posts/2026-01-24-bible-verses-about-forgiveness": "/verses-by-situation/",
  "/posts/2026-01-25-bible-verses-when-you-feel-lost": "/verses-by-situation/",
  "/posts/2026-01-26-bible-verses-about-money-and-finance": "/verses-by-situation/",
  "/posts/2026-01-27-can-you-lose-your-salvation": "/verses-by-situation/",
  "/posts/2026-01-28-biblical-principles-managing-money": "/verses-by-situation/",
  "/posts/what-does-john-3-16-mean": "/verses-by-situation/",
};
const PAGE_REDIRECTS: Record<string, string> = { "/": "/", "/tools": "/tools/", "/tools/daily-verse": "/tools/verse-of-the-day/", "/tools/verse-card": "/tools/verse-of-the-day/", "/tools/reading-plan": "/tools/bible-reading-plan/", "/tools/prayer-generator": "/tools/prayer-journal/", "/tools/name-meaning": "/tools/christian-baby-names/", "/tools/verse-finder": "/tools/verse-finder/", "/tools/bible-quiz": "/tools/scripture-memory-cards/", "/tools/bible-timeline": "/verse-meanings/", "/about": "/about/", "/contact": "/contact/", "/privacy": "/privacy/", "/category/daily-devotion": "/resources/", "/category/bible-study": "/verse-meanings/", "/category/faith-questions": "/verses-by-situation/", "/category/bible-verses": "/verses-by-situation/", "/category/prayer": "/resources/", "/category/christian-living": "/verses-by-situation/", "/category/holidays": "/notes/" };

type PagesCtx = {
  request: Request;
  next: () => Promise<Response>;
  env: Record<string, any>;
};

export const onRequest = async (context: PagesCtx): Promise<Response> => {
  const { request, next, env } = context;
  const url = new URL(request.url);

  // Cloudflare 預設的 *.pages.dev 網址還是會被人點到（AdSense 報表上看得到），
  // 一律 301 到正式網址。只攔專案本身的網址，分支預覽（xxxx.biblegrace-freshblogs.pages.dev）不攔，還能測試。
  if (url.hostname === 'biblegrace-freshblogs.pages.dev') {
    url.hostname = 'biblegrace.freshblogs.cc';
    return Response.redirect(url.toString(), 301);
  }
  // 2026-10-25 起整站 301 到 faith.chparenting.com（英文信仰內容搬家）；舊網域保留一年
  if (url.hostname === 'biblegrace.freshblogs.cc') {
    const p = url.pathname.replace(/\/+$/, '') || '/';
    const target = REDIRECTS[p] ?? PAGE_REDIRECTS[p] ?? (p.startsWith('/posts/') ? '/blog/' : '/');
    return Response.redirect('https://faith.chparenting.com' + target, 301);
  }
  const accept = request.headers.get('accept') || '';

  if (accept.includes('text/markdown')) {
    const mdPath = markdownAssetPath(url.pathname);
    if (mdPath) {
      try {
        const assetUrl = new URL(mdPath, url.origin);
        const assetReq = new Request(assetUrl.toString(), { method: 'GET' });
        const assetRes = env.ASSETS
          ? await env.ASSETS.fetch(assetReq)
          : await fetch(assetReq);
        if (assetRes.status === 200) {
          const canonicalPath = url.pathname || '/';
          return new Response(assetRes.body, {
            status: 200,
            headers: {
              'Content-Type': 'text/markdown; charset=utf-8',
              'Cache-Control': 'public, max-age=3600',
              'X-Content-Type-Options': 'nosniff',
              'Link': `<${canonicalPath}>; rel="canonical"; type="text/html"`,
              'Vary': 'Accept',
            },
          });
        }
      } catch {}
    }
  }

  const response = await next();
  const ct = response.headers.get('content-type') || '';
  if (!ct.includes('text/html')) return response;

  const links: string[] = [
    '</llms.txt>; rel="describedby"; type="text/plain"',
    '</llms-full.txt>; rel="alternate"; type="text/plain"; title="Full site content"',
    '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  ];
  if (markdownAssetPath(url.pathname)) {
    const self = url.pathname || '/';
    links.push(`<${self}>; rel="alternate"; type="text/markdown"`);
  }

  const newHeaders = new Headers(response.headers);
  newHeaders.set('Link', links.join(', '));
  const existingVary = newHeaders.get('Vary');
  newHeaders.set('Vary', existingVary ? `${existingVary}, Accept` : 'Accept');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
};
