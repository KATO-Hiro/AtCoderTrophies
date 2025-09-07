import AssignmentIcon from '@mui/icons-material/Assignment';
import FormControl from '@mui/material/FormControl';

import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Tooltip from '@mui/material/Tooltip';
import copy from 'copy-text-to-clipboard';
import { type ReactElement, useState } from 'react';

import { StyledGrid } from '../../components/StyledGrid/StyledGrid';
import type { TextBoxWithCopyButtonProps } from '../../interfaces/TextBoxWithCopyButtonProps';

// See:
// https://qiita.com/kou_pg_0131/items/211f04f59371c752bd88
// https://github.com/sindresorhus/copy-text-to-clipboard
const TextBoxWithCopyButton = (props: TextBoxWithCopyButtonProps): ReactElement => {
  const { label, value } = props;
  const [openTip, setOpenTip] = useState<boolean>(false);

  const handleCloseTip = (): void => {
    copy(value); // HACK: It might not be a good idea to describe it in this position.
    setOpenTip(false);
  };

  const handleClickButton = (): void => {
    setOpenTip(true);
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <StyledGrid>
            <FormControl
              variant='standard'
              sx={{
                '& .MuiInput-root': {
                  m: '8px',
                  width: '90ch',
                },
              }}
            >
              <InputLabel>{label}</InputLabel>
              <Input
                type='text'
                value={value}
                endAdornment={
                  <InputAdornment position='end'>
                    <Tooltip
                      arrow
                      open={openTip}
                      onClose={handleCloseTip}
                      disableHoverListener
                      placement='top'
                      title='Copied'
                    >
                      <IconButton disabled={value === ''} onClick={handleClickButton}>
                        <AssignmentIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                }
              />
            </FormControl>
          </StyledGrid>
        </Grid>
      </Grid>
    </>
  );
};

export default TextBoxWithCopyButton;
