import Container from '@material-ui/core/Container';

import MiddleDivider from '../components/MiddleDivider/MiddleDivider';
import ProductName from '../constants/product-name';
import TrophyCabinet from '../parts/TrophyCabinet/TrophyCabinet';
import UserSettings from '../parts/UserSettings/UserSettings';

export default function Home(): JSX.Element {
  // TODO: Enable to use query params.
  const userName = 'chokudai';
  const backgroundTheme = 'monokai';
  const internalUrl = `/api/v1/atcoder?username=${userName}&background_theme=${backgroundTheme}`;

  return (
    <Container maxWidth='md'>
      <h1>{ProductName}</h1>

      {/* TODO: Share url of SVG api between components. */}
      <UserSettings />
      <MiddleDivider />
      <TrophyCabinet internalUrl={internalUrl} />
    </Container>
  );
}
