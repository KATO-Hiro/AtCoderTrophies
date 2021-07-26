import Container from '@material-ui/core/Container';

import MiddleDivider from '../components/MiddleDivider/MiddleDivider';
import ProductName from '../constants/product-name';
import TrophyCabinet from '../parts/TrophyCabinet/TrophyCabinet';
import UserSettings from '../parts/UserSettings/UserSettings';

export default function Home(): JSX.Element {
  return (
    <Container maxWidth='md'>
      <h1>{ProductName}</h1>

      <UserSettings />
      <MiddleDivider />
      <TrophyCabinet />
    </Container>
  );
}
