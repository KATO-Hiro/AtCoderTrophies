import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import { Theme } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { createStyles, makeStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { UserSettingsProps } from '../../interfaces/UserSettingsProps';
import { backgroundThemes } from '../../styles/background-themes';

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
        width: '100%',
      },
    },
    grid: {
      padding: '16px',
      textAlign: 'center',
    },
  }),
);

function UserSettings(props: UserSettingsProps): JSX.Element {
  const classes = useStyles();
  const {
    queryParameters,
    inputRef,
    inputError,
    onChange,
    onSwitchChange,
    onClick,
  } = props;
  const {
    userName,
    theme,
    filterByTitle,
    filterByRank,
    cabinetRow,
    cabinetColumn,
    marginHeight,
    marginWidth,
    noBackground,
    noFrames,
  } = queryParameters;

  const SIZE_MIN = 1;
  const SIZE_MAX = 25;
  const MARGIN_MIN = 0;
  const MARGIN_MAX = 300;

  // See:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
  const COMMA_SEPARATED = '^\\s*[a-zA-Z]+(?:,\\s*[a-zA-Z]+)*$';

  return (
    <form className={classes.root} autoComplete='on'>
      {/* TODO: Extract the below elements as a component. */}
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} className={classes.grid}>
          {/* <AtCoderUserId /> */}
          {/* TODO: Add validation. */}
          <TextField
            id='atcoder-user-id'
            name='userName'
            value={userName}
            label='User ID'
            placeholder='chokudai'
            variant='standard'
            onChange={onChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* <Theme /> */}
        <Grid item xs={12} sm={6} className={classes.grid}>
          <TextField
            id='theme'
            name='theme'
            select
            value={theme}
            label='Theme'
            variant='standard'
            onChange={onChange}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
            {backgroundThemes().map((option: { [key: string]: string }) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* TODO: Refactoring & extract the below elements as a component. */}
        {/* <AdvancedOptions /> */}
        {/* See:
        https://mui.com/components/accordion/#basic-accordion
        https://mui.com/api/text-field/ */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='advanced-options'
          >
            <Typography>Advanced Options</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} className={classes.grid}>
                <TextField
                  id='filter-by-title'
                  name='filterByTitle'
                  value={filterByTitle}
                  label='Filter by title'
                  placeholder='AC, RPS, CPlusPlus, Python, Rust, ...'
                  variant='standard'
                  onChange={onChange}
                  error={inputError}
                  inputProps={{
                    startAdornment: (
                      <InputAdornment position='start'></InputAdornment>
                    ),
                    pattern: COMMA_SEPARATED,
                  }}
                  inputRef={inputRef}
                  helperText={inputRef?.current?.validationMessage}
                />
              </Grid>
              {/* HACK: Enables validation of input values. */}
              <Grid item xs={12} sm={6} className={classes.grid}>
                <TextField
                  id='filter-by-rank'
                  name='filterByRank'
                  value={filterByRank}
                  label='Filter by rank'
                  placeholder='S, AAA, AA, ...'
                  variant='standard'
                  onChange={onChange}
                  // error={inputError}
                  inputProps={{
                    startAdornment: (
                      <InputAdornment position='start'></InputAdornment>
                    ),
                    // pattern: COMMA_SEPARATED,
                  }}
                  // inputRef={inputRef}
                  // helperText={inputRef?.current?.validationMessage}
                />
              </Grid>
              <Grid item xs={12} sm={3} className={classes.grid}>
                <TextField
                  id='cabinet-row'
                  name='cabinetRow'
                  defaultValue={3}
                  value={cabinetRow}
                  label='Row'
                  type='number'
                  InputProps={{
                    inputProps: { min: SIZE_MIN, max: SIZE_MAX },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='standard'
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.target.value = Math.max(
                      SIZE_MIN,
                      Math.min(SIZE_MAX, parseInt(e.target.value)),
                    )
                      .toString()
                      .slice(0, 30);
                  }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={3} className={classes.grid}>
                <TextField
                  id='cabinet-column'
                  name='cabinetColumn'
                  defaultValue={7}
                  value={cabinetColumn}
                  label='Column'
                  type='number'
                  InputProps={{
                    inputProps: { min: SIZE_MIN, max: SIZE_MAX },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='standard'
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.target.value = Math.max(
                      SIZE_MIN,
                      Math.min(SIZE_MAX, parseInt(e.target.value)),
                    )
                      .toString()
                      .slice(0, 30);
                  }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={3} className={classes.grid}>
                <TextField
                  id='margin-height'
                  name='marginHeight'
                  defaultValue={0}
                  value={marginHeight}
                  label='Margin Height'
                  type='number'
                  InputProps={{
                    inputProps: { min: MARGIN_MIN, max: MARGIN_MAX },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='standard'
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.target.value = Math.max(
                      MARGIN_MIN,
                      Math.min(MARGIN_MAX, parseInt(e.target.value)),
                    )
                      .toString()
                      .slice(0, 30);
                  }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={3} className={classes.grid}>
                <TextField
                  id='margin-width'
                  name='marginWidth'
                  defaultValue={0}
                  value={marginWidth}
                  label='Margin Width'
                  type='number'
                  InputProps={{
                    inputProps: { min: MARGIN_MIN, max: MARGIN_MAX },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='standard'
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.target.value = Math.max(
                      MARGIN_MIN,
                      Math.min(MARGIN_MAX, parseInt(e.target.value)),
                    )
                      .toString()
                      .slice(0, 30);
                  }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.grid}>
                <FormControlLabel
                  control={
                    <Switch
                      name='noBackground'
                      checked={noBackground}
                      onChange={onSwitchChange}
                    />
                  }
                  label='Transparent background'
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.grid}>
                <FormControlLabel
                  control={
                    <Switch
                      name='noFrames'
                      checked={noFrames}
                      onChange={onSwitchChange}
                    />
                  }
                  label='Hide frames'
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* <CreateTrophiesButton /> */}
        <Grid item xs={12} className={classes.grid}>
          <Button
            variant='contained'
            color='primary'
            disabled={inputError}
            onClick={onClick}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default UserSettings;
