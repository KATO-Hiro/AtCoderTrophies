import { RefObject } from 'react';

import { QueryParametersProps } from './QueryParametersProps';

export type UserSettingsProps = {
  queryParameters: QueryParametersProps;
  inputRef: RefObject<HTMLInputElement>;
  inputError: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSwitchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};
