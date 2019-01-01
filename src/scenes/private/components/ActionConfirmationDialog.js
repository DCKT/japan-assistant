// @flow

import React from 'react'

/**
 * Components
 */
import { Trans } from '@lingui/macro'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

type ActionConfirmationDialogProps = {|
  onCancel: Function,
  onConfirm: Function,
  isVisible: boolean
|}

export default ({ onCancel, onConfirm, isVisible }: ActionConfirmationDialogProps) => (
  <Dialog
    open={isVisible}
    disableBackdropClick
    disableEscapeKeyDown
    maxWidth='xs'
    aria-labelledby='confirmation-dialog-title'
  >
    <DialogTitle id='confirmation-dialog-title'>
      <Trans>Confirm this action</Trans>
    </DialogTitle>
    <DialogContent>
      <Typography component='p'>
        <Trans>Are you sure about this action ?</Trans>
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color='primary'>
        <Trans>Cancel</Trans>
      </Button>
      <Button onClick={onConfirm} color='primary'>
        <Trans>OK</Trans>
      </Button>
    </DialogActions>
  </Dialog>
)
