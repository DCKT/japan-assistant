// @flow

import React from 'react'

/**
 * Components
 */
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import { Trans } from '@lingui/macro'
import { Form as FormProvider, Field } from 'react-final-form'

/**
 * Utild
 */
import type { FirebaseWord, TrainingType } from '../../../../../../services/utils/types'
import * as formRules from '../../../../../../services/utils/form-rules'
import { withStyles } from '@material-ui/core/styles'
import { displayCurrentWord } from '../../services/utils/quizz'

const styles = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
    maxWidth: 500,
    margin: 'auto',
    position: 'relative'
  },
  trainingTypeTitle: {
    marginBottom: theme.spacing.unit * 4
  },
  progress: {
    position: 'absolute',
    top: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
})

type QuizzProps = {|
  classes: Object,
  currentWord: FirebaseWord,
  trainingType: TrainingType,
  progress: {
    current: number,
    total: number
  },
  onWordValidation: string => void
|}

export default withStyles(styles)(({ classes, currentWord, trainingType, progress, onWordValidation }: QuizzProps) => {
  async function onFormSubmit ({ guess }, reset) {
    onWordValidation(guess)
  }

  return (
    <Paper className={classes.container}>
      <Typography component='p' variant='caption' className={classes.trainingTypeTitle}>
        {trainingType}
      </Typography>
      <Typography component='h2' variant='h1' gutterBottom>
        {displayCurrentWord({ trainingType, currentWord })}
      </Typography>

      <Typography component='p' variant='caption' className={classes.progress}>
        {progress.current} / {progress.total}
      </Typography>

      <FormProvider onSubmit={onFormSubmit}>
        {({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit}>
            <Field name='guess' validate={formRules.required}>
              {({ input, meta }) => (
                <FormControl error={meta.error && meta.touched}>
                  <TextField
                    autoFocus
                    label={<Trans>Your answer</Trans>}
                    margin='normal'
                    variant='outlined'
                    autoComplete='off'
                    error={meta.error && meta.touched}
                    {...input}
                  />
                  {meta.error &&
                    meta.touched && <FormHelperText id='component-error-text'>{meta.error}</FormHelperText>}
                </FormControl>
              )}
            </Field>
          </form>
        )}
      </FormProvider>
    </Paper>
  )
})
