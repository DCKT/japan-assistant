// @flow

import React, { useState } from 'react'

/**
 * Components
 */
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { Trans } from '@lingui/macro'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import ReactSelect from 'react-select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'

/**
 * Utils
 */
import containerPicture from './assets/container.svg'
import { withStyles } from '@material-ui/core/styles'
import { map } from 'lodash'

const styles = theme => ({
  paperContainer: {
    maxWidth: 500,
    margin: 'auto',
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4
  },
  containerPicture: {
    maxWidth: 350,
    marginBottom: theme.spacing.unit * 2
  },
  formContainer: {
    maxWidth: 350,
    margin: 'auto',
    textAlign: 'left',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
})

type SelectTrainingConfigProps = {|
  classes: Object,
  lists: Object,
  onSubmit: Function
|}

export default withStyles(styles)(({ classes, lists, onSubmit }: SelectTrainingConfigProps) => {
  const [selectedLists, setSelectedLists] = useState([])
  const [trainingType, setTrainingType] = useState('')

  return (
    <Paper className={classes.paperContainer}>
      <img src={containerPicture} alt='Configure your training' className={classes.containerPicture} />
      <Typography component='h2' variant='title'>
        <Trans>Pickup the lists you want to train</Trans>
      </Typography>

      <div className={classes.formContainer}>
        <FormControl className={classes.formControl} fullWidth>
          <ReactSelect
            isMulti
            options={map(lists, list => ({
              label: list.name,
              value: list
            }))}
            placeholder={<Trans>Search lists</Trans>}
            onChange={values => setSelectedLists(values)}
          />
        </FormControl>
        <FormControl className={classes.formControl} fullWidth>
          <Select value={trainingType} onChange={event => setTrainingType(event.target.value)} displayEmpty>
            <MenuItem value='' disabled>
              <em>
                <Trans>Select the training type</Trans>
              </em>
            </MenuItem>
            <MenuItem value='kanji_to_kana'>
              <Trans>Kanji -> Kana</Trans>
            </MenuItem>
            <MenuItem value='kanji_to_traduction'>
              <Trans>Kanji -> Traduction</Trans>
            </MenuItem>
            <MenuItem value='traduction_to_kanji'>
              <Trans>Traduction -> Kanji</Trans>
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      {selectedLists.length && trainingType ? (
        <Button variant='contained' color='primary' onClick={() => onSubmit({ selectedLists, trainingType })}>
          <Trans>Start training !</Trans>
        </Button>
      ) : null}
    </Paper>
  )
})
