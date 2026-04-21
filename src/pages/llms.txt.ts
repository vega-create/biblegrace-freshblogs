import type { APIRoute } from 'astro';
import { siteConfig } from '../../site.config';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

type PostMeta = { slug: string; title: string; date: string; category?: string };

function listPosts(): PostMeta[] {
  const dir = join(process.cwd(), 'src', 'pages', 'posts');
  const files = readdirSync(dir).filter((f) => f.endsWith('.md'));
  const posts: PostMeta[] = [];
  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    try {
      const raw = readFileSync(join(dir, file), 'utf-8');
      const fmMatch = raw.match(/^---\s*([\s\S]*?)---/);
      const fm = fmMatch ? fmMatch[1] : '';
      const title = (fm.match(/^title:\s*"?([^"\n]+)"?/m)?.[1] || slug).trim();
      const date = (fm.match(/^publishDate:\s*"?([^"\n]+)"?/m)?.[1] || '').trim().slice(0, 10);
      const category = fm.match(/^category:\s*"?([^"\n]+)"?/m)?.[1]?.trim();
      posts.push({ slug, title, date, category });
    } catch {}
  }
  return posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

export const GET: APIRoute = async () => {
  const origin = siteConfig.url;
  const posts = listPosts();

  const lines: string[] = [];
  lines.push(`# ${siteConfig.name}`);
  lines.push('');
  lines.push(`> ${siteConfig.tagline}`);
  lines.push('');
  lines.push(siteConfig.description);
  lines.push('');
  lines.push(`${siteConfig.name} (biblegrace.freshblogs.cc) is an English-language Bible devotional and faith-resource site. Content covers daily Bible verses by topic (peace, anxiety, healing, love, strength), devotionals, prayer guides, explanations of core passages (John 3:16, Psalm 23, Romans 8:28), and honest answers to common faith questions.`);
  lines.push('');
  lines.push('## Main Sections');
  lines.push('');
  lines.push(`- [All Posts](${origin}/posts/): Full article list`);
  lines.push(`- [Categories](${origin}/category/): Browse by topic`);
  lines.push(`- [Tools](${origin}/tools/): Free faith tools (daily verse, etc.)`);
  lines.push(`- [About](${origin}/about/)`);
  lines.push(`- [Contact](${origin}/contact/)`);
  lines.push('');
  lines.push('## Key Pages');
  lines.push('');
  lines.push(`- [Home](${origin}/): Latest verses, devotionals, and tools`);
  lines.push(`- [Privacy](${origin}/privacy/)`);
  lines.push('');

  const recent = posts.slice(0, 10);
  if (recent.length > 0) {
    lines.push('## Recent Articles');
    lines.push('');
    for (const p of recent) {
      const cat = p.category ? ` [${p.category}]` : '';
      const date = p.date ? ` — ${p.date}` : '';
      lines.push(`- [${p.title}](${origin}/posts/${p.slug}/)${cat}${date}`);
    }
    lines.push('');
  }

  lines.push('## Optional');
  lines.push('');
  lines.push(`- [Sitemap](${origin}/sitemap.xml)`);
  lines.push(`- [Full Content](${origin}/llms-full.txt): All articles as markdown`);

  return new Response(lines.join('\n') + '\n', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
