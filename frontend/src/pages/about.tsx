import Container from '@material-ui/core/Container';
import { GetStaticProps } from 'next';

import '/node_modules/github-markdown-css/github-markdown-light.css';

import { getMarkdownData } from '../lib/Markdown/markdown';

function AboutPage({
  markdownData,
}: {
  markdownData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}): JSX.Element {
  return (
    <Container maxWidth='md'>
      <h1>About</h1>
      <article className='markdown-body'>
        <div dangerouslySetInnerHTML={{ __html: markdownData.contentHtml }} />
      </article>
    </Container>
  );
}

export default AboutPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
