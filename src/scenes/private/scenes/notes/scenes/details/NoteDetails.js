// @flow

import React, { useEffect, useState } from 'react'

/**
 * Components
 */
import { Link, navigate } from '@reach/router'
import { Trans } from '@lingui/macro'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Divider from '@material-ui/core/Divider'
import EditIcon from '@material-ui/icons/Edit'
import NoteDialogForm from '../../components/note-dialog-form'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ActionConfirmationDialog from '../../../../components/ActionConfirmationDialog'
import WordsList from '../../../home/components/WordsList'
/**
 * Utils
 */
import { onFirebaseValue, updateFirebaseValue, removeFirebaseValue } from '../../../../../../services/firebase'
import type { FirebaseViewer, FirebaseNoteID } from '../../../../../../services/utils/types'
import { withStyles } from '@material-ui/core/styles'
import { filter } from 'lodash'

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 2
  },
  titleContainer: {
    paddingBottom: theme.spacing.unit * 2
  },
  associatedCards: {
    marginTop: theme.spacing.unit * 3
  }
})

type NoteDetailsProps = {|
  viewer: FirebaseViewer,
  noteId: FirebaseNoteID,
  classes: Object
|}

export default withStyles(styles)(({ classes, noteId, viewer, words, lists }: NoteDetailsProps) => {
  const [note, setNote] = useState(null)
  const [menuAnchor, setMenuAnchor] = useState(false)
  const [isDialogFormVisible, setDialogFormVisibility] = useState(false)
  const [isActionConfirmDialogVisible, setActionConfirmDialogVisibility] = useState(false)

  function toggleDialogFormVisibility () {
    setDialogFormVisibility(!isDialogFormVisible)
  }

  function closeMenu () {
    setMenuAnchor(null)
  }

  function updateNoteOnSubmit (values) {
    updateFirebaseValue(`users/${viewer.uid}/notes/${noteId}`, values)
  }

  function removeNoteOnConfirm () {
    navigate('/app/notes', { replace: true })
    removeFirebaseValue(`users/${viewer.uid}/notes/${noteId}`)
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
        <React.Fragment>
          <Paper className={classes.container}>
            <Grid container justify='space-between' alignItems='center' spacing={16} className={classes.titleContainer}>
              <Grid item xs='auto'>
                <Typography component='h1' variant='title'>
                  {note.title}
                </Typography>
              </Grid>
              <Grid item xs='auto'>
                <IconButton
                  aria-label='More'
                  aria-owns={menuAnchor ? 'simple-menu' : undefined}
                  aria-haspopup='true'
                  onClick={e => setMenuAnchor(e.target)}
                >
                  <MoreVertIcon />
                </IconButton>

                <Menu id='long-menu' anchorEl={menuAnchor} open={menuAnchor} onClose={closeMenu}>
                  <MenuItem
                    onClick={() => {
                      closeMenu()
                      toggleDialogFormVisibility()
                    }}
                  >
                    <ListItemIcon>
                      <EditIcon />
                    </ListItemIcon>
                    <Typography variant='inherit'>
                      <Trans>Edit</Trans>
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      closeMenu()
                      setActionConfirmDialogVisibility(true)
                    }}
                  >
                    <ListItemIcon>
                      <DeleteIcon />
                    </ListItemIcon>
                    <Typography variant='inherit'>
                      <Trans>Remove</Trans>
                    </Typography>
                  </MenuItem>
                </Menu>
              </Grid>
            </Grid>
            <Divider />
            <div dangerouslySetInnerHTML={{ __html: note.content }} />
            <NoteDialogForm
              initialValues={{
                title: note.title,
                content: note.content,
                list:
                  note.list && lists
                    ? filter(lists, list => note.list.includes(list.id)).map(list => ({
                      label: list.name,
                      value: list.id
                    }))
                    : null
              }}
              isVisible={isDialogFormVisible}
              onClose={toggleDialogFormVisibility}
              onSubmit={updateNoteOnSubmit}
              lists={lists}
            />
          </Paper>

          {words && lists && note.list ? (
            <div className={classes.associatedCards}>
              <Typography component='h5' variant='h5' gutterBottom>
                <Trans>Associated cards</Trans>
              </Typography>
              <WordsList
                lists={lists}
                words={filter(words, word => word.list && word.list.some(wordListId => note.list.includes(wordListId)))}
              />
            </div>
          ) : null}
        </React.Fragment>
      ) : null}

      <ActionConfirmationDialog
        isVisible={isActionConfirmDialogVisible}
        onCancel={() => {
          setActionConfirmDialogVisibility(false)
        }}
        onConfirm={removeNoteOnConfirm}
      />
    </div>
  )
})
