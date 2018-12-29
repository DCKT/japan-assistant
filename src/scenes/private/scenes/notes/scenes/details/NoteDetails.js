// @flow

import React, { useEffect, useState } from 'react'

/**
 * Components
 */
import { Link } from '@reach/router'
import { Trans } from '@lingui/macro'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import EditIcon from '@material-ui/icons/Edit'
import NoteDialogForm from '../../components/note-dialog-form'

/**
 * Utils
 */
import { onFirebaseValue, updateFirebaseValue } from '../../../../../../services/firebase'
import type { FirebaseViewer, FirebaseNoteID } from '../../../../../../services/utils/types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 2
  },
  titleContainer: {
    paddingBottom: theme.spacing.unit * 2
  },
  editIcon: {
    marginRight: theme.spacing.unit
  }
})

type NoteDetailsProps = {|
  viewer: FirebaseViewer,
  noteId: FirebaseNoteID,
  classes: Object
|}

export default withStyles(styles)(({ classes, noteId, viewer }: NoteDetailsProps) => {
  const [note, setNote] = useState(null)
  const [isDialogFormVisible, setDialogFormVisibility] = useState(false)

  function toggleDialogFormVisibility () {
    setDialogFormVisibility(!isDialogFormVisible)
  }

  function updateNoteOnSubmit (values) {
    updateFirebaseValue(`users/${viewer.uid}/notes/${noteId}`, values)
  }

  useEffect(() => {
    onFirebaseValue(`users/${viewer.uid}/notes/${noteId}`, setNote)
  }, [])

  return (
    <div>
      <Typography component={Link} to='../' variant='subheading' gutterBottom>
        <Trans>Back to notes list</Trans>
      </Typography>
      {note ? (
        <Paper className={classes.container}>
          <Grid
            container
            justify='space-between'
            wrap
            alignItems='center'
            spacing={16}
            className={classes.titleContainer}
          >
            <Grid item xs='auto'>
              <Typography component='h1' variant='title'>
                {note.title}
              </Typography>
            </Grid>
            <Grid item xs='auto'>
              <Button variant='outlined' onClick={toggleDialogFormVisibility}>
                <EditIcon className={classes.editIcon} />
                <Trans>Edit</Trans>
              </Button>
            </Grid>
          </Grid>
          <Divider />
          <div dangerouslySetInnerHTML={{ __html: note.content }} />
          <NoteDialogForm
            initialValues={{
              title: note.title,
              content: note.content
            }}
            isVisible={isDialogFormVisible}
            onClose={toggleDialogFormVisibility}
            onSubmit={updateNoteOnSubmit}
          />
        </Paper>
      ) : null}
    </div>
  )
})
