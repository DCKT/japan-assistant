// @flow

import React, { useState } from 'react'

/**
 * Components
 */
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'
import { Trans } from '@lingui/macro'
import Typography from '@material-ui/core/Typography'
import NoteDialogForm from '../../components/note-dialog-form'
import NotesList from './components/notes-list'

/**
 * Utils
 */
import { withStyles } from '@material-ui/core/styles'
import { addFirebaseValue } from '../../../../../../services/firebase'
import type { FirebaseNotesList, FirebaseViewer, FirebaseLists } from '../../../../../../services/utils/types'

/**
 * Assets
 */
import typeWriterPicture from './assets/typewriter.svg'

const styles = theme => ({
  fab: {
    position: 'fixed',
    right: 30,
    bottom: 30
  },
  noNoteContainer: {
    maxWidth: 550,
    margin: 'auto',
    marginTop: theme.spacing.unit * 7,
    padding: theme.spacing.unit * 4,
    textAlign: 'center'
  },
  picture: {
    maxWidth: 400
  }
})

type NotesHomeProps = {|
  classes: Object,
  viewer: FirebaseViewer,
  notes: ?FirebaseNotesList,
  lists: FirebaseLists
|}

export default withStyles(styles)(({ classes, viewer, notes, lists }: NotesHomeProps) => {
  const [isAddNoteDialogVisible, setAddNoteDialogVisibility] = useState(false)

  function toggleAddNoteDialog () {
    setAddNoteDialogVisibility(!isAddNoteDialogVisible)
  }

  function onNoteDialogFormSubmit (values) {
    const id = Date.now().toString()

    addFirebaseValue(`users/${viewer.uid}/notes/${id}`, {
      id,
      ...values,
      list: values.list ? values.list.map(option => option.value) : null
    })
  }

  return (
    <div className={classes.pageContainer}>
      {notes === undefined ? null : notes ? (
        <React.Fragment>
          <Typography component='h1' variant='h3' gutterBottom>
            <Trans>Notes</Trans>
          </Typography>
          <NotesList notes={notes} />
          <Tooltip title={<Trans>Add a new note</Trans>}>
            <Button
              variant='fab'
              color='primary'
              aria-label='Add'
              className={classes.fab}
              onClick={toggleAddNoteDialog}
            >
              <AddIcon />
            </Button>
          </Tooltip>
        </React.Fragment>
      ) : (
        <div className={classes.noNoteContainer}>
          <img className={classes.picture} src={typeWriterPicture} alt={<Trans>Write your first note</Trans>} />
          <Typography component='h3' variant='h4' gutterBottom>
            <Trans>You have no notes yet</Trans>
          </Typography>
          <Button variant='contained' color='primary' onClick={toggleAddNoteDialog}>
            <Trans>Write your first note !</Trans>
          </Button>
        </div>
      )}

      <NoteDialogForm
        lists={lists}
        isVisible={isAddNoteDialogVisible}
        onClose={toggleAddNoteDialog}
        onSubmit={onNoteDialogFormSubmit}
      />
    </div>
  )
})
