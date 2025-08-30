/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Container from '@material-ui/core/Container';
import { useRef, useState } from 'react';

import MiddleDivider from '../components/MiddleDivider/MiddleDivider';
import {
  DEFAULT_MARGIN_H,
  DEFAULT_MARGIN_W,
  DEFAULT_MAX_COLUMN,
  DEFAULT_MAX_ROW,
  DEFAULT_NO_BACKGROUND,
  DEFAULT_NO_FRAME,
  DEFAULT_THEME,
} from '../constants/default-values';
import ProductName from '../constants/product-name';
import * as gtag from '../lib/GoogleAnalytics/gtag';
import TrophyCabinet from '../parts/TrophyCabinet/TrophyCabinet';
import UserSettings from '../parts/UserSettings/UserSettings';
import removeWhitespace from '../utils/removeWhitespace';

export default function Home(): JSX.Element {
  const initialQueryParameters = {
    userName: 'chokudai',
    theme: DEFAULT_THEME,
    filterByTitle: '',
    filterByRank: '',
    cabinetRow: DEFAULT_MAX_ROW,
    cabinetColumn: DEFAULT_MAX_COLUMN,
    marginHeight: DEFAULT_MARGIN_H,
    marginWidth: DEFAULT_MARGIN_W,
    noBackground: DEFAULT_NO_BACKGROUND,
    noFrames: DEFAULT_NO_FRAME,
  };
  const [queryParameters, setQueryParameters] = useState(
    initialQueryParameters,
  );
  const {
    userName,
    theme,
    filterByTitle,
    filterByRank,
    cabinetRow,
    cabinetColumn,
    marginHeight,
    marginWidth,
    noBackground,
    noFrames,
  } = queryParameters;
  const [internalUrl, setInternalUrl] = useState(
    `/api/v1/atcoder?username=${userName}`,
  );
  // See:
  // https://zenn.dev/enish/articles/5cc332d3eeb1a7
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputError, setInputError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      const ref = inputRef.current;

      if (!ref.validity.valid) {
        setInputError(true);
      } else {
        setInputError(false);
      }
    }

    const { name, value } = event.target;
    setQueryParameters({ ...queryParameters, [name]: value });
  };

  // https://mui.com/components/switches/#controlled
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setQueryParameters({ ...queryParameters, [name]: checked });
  };

  const handleClick = () => {
    let value = `/api/v1/atcoder?username=${userName}`;
    value += theme === DEFAULT_THEME ? '' : `&theme=${theme}`;
    value +=
      filterByTitle === '' ? '' : `&title=${removeWhitespace(filterByTitle)}`;
    value +=
      filterByRank === '' ? '' : `&rank=${removeWhitespace(filterByRank)}`;
    value += cabinetRow == DEFAULT_MAX_ROW ? '' : `&row=${cabinetRow}`;
    value +=
      cabinetColumn == DEFAULT_MAX_COLUMN ? '' : `&column=${cabinetColumn}`;
    value +=
      marginHeight == DEFAULT_MARGIN_H ? '' : `&margin_h=${marginHeight}`;
    value += marginWidth == DEFAULT_MARGIN_W ? '' : `&margin_w=${marginWidth}`;
    value +=
      noBackground === DEFAULT_NO_BACKGROUND ? '' : `&no_bg=${noBackground}`;
    value += noFrames === DEFAULT_NO_FRAME ? '' : `&no_frame=${noFrames}`;

    gtag.event({
      action: 'click',
      category: 'other',
      label: value,
    });

    setInternalUrl(value);
  };

  return (
    <Container maxWidth='md'>
      <h1>{ProductName}</h1>

      <UserSettings
        queryParameters={queryParameters}
        inputRef={inputRef}
        inputError={inputError}
        onChange={handleChange}
        onSwitchChange={handleSwitchChange}
        onClick={handleClick}
      />
      <MiddleDivider />
      <TrophyCabinet internalUrl={internalUrl} />
    </Container>
  );
}
