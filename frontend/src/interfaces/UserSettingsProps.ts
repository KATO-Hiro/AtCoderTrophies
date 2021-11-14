import { QueryParametersProps } from './QueryParametersProps';

export type UserSettingsProps = {
  queryParameters: QueryParametersProps;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
