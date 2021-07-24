import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { createStyles, makeStyles } from '@material-ui/styles';
import copy from 'copy-text-to-clipboard';
import { useState } from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      // HACK: `TypeError: theme.spacing is not a function`
      // See:
      // https://next.material-ui.com/guides/migration-v4/
      // margin: parseInt(theme.spacing(1), 10),
      margin: '8px',
      width: '100%',
    },
    grid: {
      padding: '16px',
      textAlign: 'center',
    },
  }),
);

interface TextBoxWithCopyButtonProps {
  label: string;
}

// See:
// https://qiita.com/kou_pg_0131/items/211f04f59371c752bd88
// https://github.com/sindresorhus/copy-text-to-clipboard
const TextBoxWithCopyButton = (
  props: TextBoxWithCopyButtonProps,
): JSX.Element => {
  const classes = useStyles();
  const [input, setInput] = useState<string>('');
  const [openTip, setOpenTip] = useState<boolean>(false);
  const { label } = props;

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleCloseTip = (): void => {
    copy(input); // HACK: It might not be a good idea to describe it in this position.
    setOpenTip(false);
  };

  const handleClickButton = (): void => {
    setOpenTip(true);
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} className={classes.grid}>
          <FormControl variant='standard' className={classes.root}>
            <InputLabel>{label}</InputLabel>
            <Input
              type='text'
              value={input}
              onChange={handleChangeText}
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
                      disabled={input === ''}
                      onClick={handleClickButton}
                    >
                      <AssignmentIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default TextBoxWithCopyButton;
