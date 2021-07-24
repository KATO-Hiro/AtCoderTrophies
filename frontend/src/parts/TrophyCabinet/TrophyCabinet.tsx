import TextBoxWithCopyButton from '../../components/TextBoxWithCopyButton/TextBoxWithCopyButton';
import TwitterShareButton from '../../components/TwitterShareButton/TwitterShareButton';
import Preview from './Preview';

const TrophyCabinet = (): JSX.Element => (
  <>
    {/* <Preview /> */}
    <Preview />

    {/* <TwitterShareButton /> */}
    <TwitterShareButton />

    {/* <HtmlCopyField /> */}
    <TextBoxWithCopyButton label='HTML' />

    {/* <MarkdownCopyField /> */}
    <TextBoxWithCopyButton label='Markdown' />
  </>
);

export default TrophyCabinet;
