import Stack from '@material-ui/core/Stack';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';

import MuiNextLink from '../MuiNextLink/MuiNextLink';
import navLinks from '../../constants/nav-links';
import { TWITTER_URL, GITHUB_URL } from '../../constants/urls';

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
          sx={{ color: `white`, opacity: 0.6, textTransform: `capitalize` }}
        >
          {title}
        </MuiNextLink>
      ))}
    </Stack>
    {/* HACK: The below code is dummy. */}
    <Stack direction='row'>
      <IconButton />
    </Stack>
    {/*  */}
    <Stack direction='row' spacing={0.5}>
      <IconButton
        color='inherit'
        href={TWITTER_URL}
        target='_blank'
        rel='noreferrer'
      >
        <TwitterIcon />
      </IconButton>
      <IconButton
        color='inherit'
        href={GITHUB_URL}
        target='_blank'
        rel='noreferrer'
      >
        <GitHubIcon />
      </IconButton>
    </Stack>
  </Toolbar>
);

export default MainNav;
