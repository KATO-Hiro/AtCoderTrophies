import DOMPurify from 'dompurify';
import type { ReactElement } from 'react';

import type { TrophySVGIconsProps } from '../../interfaces/TrophySVGIconsProps';

// See:
// https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
// https://yarnpkg.com/package/dompurify
export const TrophySVGIcons = (props: TrophySVGIconsProps): ReactElement => {
  const { trophies } = props;
  const sanitizedTrophiesSVG = DOMPurify.sanitize(trophies);

  // biome-ignore lint/security/noDangerouslySetInnerHtml: SVG content is sanitized with DOMPurify
  return <div dangerouslySetInnerHTML={{ __html: sanitizedTrophiesSVG }} />;
};
