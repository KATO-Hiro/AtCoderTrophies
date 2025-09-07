import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import type { ReactElement } from 'react';

// See:
// https://mui.com/components/progress/
const Spinner = (): ReactElement => {
  return (
    <>
      <Box sx={{ display: 'flex' }} style={{ margin: 'auto', width: '5rem', height: '5rem' }}>
        <CircularProgress />
      </Box>
    </>
  );
};

export default Spinner;
