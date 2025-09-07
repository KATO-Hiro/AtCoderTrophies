import type { ReactElement } from 'react';

import TextBoxWithCopyButton from '../../components/TextBoxWithCopyButton/TextBoxWithCopyButton';
import TwitterShareButton from '../../components/TwitterShareButton/TwitterShareButton';
import PRODUCT_NAME, { PRODUCT_URL } from '../../constants/product-name';
import { GITHUB_URL } from '../../constants/urls';
import type { TrophyCabinetProps } from '../../interfaces/TrophyCabinetProps';
import Preview from './Preview';

const TrophyCabinet = (props: TrophyCabinetProps): ReactElement => {
  const { internalUrl } = props;
  const url = PRODUCT_URL + internalUrl;
  const urlWithHtmlTags = `<a href=${GITHUB_URL} target="_blank"><img src=${url} loading = "lazy" alt="atcoder trophies"></a>`;
  const urlWithMarkdownStyle = `[![${PRODUCT_NAME}](${url})](${GITHUB_URL})`;

  return (
    <>
      <Preview url={internalUrl} />

      <TwitterShareButton />

      {/* <HtmlCopyField /> */}
      <TextBoxWithCopyButton label='HTML' value={urlWithHtmlTags} />

      {/* <MarkdownCopyField /> */}
      <TextBoxWithCopyButton label='Markdown' value={urlWithMarkdownStyle} />
    </>
  );
};

export default TrophyCabinet;
