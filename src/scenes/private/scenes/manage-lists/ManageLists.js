// @flow

import React from 'react'

/**
 * Components
 */
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import { Trans } from '@lingui/macro'
import ListItem from './components/ListItem'

import type { FirebaseList } from '../../../../services/utils/types'

type ManageListsProps = {|
  lists: Array<FirebaseList>
|}

export default ({ lists }: ManageListsProps) => {
  return (
    <div>
      <Typography component='h1' variant='h3' gutterBottom>
        <Trans>Manage lists</Trans>
      </Typography>
      <Paper>
        <List>
          {lists.map((list, i) => (
            <ListItem key={i} lists={lists} value={list} />
          ))}
        </List>
      </Paper>
    </div>
  )
}
