import Image from 'next/image';

// TODO: Enable to use query params.
const userName = 'chokudai';
const backgroundTheme = 'monokai';

// TODO: Add waiting mode.
const Preview = (): JSX.Element => (
  <>
    <h2>Preview</h2>
    <Image
      src={`/api/v1/atcoder?username=${userName}&background_theme=${backgroundTheme}`}
      width={1000}
      height={1000}
    />
  </>
);

export default Preview;
