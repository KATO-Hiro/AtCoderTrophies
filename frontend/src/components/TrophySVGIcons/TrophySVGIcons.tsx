import DOMPurify from 'dompurify';

import { TrophySVGIconsProps } from '../../interfaces/TrophySVGIconsProps';

// See:
// https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
// https://yarnpkg.com/package/dompurify
export const TrophySVGIcons = (props: TrophySVGIconsProps): JSX.Element => {
  const { trophies } = props;
  const sanitizedTrophiesSVG = DOMPurify.sanitize(trophies);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedTrophiesSVG }} />;
};
