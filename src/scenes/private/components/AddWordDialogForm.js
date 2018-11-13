// @flow

import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Trans } from '@lingui/macro'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import { Form, Field } from 'react-final-form'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

/**
 * Utils
 */
import * as formRules from '../../../services/utils/form-rules'
import { addFirebaseValue, updateFirebaseValue } from '../../../services/firebase'

type AddWordDialogProps = {|
  isVisible: boolean,
  onClose: Function,
  viewer: Object,
  editedWord: ?Object
|}

function AddWordDialog ({ isVisible, onClose, viewer, editedWord }: AddWordDialogProps) {
  async function onFormSubmit (values) {
    if (editedWord) {
      onEdit(values)
    } else {
      onCreate(values)
    }
  }

  function onCreate (values) {
    const id = Date.now()

    addFirebaseValue(`users/${viewer.uid}/words/${id}`, {
      id,
      ...values
    })
    onClose()
  }

  function onEdit (values) {
    updateFirebaseValue(`users/${viewer.uid}/words/${editedWord.id}`, {
      ...values
    })
  }

  return (
    <Dialog open={isVisible} onClose={onClose} aria-labelledby='form-dialog-title'>
      <Form initialValues={editedWord || {}} onSubmit={onFormSubmit}>
        {({ handleSubmit, pristine, invalid, submitting }) => (
          <form onSubmit={handleSubmit}>
            <DialogTitle id='form-dialog-title'>
              {editedWord ? <Trans>Update {editedWord.name}</Trans> : <Trans>Add a new word</Trans>}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <Grid container spacing={16}>
                    <Grid item xs={12}>
                      <Field name='name' validate={formRules.required}>
                        {({ input, meta }) => (
                          <FormControl error={meta.error && meta.touched} fullWidth>
                            <TextField
                              autoFocus
                              margin='dense'
                              id='name'
                              label={<Trans>Name</Trans>}
                              type='text'
                              variant='outlined'
                              fullWidth
                              {...input}
                            />
                            {meta.error && meta.touched && <FormHelperText>{meta.error}</FormHelperText>}
                          </FormControl>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6}>
                      <Field name='kanji' validate={formRules.japaneseCharacterOnly}>
                        {({ input, meta }) => (
                          <FormControl error={meta.error && meta.touched} fullWidth>
                            <TextField
                              margin='dense'
                              id='kanji'
                              label={<Trans>Kanji</Trans>}
                              type='text'
                              fullWidth
                              {...input}
                            />
                            {meta.error && meta.touched && <FormHelperText>{meta.error}</FormHelperText>}
                          </FormControl>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name='kana'
                        validate={formRules.composeValidators(formRules.required, formRules.japaneseCharacterOnly)}
                      >
                        {({ input, meta }) => (
                          <FormControl error={meta.error && meta.touched} fullWidth>
                            <TextField
                              margin='dense'
                              id='kana'
                              label={<Trans>Kana</Trans>}
                              type='text'
                              fullWidth
                              {...input}
                            />
                            {meta.error && meta.touched && <FormHelperText>{meta.error}</FormHelperText>}
                          </FormControl>
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider style={{ margin: '8px 0 12px' }} />
                  <Typography component='em' variant='subheading' color='textPrimary'>
                    <Trans>Additional informations :</Trans>
                  </Typography>

                  <Field name='category'>
                    {({ input, meta }) => (
                      <FormControl error={meta.error && meta.touched} fullWidth>
                        <TextField
                          margin='dense'
                          id='category'
                          label={<Trans>Category</Trans>}
                          type='text'
                          fullWidth
                          {...input}
                        />
                        {meta.error && meta.touched && <FormHelperText>{meta.error}</FormHelperText>}
                      </FormControl>
                    )}
                  </Field>

                  <Field name='note'>
                    {({ input, meta }) => (
                      <FormControl error={meta.error && meta.touched} fullWidth>
                        <TextField
                          margin='dense'
                          id='note'
                          label={<Trans>Note</Trans>}
                          type='text'
                          multiline
                          fullWidth
                          {...input}
                        />
                        {meta.error && meta.touched && <FormHelperText>{meta.error}</FormHelperText>}
                      </FormControl>
                    )}
                  </Field>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>
                <Trans>Cancel</Trans>
              </Button>
              <Button type='submit' variant='contained' color='primary'>
                {editedWord ? <Trans>Update</Trans> : <Trans>Add</Trans>}
              </Button>
            </DialogActions>
          </form>
        )}
      </Form>
    </Dialog>
  )
}

export default AddWordDialog