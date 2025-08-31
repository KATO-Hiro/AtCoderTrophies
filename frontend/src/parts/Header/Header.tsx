import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';

import BackToTopButton from '../../components/BackToTopButton/BackToTopButton';
import ListItemLink from '../../components/ListItemLink/ListItemLink';
import MainNav from '../../components/MainNav/MainNav';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import PRODUCT_NAME from '../../constants/product-name';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const Header = (): JSX.Element => (
  <>
    <AppBar position='fixed'>
      <Toolbar>
        <Container
          maxWidth='lg'
          sx={{ display: `flex`, justifyContent: `space-between` }}
        >
          <Typography component='h1' variant='h6' color='inherit' noWrap>
            <ListItemLink href='/'>{PRODUCT_NAME}</ListItemLink>
          </Typography>
        </Container>
        <MainNav />
        <SideDrawer />
      </Toolbar>
    </AppBar>
    <Offset id='back-to-top-anchor' />
    <BackToTopButton>
      <Fab color='primary' size='large' aria-label='back to top'>
        <KeyboardArrowUp />
      </Fab>
    </BackToTopButton>
  </>
);

export default Header;
