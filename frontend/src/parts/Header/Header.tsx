import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import { experimentalStyled as styled } from '@material-ui/core/styles';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

// TODO: Extract product name as const.
const Header = (): JSX.Element => (
  <>
    <AppBar position='fixed'>
      <Toolbar>
        <Container
          maxWidth='lg'
          sx={{ display: `flex`, justifyContent: `space-between` }}
        >
          AtCoder Trophies
        </Container>
      </Toolbar>
    </AppBar>
    <Offset />
  </>
);

export default Header;
