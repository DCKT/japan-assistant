// @flow

import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Trans } from '@lingui/macro'

import { useInput } from '../services/utils/hooks'
import firebase from '../services/firebase'

type AddCategoryDialogProps = {|
  isVisible: boolean,
  onClose: Function
|}

function AddCategoryDialog ({ isVisible, onClose }: AddCategoryDialogProps) {
  const categoryInput = useInput('')

  function onSubmit () {
    const id = Date.now()
    firebase
      .database()
      .ref(`category/${id}`)
      .set({
        id,
        name: categoryInput.value
      })
    onClose()
  }

  return (
    <Dialog open={isVisible} onClose={onClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>
        <Trans>Add a new category</Trans>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='category'
          label={<Trans>Name</Trans>}
          type='text'
          fullWidth
          {...categoryInput}
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

export default AddCategoryDialog
