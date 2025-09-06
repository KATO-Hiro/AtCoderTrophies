/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Menu from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';
import { useState } from 'react';

import externalLinks from '../../constants/external-links';
import navLinks from '../../constants/nav-links';
import MuiNextLink from '../MuiNextLink/MuiNextLink';

// See:
// https://material-ui.com/components/drawers/
// https://www.ansonlowzf.com/build-header-component-with-nextjs-material-ui-v5/
const SideDrawer = (): ReactElement => {
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: any, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
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
      <List>
        {navLinks.map(({ title, path }) => (
          <ListItem key={title}>
            <Typography
              variant='button'
              key={title}
              sx={{
                ml: (theme) => theme.spacing(5),
                my: (theme) => theme.spacing(2),
                textTransform: `capitalize`,
              }}
            >
              <MuiNextLink
                sx={{ color: 'common.white', opacity: 0.6 }}
                href={path}
              >
                {title}
              </MuiNextLink>
            </Typography>
          </ListItem>
        ))}
        {/* HACK: Don't Repeat Yourself. */}
        {externalLinks.map(({ title, path }) => (
          <ListItem key={title}>
            <Typography
              variant='button'
              key={title}
              sx={{
                ml: (theme) => theme.spacing(5),
                my: (theme) => theme.spacing(2),
                textTransform: `capitalize`,
              }}
            >
              <MuiNextLink
                sx={{ color: 'common.white', opacity: 0.6 }}
                href={path}
                target='_blank'
                rel='noreferrer'
              >
                {title}
              </MuiNextLink>
            </Typography>
          </ListItem>
        ))}
      </List>
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
