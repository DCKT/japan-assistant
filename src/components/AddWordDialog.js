// @flow

import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Trans } from '@lingui/macro'

import { useInput } from '../services/utils/hooks'
import firebase from '../services/firebase'

function AddWordDialog ({ isVisible, onClose }) {
  const nameInput = useInput('')

  function onSubmit () {
    const id = Date.now()
    firebase
      .database()
      .ref(`words/${id}`)
      .set({
        id,
        name: nameInput.value
      })
    onClose()
  }

  return (
    <Dialog open={isVisible} onClose={onClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>
        <Trans>Add a new word</Trans>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label={<Trans>Name</Trans>}
          type='text'
          fullWidth
          {...nameInput}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          <Trans>Cancel</Trans>
        </Button>
        <Button variant='contained' onClick={onSubmit} color='primary'>
          <Trans>Add</Trans>
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddWordDialog
