// @flow

import React, { useState } from 'react'

/**
 * Components
 */
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check'
import CancelIcon from '@material-ui/icons/Cancel'
import Tooltip from '@material-ui/core/Tooltip'
import TextField from '@material-ui/core/TextField'
import { Trans } from '@lingui/macro'
import { Form, Field } from 'react-final-form'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'

/**
 * Utils
 */
import * as formRules from '../../../../../services/utils/form-rules'

export default ({ categories, value }) => {
  const [isEditingMode, setEditingMode] = useState(false)

  function enableEditingMode () {
    setEditingMode(true)
  }

  function disabledEditingMode () {
    setEditingMode(false)
  }

  function onFormSubmit () {
    console.log('submit')
    disabledEditingMode()
  }

  return (
    <ListItem>
      <Form onSubmit={onFormSubmit} initialValues={{ name: value.name }}>
        {({ handleSubmit, pristine, invalid, submitting }) => (
          <form onSubmit={handleSubmit}>
            {isEditingMode ? (
              <Field
                name='name'
                validate={formRules.composeValidators(
                  formRules.required,
                  formRules.isNotDuplicate(categories.map(c => c.name))
                )}
              >
                {({ input, meta }) => (
                  <FormControl error={meta.error && meta.touched && !meta.pristine}>
                    <TextField
                      autoFocus
                      margin='dense'
                      id='category'
                      label={<Trans>Name</Trans>}
                      type='text'
                      fullWidth
                      error={meta.error && meta.touched && !meta.pristine}
                      {...input}
                    />

                    {meta.error &&
                      meta.touched &&
                      !meta.pristine && <FormHelperText id='component-error-text'>{meta.error}</FormHelperText>}
                  </FormControl>
                )}
              </Field>
            ) : (
              <ListItemText primary={value.name} />
            )}

            <ListItemSecondaryAction>
              {isEditingMode ? (
                <React.Fragment>
                  <Tooltip title={<Trans>Cancel</Trans>}>
                    <IconButton aria-label={<Trans>Cancel</Trans>} onClick={disabledEditingMode}>
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={<Trans>Validate</Trans>}>
                    <IconButton type='submit' aria-label={<Trans>Validate</Trans>}>
                      <CheckIcon />
                    </IconButton>
                  </Tooltip>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Tooltip title={<Trans>Edit</Trans>}>
                    <IconButton aria-label={<Trans>Edit</Trans>} onClick={enableEditingMode}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={<Trans>Delete</Trans>}>
                    <IconButton aria-label={<Trans>Delete</Trans>}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </React.Fragment>
              )}
            </ListItemSecondaryAction>
          </form>
        )}
      </Form>
    </ListItem>
  )
}
