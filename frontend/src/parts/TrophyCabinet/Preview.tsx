/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import DOMPurify from 'dompurify';

import ErrorAlert from '../../components/Alert/ErrorAlert';
import Spinner from '../../components/Spinner/Spinner';
import { PreviewProps } from '../../interfaces/PreviewProps';
import useTrophySVGIcons from '../../utils/APIClient/apiClient';

const PreviewHeader = (): JSX.Element => {
  return <h2>Preview</h2>;
};

type TrophySVGIconsProps = {
  trophies: string;
};

// See:
// https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
// https://yarnpkg.com/package/dompurify
const TrophySVGIcons = (props: TrophySVGIconsProps): JSX.Element => {
  const { trophies } = props;
  const sanitizedTrophiesSVG = DOMPurify.sanitize(trophies);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedTrophiesSVG }} />;
};

// TODO: Refactoring.
const Preview = (props: PreviewProps): JSX.Element => {
  const { url } = props;
  const { trophies, isLoading, isError } = useTrophySVGIcons(url);

  if (isLoading) {
    return (
      <>
        <PreviewHeader />
        <Spinner />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <PreviewHeader />
        <ErrorAlert message='Not found user.' />
      </>
    );
  }

  return (
    <>
      <PreviewHeader />
      <TrophySVGIcons trophies={trophies} />
    </>
  );
};

export default Preview;
