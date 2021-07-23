import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { Theme } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { createStyles, makeStyles } from '@material-ui/styles';

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
  }),
);

function UserSettings(): JSX.Element {
  const classes = useStyles();

  return (
    <form className={classes.root} autoComplete='on'>
      <>
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

        {/* <BackgroundThemeColor /> */}
        {/* <AdvancedOptions /> */}
        {/* <CreateTrophiesButton /> */}
      </>
    </form>
  );
}

export default UserSettings;
