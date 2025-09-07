import Container from '@mui/material/Container';
import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';

import 'github-markdown-css/github-markdown-light.css';

import { getMarkdownData } from '../lib/Markdown/markdown';

function AboutPage({
  markdownData,
}: {
  markdownData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}): ReactElement {
  return (
    <Container maxWidth='md'>
      <h1>About</h1>
      <article className='markdown-body'>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Markdown content is processed server-side and trusted */}
        <div dangerouslySetInnerHTML={{ __html: markdownData.contentHtml }} />
      </article>
    </Container>
  );
}

export default AboutPage;

export const getStaticProps: GetStaticProps = async () => {
  // Add the "await" keyword like this:
  // params.id as string
  const readmeInJapanese = 'README_ja';
  const markdownData = await getMarkdownData(readmeInJapanese);

  return {
    props: {
      markdownData,
    },
  };
};
