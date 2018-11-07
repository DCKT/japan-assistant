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

type AddWordDialogProps = {|
  isVisible: boolean,
  onClose: Function,
  viewer: Object
|}

function AddWordDialog ({ isVisible, onClose, viewer }: AddWordDialogProps) {
  const traductionInput = useInput('')
  const kanaInput = useInput('')
  const noteInput = useInput('')
  const typeInput = useInput('')
  const kanjiInput = useInput('')
  const categoryInput = useInput('')

  function onSubmit () {
    const id = Date.now()
    firebase
      .database()
      .ref(`users/${viewer.uid}/words/${id}`)
      .set({
        id,
        name: traductionInput.value,
        kana: kanaInput.value,
        note: noteInput.value,
        type: typeInput.value,
        category: categoryInput.value,
        kanji: kanjiInput.value
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
          id='traduction'
          label={<Trans>Traduction</Trans>}
          type='text'
          fullWidth
          {...traductionInput}
        />
        <TextField
          autoFocus
          margin='dense'
          id='traduction'
          label={<Trans>Kanji</Trans>}
          type='text'
          fullWidth
          {...kanjiInput}
        />
        <TextField
          autoFocus
          margin='dense'
          id='kana'
          label={<Trans>Kana</Trans>}
          type='text'
          fullWidth
          {...kanaInput}
        />
        <TextField
          autoFocus
          margin='dense'
          id='category'
          label={<Trans>Category</Trans>}
          type='text'
          fullWidth
          {...categoryInput}
        />
        <TextField
          autoFocus
          margin='dense'
          id='note'
          label={<Trans>Note</Trans>}
          type='text'
          fullWidth
          multiline
          variant='outlined'
          {...noteInput}
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
