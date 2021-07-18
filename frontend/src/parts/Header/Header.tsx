import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import MainNav from '../../components/MainNav/MainNav';
import MuiNextLink from '../../components/MuiNextLink/MuiNextLink';
import PRODUCT_NAME from '../../constants/product-name';
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
        <SideDrawer />
      </Toolbar>
    </AppBar>
    <Offset />
  </>
);

export default Header;
