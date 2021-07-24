import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Stack from '@material-ui/core/Stack';
import Toolbar from '@material-ui/core/Toolbar';
import { useState } from 'react';

import externalLinks from '../../constants/external-links';
import navLinks from '../../constants/nav-links';
import MuiNextLink from '../MuiNextLink/MuiNextLink';

// See:
// https://www.ansonlowzf.com/build-header-component-with-nextjs-material-ui-v5/
// https://material-ui.com/api/menu-item/
const MainNav = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar
      component='nav'
      sx={{
        display: { xs: `none`, md: `flex` },
      }}
    >
      <Stack direction='row' spacing={4}>
        {navLinks.map(({ title, path }) => (
          <MuiNextLink
            key={title}
            href={path}
            variant='button'
            sx={{ color: `white`, opacity: 0.6, textTransform: `capitalize` }}
          >
            {title}
          </MuiNextLink>
        ))}
      </Stack>
      <Stack direction='row'>
        {/* HACK: The below button is dummy. */}
        <IconButton />
        <Button
          aria-controls='links'
          aria-haspopup='true'
          color='inherit'
          onClick={handleClick}
          sx={{ color: `white`, opacity: 0.6, textTransform: `capitalize` }}
        >
          Links
        </Button>
        <Menu
          id='links'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {externalLinks.map(({ title, path }) => (
            <MuiNextLink
              key={title}
              href={path}
              target='_blank'
              rel='noreferrer'
              variant='button'
              sx={{
                color: `black`,
                textTransform: `capitalize`,
                textDecoration: `none`,
              }}
            >
              <MenuItem>{title}</MenuItem>
            </MuiNextLink>
          ))}
        </Menu>
      </Stack>
    </Toolbar>
  );
};

export default MainNav;
