import Box from '@mui/material/Box';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Zoom from '@mui/material/Zoom';
import type { MouseEvent, ReactElement } from 'react';

// See:
// https://material-ui.com/components/app-bar/#back-to-top
// https://www.ansonlowzf.com/build-header-component-with-nextjs-material-ui-v5/
interface Props {
  children: ReactElement;
}

const BackToTopButton = ({ children }: Props): ReactElement => {
  const trigger = useScrollTrigger();

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role='presentation'
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
};

export default BackToTopButton;
