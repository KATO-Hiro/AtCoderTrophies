import type { RefObject } from 'react';

import type { QueryParametersProps } from './QueryParametersProps';

export type UserSettingsProps = {
  queryParameters: QueryParametersProps;
  inputRef: RefObject<HTMLInputElement | null>;
  inputError: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSwitchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};
