import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Theme } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { createStyles, makeStyles } from '@material-ui/styles';
import { useState } from 'react';

import backgroundThemes from '../../styles/background-themes';

// See:
// https://material-ui.com/components/text-fields
// https://material-ui.com/components/buttons/
// https://material-ui.com/components/grid/
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        // HACK: `TypeError: theme.spacing is not a function`
        // See:
        // https://next.material-ui.com/guides/migration-v4/
        // margin: parseInt(theme.spacing(1), 10),
        margin: '8px',
        width: '25ch',
      },
    },
    grid: {
      padding: '16px',
      textAlign: 'center',
    },
  }),
);

function UserSettings(): JSX.Element {
  const classes = useStyles();
  const [backgroundTheme, setBackgroundTheme] = useState('default');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundTheme(event.target.value);
  };

  const handleClick = () => {
    // TODO: Send a request.
    alert('clicked');
  };

  return (
    <form className={classes.root} autoComplete='on'>
      {/* TODO: Extract the below elements as a component. */}
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} className={classes.grid}>
          {/* <AtCoderUserId /> */}
          {/* TODO: Add validation. */}
          <TextField
            id='atcoder-user-id'
            label='User ID'
            placeholder='chokudai'
            variant='standard'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* <BackgroundTheme /> */}
        <Grid item xs={12} sm={6} className={classes.grid}>
          <TextField
            id='background-theme'
            select
            value={backgroundTheme}
            label='Background theme'
            variant='standard'
            onChange={handleChange}
          >
            {backgroundThemes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* <AdvancedOptions /> */}

        {/* <CreateTrophiesButton /> */}
        <Grid item xs={12} className={classes.grid}>
          <Button variant='contained' color='primary' onClick={handleClick}>
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default UserSettings;
