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
import type { ReactSelectOption, FirebaseWord } from '../../../services/utils/types'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    overflowY: 'visible'
  }
}

type AddWordDialogProps = {|
  isVisible: boolean,
  onClose: Function,
  lists: Array<ReactSelectOption>,
  onCreate: Function,
  onEdit: Function,
  initialValues: ?{
    ...FirebaseWord,
    list: ReactSelectOption
  }
|}

function AddWordDialog({ isVisible, initialValues, onClose, lists, onCreate, onEdit, classes }: AddWordDialogProps) {
  async function onFormSubmit(values) {
    if (initialValues) {
      onEdit(values)
    } else {
      onCreate(values)
    }

    onClose()
  }

  return (
    <Dialog
      scroll="body"
      open={isVisible}
      onClose={onClose}
      aria-labelledby="add-word-dialog-form"
      classes={{
        paper: classes.root
      }}
      disableEscapeKeyDown
    >
      <Form initialValues={initialValues} onSubmit={onFormSubmit}>
        {({ handleSubmit, pristine, invalid, submitting }) => (
          <form onSubmit={handleSubmit}>
            <DialogTitle id="form-dialog-title">
              {initialValues ? <Trans>Update {initialValues.traduction}</Trans> : <Trans>Add a new word</Trans>}
            </DialogTitle>
            <DialogContent style={{ overflowY: 'visible' }}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <Grid container spacing={16}>
                    <Grid item xs={12}>
                      <Field name="traduction" validate={formRules.required}>
                        {({ input, meta }) => (
                          <FormControl error={meta.error && meta.touched} fullWidth>
                            <TextField
                              margin="dense"
                              id="traduction"
                              label={<Trans>Traduction</Trans>}
                              type="text"
                              variant="outlined"
                              fullWidth
                              {...input}
                            />
                            {meta.error && meta.touched && <FormHelperText>{meta.error}</FormHelperText>}
                          </FormControl>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12}>
                      <Field name="secondaryTraduction">
                        {({ input, meta }) => (
                          <FormControl error={meta.error && meta.touched} fullWidth>
                            <TextField
                              margin="dense"
                              id="secondaryTraduction"
                              label={<Trans>Secondary traduction</Trans>}
                              type="text"
                              variant="outlined"
                              fullWidth
                              {...input}
                            />
                          </FormControl>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6}>
                      <Field name="kanji" validate={formRules.japaneseCharacterOnly}>
                        {({ input, meta }) => (
                          <FormControl error={meta.error && meta.touched} fullWidth>
                            <TextField
                              margin="dense"
                              id="kanji"
                              label={<Trans>Kanji</Trans>}
                              type="text"
                              fullWidth
                              variant="outlined"
                              {...input}
                            />
                            {meta.error && meta.touched && <FormHelperText>{meta.error}</FormHelperText>}
                          </FormControl>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="kana"
                        validate={formRules.composeValidators(formRules.required, formRules.japaneseCharacterOnly)}
                      >
                        {({ input, meta }) => (
                          <FormControl error={meta.error && meta.touched} fullWidth>
                            <TextField
                              margin="dense"
                              id="kana"
                              label={<Trans>Kana</Trans>}
                              type="text"
                              fullWidth
                              variant="outlined"
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
                        <Field name="list">
                          {({ input, meta }) => (
                            <FormControl error={meta.error && meta.touched} fullWidth>
                              <Select
                                isMulti
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
                      <Field name="note">
                        {({ input, meta }) => (
                          <FormControl error={meta.error && meta.touched} fullWidth>
                            <TextField
                              margin="dense"
                              id="note"
                              label={<Trans>Note</Trans>}
                              type="text"
                              multiline
                              fullWidth
                              rowsMax="6"
                              rows="6"
                              variant="outlined"
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
              <Button type="submit" variant="contained" color="primary">
                {initialValues ? <Trans>Update</Trans> : <Trans>Add</Trans>}
              </Button>
            </DialogActions>
          </form>
        )}
      </Form>
    </Dialog>
  )
}

export default withStyles(styles)(AddWordDialog)
