import Image from 'next/image';

import { PreviewProps } from '../../interfaces/PreviewProps';

// TODO: Add waiting mode.
const Preview = (props: PreviewProps): JSX.Element => {
  const { url } = props;

  return (
    <>
      <h2>Preview</h2>
      <Image src={url} width={1000} height={1000} />
    </>
  );
};

export default Preview;
