// @flow

import React from 'react'

/**
 * Components
 */
import { Form, Field } from 'react-final-form'
import { Trans } from '@lingui/macro'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'

/**
 * Utils
 */
import * as formRules from '../../../../../services/utils/form-rules'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  input: {
    background: '#fff'
  }
})

type SearchWordFormProps = {|
  onSearch: ({ search: string }) => void,
  classes: Object
|}

export default withStyles(styles)(({ onSearch, classes }: SearchWordFormProps) => {
  async function onSubmit (values) {
    onSearch(values)
  }

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name='search' rules={formRules.required}>
            {({ input, meta }) => (
              <React.Fragment>
                <TextField
                  className={classes.input}
                  variant='outlined'
                  fullWidth
                  label={<Trans>Search word</Trans>}
                  {...input}
                />
                {meta.error && meta.touched && <FormHelperText id='component-error-text'>{meta.error}</FormHelperText>}
              </React.Fragment>
            )}
          </Field>
        </form>
      )}
    </Form>
  )
})
