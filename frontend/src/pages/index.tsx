import Container from '@material-ui/core/Container';
import { useState } from 'react';

import MiddleDivider from '../components/MiddleDivider/MiddleDivider';
import ProductName from '../constants/product-name';
import TrophyCabinet from '../parts/TrophyCabinet/TrophyCabinet';
import UserSettings from '../parts/UserSettings/UserSettings';

export default function Home(): JSX.Element {
  const initialQueryParameters = {
    userName: 'chokudai',
    backgroundTheme: 'default',
  };
  const [queryParameters, setQueryParameters] = useState(
    initialQueryParameters,
  );
  const { userName, backgroundTheme } = queryParameters;
  const [internalUrl, setInternalUrl] = useState(
    `/api/v1/atcoder?username=${userName}&background_theme=${backgroundTheme}`,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setQueryParameters({ ...queryParameters, [name]: value });
  };
  const handleClick = () => {
    const value = `/api/v1/atcoder?username=${userName}&background_theme=${backgroundTheme}`;
    setInternalUrl(value);
  };

  return (
    <Container maxWidth='md'>
      <h1>{ProductName}</h1>

      <UserSettings
        queryParameters={queryParameters}
        onChange={handleChange}
        onClick={handleClick}
      />
      <MiddleDivider />
      <TrophyCabinet internalUrl={internalUrl} />
    </Container>
  );
}
