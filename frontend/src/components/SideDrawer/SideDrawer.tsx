/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/icons/Menu';
import { useState } from 'react';
import navLinks from '../../constants/nav-links';
import MuiNextLink from '../MuiNextLink/MuiNextLink';

const SideDrawer = (): JSX.Element => {
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor: any, open: any) => (event: any) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: unknown) => (
    <Box
      sx={{ width: 250, marginTop: `auto`, marginBottom: `auto` }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {navLinks.map(({ title, path }, i) => (
        <Typography
          variant='button'
          key={title}
          sx={{
            ml: (theme) => theme.spacing(5),
            my: (theme) => theme.spacing(2),
            textTransform: `uppercase`,
          }}
        >
          <MuiNextLink sx={{ color: 'common.white' }} href={path}>
            {title}
          </MuiNextLink>
        </Typography>
      ))}
    </Box>
  );

  return (
    <>
      <IconButton
        edge='start'
        aria-label='menu'
        onClick={toggleDrawer('right', true)}
        sx={{
          color: `common.white`,
          display: { xs: `inline`, md: `none` },
        }}
      >
        <Menu fontSize='large' />
      </IconButton>
      <Drawer
        anchor='right'
        open={state.right}
        onClose={toggleDrawer('right', false)}
        sx={{
          '.MuiDrawer-paper': {
            bgcolor: 'primary.main',
          },
        }}
      >
        {list('right')}
      </Drawer>
    </>
  );
};

export default SideDrawer;
