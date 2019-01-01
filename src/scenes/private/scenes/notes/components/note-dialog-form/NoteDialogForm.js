// @flow

import React, { useState, useEffect } from 'react'

/**
 * Components
 */
import { Trans } from '@lingui/macro'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import { Form, Field } from 'react-final-form'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import { Editor } from 'react-draft-wysiwyg'
import Select from 'react-select'

/**
 * Utils
 */
import { withStyles } from '@material-ui/core/styles'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { map } from 'lodash'
import * as formRules from '../../../../../../services/utils/form-rules'
import type { FirebaseLists } from '../../../../../../services/utils/types'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  },
  formContainer: {
    padding: theme.spacing.unit * 2
  },
  editor: {
    padding: theme.spacing.unit * 2,
    border: '1px solid #ccc',
    borderRadius: 4,
    minHeight: 300
  },
  paperDialog: {
    overflowX: 'hidden'
  }
})

type NoteDialogFormProps = {|
  classes: Object,
  isVisible: boolean,
  initialValues?: {
    title: string,
    content: string
  },
  lists: FirebaseLists,
  onClose: Function,
  onSubmit: Function
|}

export default withStyles(styles)(
  ({ classes, isVisible, lists, onClose, onSubmit, initialValues }: NoteDialogFormProps) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    useEffect(() => {
      if (initialValues) {
        const blocksFromHtml = htmlToDraft(initialValues.content)
        const { contentBlocks, entityMap } = blocksFromHtml
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
        const editorStateWithContent = EditorState.createWithContent(contentState)
        setEditorState(editorStateWithContent)
      }
    }, [])

    async function onFormSubmit (values) {
      try {
        onSubmit({ ...values, content: draftToHtml(convertToRaw(editorState.getCurrentContent())) })
        onClose()
      } catch (e) {
        console.log(e)
      }
    }

    return (
      <Dialog
        fullScreen
        open={isVisible}
        onClose={onClose}
        aria-labelledby='note-dialog-form'
        classes={{ paper: classes.paperDialog }}
      >
        <Form initialValues={initialValues} onSubmit={onFormSubmit}>
          {({ handleSubmit, pristine, invalid, submitting }) => (
            <form onSubmit={handleSubmit}>
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton color='inherit' onClick={onClose} aria-label='Close'>
                    <CloseIcon />
                  </IconButton>
                  <Typography variant='h6' color='inherit' className={classes.flex}>
                    {initialValues ? <Trans>Edit note</Trans> : <Trans>Add a new note</Trans>}
                  </Typography>
                  <Button type='submit' color='inherit'>
                    {initialValues ? <Trans>Save</Trans> : <Trans>Add</Trans>}
                  </Button>
                </Toolbar>
              </AppBar>
              <Grid container spacing={16} className={classes.formContainer}>
                <Grid item xs={12}>
                  <Field name='title' validate={formRules.required}>
                    {({ input, meta }) => (
                      <FormControl error={meta.error && meta.touched} fullWidth>
                        <TextField
                          margin='dense'
                          id='Title'
                          label={<Trans>Title</Trans>}
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
                <Grid item xs={12}>
                  <Field name='list' validate={formRules.required}>
                    {({ input, meta }) => (
                      <FormControl error={meta.error && meta.touched} fullWidth>
                        <Select
                          isMulti
                          options={map(lists, (list) => ({
                            label: list.name,
                            value: list.id
                          }))}
                          styles={{
                            menu: provided => ({
                              ...provided,
                              zIndex: 100000
                            })
                          }}
                          placeholder={<Trans>Associate with lists</Trans>}
                          {...input}
                        />
                        {meta.error && meta.touched && <FormHelperText>{meta.error}</FormHelperText>}
                      </FormControl>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} style={{ overflowX: 'hidden' }}>
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    wrapperClassName='demo-wrapper'
                    editorClassName={classes.editor}
                  />
                </Grid>
              </Grid>
            </form>
          )}
        </Form>
      </Dialog>
    )
  }
)
