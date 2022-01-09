import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';
import AssignmentIcon from '@material-ui/icons/Assignment';
import copy from 'copy-text-to-clipboard';
import { useState } from 'react';

import { StyledGrid } from '../../components/StyledGrid/StyledGrid';
import { TextBoxWithCopyButtonProps } from '../../interfaces/TextBoxWithCopyButtonProps';

// See:
// https://qiita.com/kou_pg_0131/items/211f04f59371c752bd88
// https://github.com/sindresorhus/copy-text-to-clipboard
const TextBoxWithCopyButton = (
  props: TextBoxWithCopyButtonProps,
): JSX.Element => {
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
        <Grid item xs={12} sm={6}>
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
                      <IconButton
                        disabled={value === ''}
                        onClick={handleClickButton}
                      >
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
