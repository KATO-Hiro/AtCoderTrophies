// See:
// https://github.com/vercel/next-learn/blob/master/basics/demo/lib/posts.js
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import rehypeVideo from 'rehype-video';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { read } from 'to-vfile';
import { unified } from 'unified';

import type { Markdown } from '../../interfaces/Markdown';

const docsDirectory = path.join(process.cwd(), 'docs');

export async function getMarkdownData(id: string): Promise<Markdown> {
  const fullPath = path.join(docsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the metadata section in markdown file.
  const matterResult = matter(fileContents);

  // Use remark-rehype to convert markdown into HTML string
  // https://github.com/remarkjs/remark-rehype
  // https://github.com/rehypejs/rehype-raw
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeDocument)
    .use(rehypeFormat)
    .use(rehypeHighlight)
    .use(rehypeSanitize)
    .use(rehypeVideo, { details: false })
    .use(rehypeStringify)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    .process(await read(fullPath));

  // Remove file name.
  const contentHtml = String(file).replace(id, '');

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
