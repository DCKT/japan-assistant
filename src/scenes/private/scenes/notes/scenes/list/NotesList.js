// @flow

import React, { useState } from 'react'

/**
 * Components
 */
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'
import { Trans } from '@lingui/macro'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

/**
 * Utils
 */
import { withStyles } from '@material-ui/core/styles'

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

export default withStyles(styles)(({ classes }) => {
  const [isAddNoteDialogVisible, setAddNoteDialogVisibility] = useState(false)
  const [notesList, setNotesList] = useState([])

  function toggleAddNoteDialog () {
    setAddNoteDialogVisibility(!isAddNoteDialogVisible)
  }

  return (
    <div className={classes.pageContainer}>
      <div className={classes.noNoteContainer}>
        <img className={classes.picture} src={typeWriterPicture} alt={<Trans>Write your first note</Trans>} />
        <Typography component='h3' variant='h4' gutterBottom>
          <Trans>You have no note yet</Trans>
        </Typography>
        <Button variant='contained' color='primary'>
          <Trans>Write your first note !</Trans>
        </Button>
      </div>
      {notesList.length ? (
        <Tooltip title={<Trans>Add a new note</Trans>}>
          <Button variant='fab' color='primary' aria-label='Add' className={classes.fab} onClick={toggleAddNoteDialog}>
            <AddIcon />
          </Button>
        </Tooltip>
      ) : null}
    </div>
  )
})
