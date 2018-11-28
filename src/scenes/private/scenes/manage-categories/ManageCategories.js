// @flow

import React from 'react'

/**
 * Components
 */
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'
import { Trans } from '@lingui/macro'

export default () => {
  return (
    <div>
      <Typography component='h1' variant='h3' gutterBottom>
        <Trans>Manage categories</Trans>
      </Typography>
      <Paper>
        <List>
          <ListItem>
            <ListItemText primary='test' />
            <ListItemSecondaryAction>
              <Tooltip title={<Trans>Edit</Trans>}>
                <IconButton aria-label={<Trans>Edit</Trans>}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={<Trans>Delete</Trans>}>
                <IconButton aria-label={<Trans>Delete</Trans>}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>
    </div>
  )
}
