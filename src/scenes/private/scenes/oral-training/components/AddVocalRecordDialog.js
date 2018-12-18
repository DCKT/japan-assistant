// @flow

import React from 'react'

/**
 * Components
 */

import Button from '@material-ui/core/Button'
import { Trans } from '@lingui/macro'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Form, Field } from 'react-final-form'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'

/**
 * Utils
 */
import * as formRules from '../../../../../services/utils/form-rules'

type AddVocalRecordDialogProps = {|
  isVisible: boolean,
  onClose: Function,
  onCreate: Function
|}

export default ({ isVisible, onClose, onCreate }: AddVocalRecordDialogProps) => {
  async function onFormSubmit (values) {
    onCreate(values)
    onClose()
  }

  return (
    <Dialog scroll='body' open={isVisible} onClose={onClose} aria-labelledby='form-dialog-title'>
      <Form onSubmit={onFormSubmit}>
        {({ handleSubmit, pristine, invalid, submitting }) => (
          <form onSubmit={handleSubmit}>
            <DialogTitle id='form-dialog-title'>
              <Trans>Add a new vocal record</Trans>
            </DialogTitle>
            <DialogContent>
              <Field name='text' validate={formRules.required}>
                {({ input, meta }) => (
                  <FormControl error={meta.error && meta.touched} fullWidth>
                    <TextField
                      margin='dense'
                      id='text'
                      label={<Trans>Text</Trans>}
                      type='text'
                      variant='outlined'
                      rowsMax='4'
                      rows='4'
                      multiline
                      fullWidth
                      {...input}
                    />
                    {meta.error && meta.touched && <FormHelperText>{meta.error}</FormHelperText>}
                  </FormControl>
                )}
              </Field>
              <br />
              <Field name='traduction' validate={formRules.required}>
                {({ input, meta }) => (
                  <FormControl error={meta.error && meta.touched} fullWidth>
                    <TextField
                      margin='dense'
                      id='traduction'
                      label={<Trans>Traduction</Trans>}
                      type='text'
                      variant='outlined'
                      rowsMax='4'
                      rows='4'
                      multiline
                      fullWidth
                      {...input}
                    />
                    {meta.error && meta.touched && <FormHelperText>{meta.error}</FormHelperText>}
                  </FormControl>
                )}
              </Field>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>
                <Trans>Cancel</Trans>
              </Button>
              <Button type='submit' variant='contained' color='primary'>
                <Trans>Add</Trans>
              </Button>
            </DialogActions>
          </form>
        )}
      </Form>
    </Dialog>
  )
}
