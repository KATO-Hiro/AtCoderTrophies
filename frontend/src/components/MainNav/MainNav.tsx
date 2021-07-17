import Stack from '@material-ui/core/Stack';
import Toolbar from '@material-ui/core/Toolbar';
import MuiNextLink from '../MuiNextLink/MuiNextLink';
import navLinks from '../../constants/nav-links';

// See:
// https://www.ansonlowzf.com/build-header-component-with-nextjs-material-ui-v5/
const MainNav = (): JSX.Element => (
  <Toolbar
    component='nav'
    sx={{
      display: { xs: `none`, md: `flex` },
    }}
  >
    <Stack direction='row' spacing={4}>
      {navLinks.map(({ title, path }, i) => (
        <MuiNextLink
          key={title}
          href={path}
          variant='button'
          sx={{ color: `white`, opacity: 0.6 }}
        >
          {title}
        </MuiNextLink>
      ))}
    </Stack>
  </Toolbar>
);

export default MainNav;
