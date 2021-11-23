import Image from 'next/image';

import ErrorAlert from '../../components/Alert/ErrorAlert';
import Spinner from '../../components/Spinner/Spinner';
import { PreviewProps } from '../../interfaces/PreviewProps';
import useTrophySVGIcons from '../../utils/APIClient/apiClient';

const PreviewHeader = (): JSX.Element => {
  return <h2>Preview</h2>;
};

// TODO: Refactoring.
const Preview = (props: PreviewProps): JSX.Element => {
  const { url } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
      {/* HACK: Use trophies. */}
      <Image src={url} width={1000} height={1000} alt='atcoder trophies' />
    </>
  );
};

export default Preview;
