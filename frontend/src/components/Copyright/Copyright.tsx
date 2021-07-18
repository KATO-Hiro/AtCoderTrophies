import { Link, Typography } from '@material-ui/core';

import { MY_ATCODER_PAGE } from '../../constants/urls';

// See:
// https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard
export default function Copyright(): JSX.Element {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      Copyright ©{new Date().getFullYear()}{' '}
      <Link
        color='inherit'
        href={MY_ATCODER_PAGE}
        target='_blank'
        rel='noreferrer'
      >
        hiro_hiro
      </Link>
      , All Rights Reserved.
    </Typography>
  );
}
