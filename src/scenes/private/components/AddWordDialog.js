// @flow

import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Trans } from '@lingui/macro'

import { useInput } from '../../../services/utils/hooks'
import { addFirebaseValue, updateFirebaseValue } from '../../../services/firebase'

type AddWordDialogProps = {|
  isVisible: boolean,
  onClose: Function,
  viewer: Object,
  editedWord: ?Object
|}

function AddWordDialog ({ isVisible, onClose, viewer, editedWord }: AddWordDialogProps) {
  const traductionInput = useInput(editedWord ? editedWord.traduction : '')
  const kanaInput = useInput(editedWord ? editedWord.kana : '')
  const noteInput = useInput(editedWord ? editedWord.note : '')
  const typeInput = useInput(editedWord ? editedWord.type : '')
  const kanjiInput = useInput(editedWord ? editedWord.kanji : '')
  const categoryInput = useInput(editedWord ? editedWord.category : '')

  function onSubmit () {
    if (editedWord) {
      onEdit()
    } else {
      onCreate()
    }
  }

  function onCreate () {
    const id = Date.now()

    addFirebaseValue(`users/${viewer.uid}/words/${id}`, {
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

  function onEdit () {
    updateFirebaseValue(`users/${viewer.uid}/words/${editedWord.id}`, {
      name: traductionInput.value,
      kana: kanaInput.value,
      note: noteInput.value,
      type: typeInput.value,
      category: categoryInput.value,
      kanji: kanjiInput.value
    })
  }

  return (
    <Dialog open={isVisible} onClose={onClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>
        {editedWord ? <Trans>Update {editedWord.name}</Trans> : <Trans>Add a new word</Trans>}
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
        <TextField margin='dense' id='traduction' label={<Trans>Kanji</Trans>} type='text' fullWidth {...kanjiInput} />
        <TextField margin='dense' id='kana' label={<Trans>Kana</Trans>} type='text' fullWidth {...kanaInput} />
        <TextField
          margin='dense'
          id='category'
          label={<Trans>Category</Trans>}
          type='text'
          fullWidth
          {...categoryInput}
        />
        <TextField
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
          {editedWord ? <Trans>Update</Trans> : <Trans>Add</Trans>}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddWordDialog
