import type { APIRoute } from 'astro';
import { siteConfig } from '../../site.config';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const FULL_CONTENT_CAP = 50;

type Post = {
  slug: string;
  title: string;
  date: string;
  category?: string;
  tags: string[];
  body: string;
};

function loadPosts(): Post[] {
  const dir = join(process.cwd(), 'src', 'pages', 'posts');
  const files = readdirSync(dir).filter((f) => f.endsWith('.md'));
  const posts: Post[] = [];
  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    try {
      const raw = readFileSync(join(dir, file), 'utf-8');
      const fmMatch = raw.match(/^---\s*([\s\S]*?)---\s*/);
      const fm = fmMatch ? fmMatch[1] : '';
      const body = fmMatch ? raw.slice(fmMatch[0].length) : raw;
      const title = (fm.match(/^title:\s*"?([^"\n]+)"?/m)?.[1] || slug).trim();
      const date = (fm.match(/^publishDate:\s*"?([^"\n]+)"?/m)?.[1] || '').trim().slice(0, 10);
      const category = fm.match(/^category:\s*"?([^"\n]+)"?/m)?.[1]?.trim();
      const tagsLine = fm.match(/^tags:\s*\[([^\]]*)\]/m)?.[1] || '';
      const tags = tagsLine.split(',').map((t) => t.trim().replace(/^"|"$/g, '')).filter(Boolean);
      posts.push({ slug, title, date, category, tags, body });
    } catch {}
  }
  return posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

export const GET: APIRoute = async () => {
  const origin = siteConfig.url;
  const posts = loadPosts();

  const header: string[] = [
    `# ${siteConfig.name} — Full Content`,
    '',
    '> All published articles as markdown for AI agents.',
    '',
    `Source: ${origin}/`,
    `Generated: ${new Date().toISOString()}`,
    `Posts: ${posts.length}`,
    '',
  ];

  const sections: string[] = [];
  const fullPosts = posts.slice(0, FULL_CONTENT_CAP);
  const digestPosts = posts.slice(FULL_CONTENT_CAP);

  for (const post of fullPosts) {
    const meta: string[] = [`Source: ${origin}/posts/${post.slug}/`];
    if (post.date) meta.push(`Published: ${post.date}`);
    if (post.category) meta.push(`Category: ${post.category}`);
    if (post.tags.length) meta.push(`Tags: ${post.tags.join(', ')}`);

    sections.push('---', '', `# ${post.title}`, '', ...meta, '', post.body || '_(no content)_', '');
  }

  if (digestPosts.length > 0) {
    sections.push('---', '', `# Additional Articles (title-only, ${digestPosts.length})`, '');
    sections.push('File size cap reached — remaining posts listed below.', '');
    for (const p of digestPosts) {
      const cat = p.category ? ` [${p.category}]` : '';
      const date = p.date ? ` — ${p.date}` : '';
      sections.push(`- [${p.title}](${origin}/posts/${p.slug}/)${cat}${date}`);
    }
    sections.push('');
  }

  return new Response([...header, ...sections].join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
