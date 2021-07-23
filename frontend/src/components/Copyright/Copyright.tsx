import { Link, Typography } from '@material-ui/core';

import { ATCODER_USER_NAME, MY_ATCODER_PAGE } from '../../constants/urls';
import MiddleDivider from '../MiddleDivider/MiddleDivider';

// See:
// https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard
export default function Copyright(): JSX.Element {
  return (
    <>
      <MiddleDivider />
      <Typography variant='body2' color='textSecondary' align='center'>
        Copyright © {new Date().getFullYear()}{' '}
        <Link
          color='inherit'
          href={MY_ATCODER_PAGE}
          target='_blank'
          rel='noreferrer'
        >
          {ATCODER_USER_NAME}
        </Link>
        , All Rights Reserved.
      </Typography>
    </>
  );
}
