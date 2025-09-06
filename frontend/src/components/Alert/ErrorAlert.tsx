import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { ReactElement } from 'react';

import { ErrorAlertProps } from '../../interfaces/ErrorAlertProps';

// See:
// https://mui.com/components/alert/#main-content
const ErrorAlert = (props: ErrorAlertProps): ReactElement => {
  const { message } = props;

  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          {message}
        </Alert>
      </Stack>
    </>
  );
};

export default ErrorAlert;
