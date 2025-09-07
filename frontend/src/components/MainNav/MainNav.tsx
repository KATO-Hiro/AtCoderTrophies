import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { type ReactElement, useId, useState } from 'react';

import externalLinks from '../../constants/external-links';
import navLinks from '../../constants/nav-links';
import MuiNextLink from '../MuiNextLink/MuiNextLink';

// See:
// https://material-ui.com/api/menu-item/
// https://react.dev/reference/react/useId
const MainNav = (): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuId = useId();

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
          aria-controls={menuId}
          aria-haspopup='true'
          color='inherit'
          onClick={handleClick}
          sx={{ color: `white`, opacity: 0.6, textTransform: `capitalize` }}
        >
          Links
        </Button>
        <Menu
          id={menuId}
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
