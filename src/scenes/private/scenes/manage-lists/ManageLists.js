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
import AddListDialogForm from '../../components/AddListDialogForm'

/**
 * Utils
 */
import { removeFirebaseValue, addFirebaseValue, updateFirebaseValue } from '../../../../services/firebase'
import type { FirebaseList, FirebaseViewer } from '../../../../services/utils/types'

type ManageListsProps = {|
  lists: Array<FirebaseList>,
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

  function updateList (listValue: FirebaseList, value) {
    updateFirebaseValue(`users/${viewer.uid}/lists/${listValue.id}`, value)
  }

  function removeList (listValue: FirebaseList) {
    removeFirebaseValue(`users/${viewer.uid}/lists/${listValue.id}`)
  }

  return (
    <div>
      <Typography component='h1' variant='h3' gutterBottom>
        <Trans>Manage lists</Trans>
      </Typography>

      {lists.length ? (
        <Paper>
          <List>
            {lists.map((list, i) => (
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
            Create a list
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
