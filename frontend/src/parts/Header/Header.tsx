import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import { experimentalStyled as styled } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import MainNav from '../../components/MainNav/MainNav';
import MuiNextLink from '../../components/MuiNextLink/MuiNextLink';

import PRODUCT_NAME from '../../constants/product-name';
import { TWITTER_URL, GITHUB_URL } from '../../constants/urls';

import SideDrawer from '../../components/SideDrawer/SideDrawer';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

// TODO: Extract product name as component.
const Header = (): JSX.Element => (
  <>
    <AppBar position='fixed'>
      <Toolbar>
        <Container
          maxWidth='lg'
          sx={{ display: `flex`, justifyContent: `space-between` }}
        >
          <Typography component='h1' variant='h6' color='inherit' noWrap>
            <MuiNextLink
              activeClassName='active'
              href='/'
              sx={{ color: `white` }}
              style={{ textDecoration: 'none' }}
            />
            {PRODUCT_NAME}
          </Typography>
        </Container>
        <MainNav />
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
        <SideDrawer />
      </Toolbar>
    </AppBar>
    <Offset />
  </>
);

export default Header;
