import AccountCircle from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { type ReactElement, useId } from 'react';

import { StyledGrid } from '../../components/StyledGrid/StyledGrid';
import { rankRanges } from '../../constants/rank';
import type { UserSettingsProps } from '../../interfaces/UserSettingsProps';
import { backgroundThemes } from '../../styles/background-themes';

// See:
// https://material-ui.com/components/text-fields
// https://material-ui.com/components/buttons/
// https://material-ui.com/components/grid/
function UserSettings(props: UserSettingsProps): ReactElement {
  const { queryParameters, inputRef, inputError, onChange, onSwitchChange, onClick } = props;
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

  // Generate unique IDs for form elements
  const atCoderUserNameId = useId();
  const themeId = useId();
  const advancedOptionsId = useId();
  const filterByTitleId = useId();
  const filterByRankId = useId();
  const cabinetRowId = useId();
  const cabinetColumnId = useId();
  const marginHeightId = useId();
  const marginWidthId = useId();

  const SIZE_MIN = 1;
  const SIZE_MAX = 25;
  const MARGIN_MIN = 0;
  const MARGIN_MAX = 300;

  // See:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
  const COMMA_SEPARATED = '^\\s*[a-zA-Z]+(?:,\\s*[a-zA-Z]+)*$';

  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': {
          m: '8px',
          width: '100%',
        },
      }}
      autoComplete='on'
    >
      {/* TODO: Extract the below elements as a component. */}
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, sm: 6 }}>
          {/* <AtCoderUserId /> */}
          <StyledGrid>
            <TextField
              required
              id={atCoderUserNameId}
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
          </StyledGrid>
        </Grid>

        {/* <Theme /> */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <StyledGrid>
            <TextField
              id={themeId}
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
          </StyledGrid>
        </Grid>

        {/* TODO: Refactoring & extract the below elements as a component. */}
        {/* <AdvancedOptions /> */}
        {/* See:
        https://mui.com/components/accordion/#basic-accordion
        https://mui.com/api/text-field/ */}
        <Grid size={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id={advancedOptionsId}
            >
              <Typography>Advanced Options</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <StyledGrid>
                    <TextField
                      id={filterByTitleId}
                      name='filterByTitle'
                      value={filterByTitle}
                      label='Filter by title'
                      placeholder='AC, RPS, CPlusPlus, Python, Rust, ...'
                      variant='standard'
                      onChange={onChange}
                      error={inputError}
                      inputProps={{
                        pattern: COMMA_SEPARATED,
                      }}
                      inputRef={inputRef}
                      helperText={inputRef?.current?.validationMessage}
                    ></TextField>
                  </StyledGrid>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <StyledGrid>
                    <TextField
                      id={filterByRankId}
                      name='filterByRank'
                      select
                      value={filterByRank}
                      label='Filter by rank'
                      variant='standard'
                      onChange={onChange}
                      inputProps={{}}
                    >
                      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
                      {rankRanges().map((option: { [key: string]: string }) => (
                        <MenuItem key={option.label} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </StyledGrid>
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <StyledGrid>
                    <TextField
                      id={cabinetRowId}
                      name='cabinetRow'
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
                          Math.min(SIZE_MAX, parseInt(e.target.value, 10)),
                        )
                          .toString()
                          .slice(0, 30);
                      }}
                      onChange={onChange}
                    />
                  </StyledGrid>
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <StyledGrid>
                    <TextField
                      id={cabinetColumnId}
                      name='cabinetColumn'
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
                          Math.min(SIZE_MAX, parseInt(e.target.value, 10)),
                        )
                          .toString()
                          .slice(0, 30);
                      }}
                      onChange={onChange}
                    />
                  </StyledGrid>
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <StyledGrid>
                    <TextField
                      id={marginHeightId}
                      name='marginHeight'
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
                          Math.min(MARGIN_MAX, parseInt(e.target.value, 10)),
                        )
                          .toString()
                          .slice(0, 30);
                      }}
                      onChange={onChange}
                    />
                  </StyledGrid>
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <StyledGrid>
                    <TextField
                      id={marginWidthId}
                      name='marginWidth'
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
                          Math.min(MARGIN_MAX, parseInt(e.target.value, 10)),
                        )
                          .toString()
                          .slice(0, 30);
                      }}
                      onChange={onChange}
                    />
                  </StyledGrid>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <StyledGrid>
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
                  </StyledGrid>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <StyledGrid>
                    <FormControlLabel
                      control={
                        <Switch name='noFrames' checked={noFrames} onChange={onSwitchChange} />
                      }
                      label='Hide frames'
                    />
                  </StyledGrid>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* <CreateTrophiesButton /> */}
        <Grid size={12}>
          <StyledGrid>
            <Button variant='contained' color='primary' disabled={inputError} onClick={onClick}>
              Create
            </Button>
          </StyledGrid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserSettings;
