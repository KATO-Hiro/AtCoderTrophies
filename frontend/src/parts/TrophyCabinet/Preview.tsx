import { ReactElement } from 'react';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import ErrorAlert from '../../components/Alert/ErrorAlert';
import { PreviewHeader } from '../../components/PreviewHeader/PreviewHeader';
import Spinner from '../../components/Spinner/Spinner';
import { TrophySVGIcons } from '../../components/TrophySVGIcons/TrophySVGIcons';
import { PreviewProps } from '../../interfaces/PreviewProps';
import useTrophySVGIcons from '../../utils/APIClient/apiClient';

const Preview = (props: PreviewProps): ReactElement => {
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
