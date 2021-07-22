import Container from '@material-ui/core/Container';

import ProductName from '../constants/product-name';
import TrophyCabinet from '../parts/TrophyCabinet/TrophyCabinet';
import UserSettings from '../parts/UserSettings/UserSettings';

export default function Home(): JSX.Element {
  return (
    <Container maxWidth='sm'>
      <h1>{ProductName}</h1>

      <UserSettings />
      <TrophyCabinet />
    </Container>
  );
}
