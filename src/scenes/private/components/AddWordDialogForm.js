// @flow

import React from 'react'

/**
 * Components
 */
import Select from 'react-select'
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

/**
 * Utils
 */
import * as formRules from '../../../services/utils/form-rules'
import type { ReactSelectOption } from '../../../services/utils/types'

type AddWordDialogProps = {|
  isVisible: boolean,
  onClose: Function,
  editedWord: ?Object,
  lists: Array<ReactSelectOption>,
  onCreate: Function,
  onEdit: Function
|}

function AddWordDialog ({ isVisible, onClose, editedWord, lists, onCreate, onEdit }: AddWordDialogProps) {
  const initialValues = editedWord
    ? {
      ...editedWord,
      list: editedWord.list
        ? {
          label: editedWord.list.name,
          value: editedWord.list
        }
        : null
    }
    : {}

  async function onFormSubmit (values) {
    if (editedWord) {
      onEdit(values)
    } else {
      onCreate(values)
    }

    onClose()
  }

  return (
    <Dialog scroll='body' open={isVisible} onClose={onClose} aria-labelledby='form-dialog-title'>
      <Form initialValues={initialValues} onSubmit={onFormSubmit}>
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
                              variant='outlined'
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
                              variant='outlined'
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
                  <Grid container spacing={16}>
                    <Grid item xs={12}>
                      {lists.length ? (
                        <Field name='list'>
                          {({ input, meta }) => (
                            <FormControl error={meta.error && meta.touched} fullWidth>
                              <Select
                                options={lists}
                                styles={{
                                  menu: provided => ({
                                    ...provided,
                                    zIndex: 100000
                                  })
                                }}
                                placeholder={<Trans>Select a list</Trans>}
                                {...input}
                              />
                              {meta.error && meta.touched && <FormHelperText>{meta.error}</FormHelperText>}
                            </FormControl>
                          )}
                        </Field>
                      ) : null}
                    </Grid>
                    <Grid item xs={12}>
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
                              rowsMax='6'
                              rows='6'
                              variant='outlined'
                              {...input}
                            />
                            {meta.error && meta.touched && <FormHelperText>{meta.error}</FormHelperText>}
                          </FormControl>
                        )}
                      </Field>
                    </Grid>
                  </Grid>
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
