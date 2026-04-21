import type { APIRoute } from 'astro';
import { siteConfig } from '../../site.config';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export const GET: APIRoute = async () => {
  const origin = siteConfig.url;
  const dir = join(process.cwd(), 'src', 'pages', 'posts');

  let recent: Array<{ slug: string; title: string; date: string; category?: string }> = [];
  try {
    const files = readdirSync(dir).filter((f) => f.endsWith('.md'));
    for (const file of files) {
      const slug = file.replace(/\.md$/, '');
      try {
        const raw = readFileSync(join(dir, file), 'utf-8');
        const fm = raw.match(/^---\s*([\s\S]*?)---/)?.[1] || '';
        const title = (fm.match(/^title:\s*"?([^"\n]+)"?/m)?.[1] || slug).trim();
        const date = (fm.match(/^publishDate:\s*"?([^"\n]+)"?/m)?.[1] || '').trim().slice(0, 10);
        const category = fm.match(/^category:\s*"?([^"\n]+)"?/m)?.[1]?.trim();
        recent.push({ slug, title, date, category });
      } catch {}
    }
    recent = recent.sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 5);
  } catch {}

  const lines: string[] = [];
  lines.push(`# ${siteConfig.name}`);
  lines.push('');
  lines.push(`> ${siteConfig.tagline}`);
  lines.push('');
  lines.push(`Source: ${origin}/`);
  lines.push('');
  lines.push(siteConfig.description);
  lines.push('');
  lines.push('## Main Sections');
  lines.push('');
  lines.push(`- **All Posts** — ${origin}/posts/`);
  lines.push(`- **Categories** — ${origin}/category/`);
  lines.push(`- **Tools** — ${origin}/tools/ — Daily verse, quizzes`);
  lines.push(`- **About** — ${origin}/about/`);
  lines.push('');

  if (recent.length > 0) {
    lines.push('## Latest Articles');
    lines.push('');
    for (const p of recent) {
      const cat = p.category ? ` [${p.category}]` : '';
      const date = p.date ? ` — ${p.date}` : '';
      lines.push(`- [${p.title}](${origin}/posts/${p.slug}/)${cat}${date}`);
    }
    lines.push('');
  }

  lines.push('## Machine-Readable Indexes');
  lines.push('');
  lines.push(`- ${origin}/llms.txt`);
  lines.push(`- ${origin}/llms-full.txt`);
  lines.push(`- ${origin}/sitemap.xml`);

  return new Response(lines.join('\n') + '\n', {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
