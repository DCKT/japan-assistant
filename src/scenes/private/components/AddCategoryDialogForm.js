// @flow

import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import { Trans } from '@lingui/macro'
import { Form, Field } from 'react-final-form'

/**
 * Utils
 */
import * as formRules from '../../../services/utils/form-rules'

type AddCategoryDialogProps = {|
  isVisible: boolean,
  onClose: Function,
  onSubmit: Function
|}

type AddCategoryDialogFormValues = {|
  name: string
|}

function AddCategoryDialogForm ({ isVisible, onClose, onSubmit }: AddCategoryDialogProps) {
  async function onFormSubmit (values: AddCategoryDialogFormValues) {
    onSubmit(values)
    onClose()
  }

  return (
    <Dialog open={isVisible} onClose={onClose} aria-labelledby='form-dialog-title'>
      <Form onSubmit={onFormSubmit}>
        {({ handleSubmit, pristine, invalid, submitting }) => (
          <form onSubmit={handleSubmit}>
            <DialogTitle id='form-dialog-title'>
              <Trans>Add a new category</Trans>
            </DialogTitle>
            <DialogContent>
              <Field name='name' validate={formRules.required}>
                {({ input, meta }) => (
                  <FormControl error={meta.error && meta.touched}>
                    <TextField
                      autoFocus
                      margin='dense'
                      id='category'
                      label={<Trans>Name</Trans>}
                      type='text'
                      fullWidth
                      error={meta.error && meta.touched}
                      {...input}
                    />

                    {meta.error &&
                      meta.touched && <FormHelperText id='component-error-text'>{meta.error}</FormHelperText>}
                  </FormControl>
                )}
              </Field>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>
                <Trans>Cancel</Trans>
              </Button>
              <Button type='submit' variant='contained' color='primary' disabled={submitting || pristine}>
                <Trans>Add</Trans>
              </Button>
            </DialogActions>
          </form>
        )}
      </Form>
    </Dialog>
  )
}

export default AddCategoryDialogForm
