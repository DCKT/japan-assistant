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
import Button from '@material-ui/core/Button'
import { Trans } from '@lingui/macro'
import { Form as FormProvider, Field } from 'react-final-form'

/**
 * Utild
 */
import type { FirebaseWord } from '../../../../../../services/utils/types'
import * as formRules from '../../../../../../services/utils/form-rules'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    textAlign: 'center',
    maxWidth: 500,
    margin: 'auto'
  }
})

type QuizzProps = {|
  classes: Object,
  currentWord: FirebaseWord,
  trainingType: 'kanji_to_kana' | 'kanji_to_traduction' | 'traduction_to_kanji' | 'traduction_to_kana'
|}

export default withStyles(styles)(({ classes, currentWord, trainingType }: QuizzProps) => {
  function displayCurrentWord () {
    switch (trainingType) {
      case 'kanji_to_kana':
        return currentWord.kanji
      case 'kanji_to_traduction':
        return currentWord.kanji || currentWord.kana
      case 'traduction_to_kanji':
      case 'traduction_to_kana':
        return currentWord.name
    }
  }

  function onWordSubmit (values) {
    console.log('submit')
  }

  return (
    <Paper className={classes.container}>
      <Typography component='h2' variant='h1'>
        {displayCurrentWord()}
      </Typography>

      <FormProvider onSubmit={onWordSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name='word' validate={formRules.required}>
              {({ input, meta }) => (
                <FormControl error={meta.error && meta.touched}>
                  <TextField
                    autoFocus
                    label={<Trans>Your answer</Trans>}
                    margin='normal'
                    variant='outlined'
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
