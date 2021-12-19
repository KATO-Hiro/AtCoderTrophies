import { QueryParametersProps } from './QueryParametersProps';

export type UserSettingsProps = {
  queryParameters: QueryParametersProps;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSwitchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};
