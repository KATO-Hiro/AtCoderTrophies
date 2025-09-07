import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';

import { ATCODER_USER_NAME, MY_ATCODER_PAGE } from '../../constants/urls';
import MiddleDivider from '../MiddleDivider/MiddleDivider';

// See:
// https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard
export default function Copyright(): ReactElement {
  return (
    <>
      <MiddleDivider />
      <Box sx={{ m: 2 }}>
        <Typography variant='body2' color='text.secondary' align='center'>
          Copyright © {new Date().getFullYear()}{' '}
          <MuiLink color='inherit' href={MY_ATCODER_PAGE} target='_blank' rel='noreferrer'>
            {ATCODER_USER_NAME}
          </MuiLink>
          , All Rights Reserved.
        </Typography>
      </Box>
    </>
  );
}
