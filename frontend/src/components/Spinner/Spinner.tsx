import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// See:
// https://mui.com/components/progress/
const Spinner = (): JSX.Element => {
  return (
    <>
      <Box
        sx={{ display: 'flex' }}
        style={{ margin: 'auto', width: '5rem', height: '5rem' }}
      >
        <CircularProgress />
      </Box>
    </>
  );
};

export default Spinner;
