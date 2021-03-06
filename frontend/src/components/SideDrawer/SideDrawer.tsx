/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/icons/Menu';
import { useState } from 'react';

import externalLinks from '../../constants/external-links';
import navLinks from '../../constants/nav-links';
import MuiNextLink from '../MuiNextLink/MuiNextLink';

// See:
// https://material-ui.com/components/drawers/
// https://www.ansonlowzf.com/build-header-component-with-nextjs-material-ui-v5/
const SideDrawer = (): JSX.Element => {
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
