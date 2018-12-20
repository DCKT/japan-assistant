// @flow

import React, { useState } from 'react'

/**
 * Components
 */
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { Trans } from '@lingui/macro'
import ListItem from './components/ListItem'
import Grid from '@material-ui/core/Grid'
import AddListDialogForm from '../../components/AddListDialogForm'

/**
 * Utils
 */
import { map } from 'lodash'
import { removeFirebaseValue, addFirebaseValue, updateFirebaseValue } from '../../../../services/firebase'
import type { FirebaseListItem, FirebaseViewer } from '../../../../services/utils/types'

type ManageListsProps = {|
  lists: Object,
  viewer: FirebaseViewer
|}

export default ({ lists, viewer }: ManageListsProps) => {
  const [isAddListDialogVisible, setIsAddListDialogVisible] = useState(false)

  function toggleListDialog () {
    setIsAddListDialogVisible(!isAddListDialogVisible)
  }

  function addListOnSubmit (values) {
    const id = Date.now()

    addFirebaseValue(`users/${viewer.uid}/lists/${id}`, {
      id,
      name: values.name
    })
  }

  function updateList (listValue: FirebaseListItem, value) {
    updateFirebaseValue(`users/${viewer.uid}/lists/${listValue.id}`, value)
  }

  function removeList (listValue: FirebaseListItem) {
    removeFirebaseValue(`users/${viewer.uid}/lists/${listValue.id}`)
  }

  return (
    <div>
      <Grid container alignItems='center' spacing={16} style={{ marginBottom: 15 }}>
        <Grid item xs='auto'>
          <Typography component='h1' variant='h3'>
            <Trans>Manage lists</Trans>
          </Typography>
        </Grid>
        <Grid item xs={12} sm='auto'>
          {lists ? (
            <Button variant='contained' color='primary' onClick={toggleListDialog}>
              <Trans>Create a list</Trans>
            </Button>
          ) : null}
        </Grid>
      </Grid>

      {lists ? (
        <Paper>
          <List>
            {map(lists, (list, i) => (
              <ListItem key={i} lists={lists} value={list} onRemove={removeList} onUpdate={updateList} />
            ))}
          </List>
        </Paper>
      ) : (
        <React.Fragment>
          <Typography component='p'>
            <Trans>No list yet</Trans>
          </Typography>
          <Button variant='contained' color='primary' onClick={toggleListDialog}>
            <Trans>Create a list</Trans>
          </Button>
        </React.Fragment>
      )}

      {isAddListDialogVisible && typeof lists !== 'undefined' ? (
        <AddListDialogForm
          isVisible={isAddListDialogVisible}
          onClose={toggleListDialog}
          onSubmit={addListOnSubmit}
          lists={lists}
        />
      ) : null}
    </div>
  )
}
