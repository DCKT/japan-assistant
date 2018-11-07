import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { Trans } from '@lingui/macro'

import Word from '../components/Word'
import AddWordDialog from '../components/AddWordDialog'
import AddCategoryDialog from '../components/AddCategoryDialog'
import AuthenticatedNavigation from '../components/AuthenticatedNavigation'
import firebase from '../services/firebase'

const styles = theme => ({
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 30
  }
})

export default React.memo(
  withStyles(styles)(({ classes, viewer }) => {
    const [isAddWordDialogVisible, setIsAddWordDialogVisible] = useState(false)
    const [isAddCategoryDialogVisible, setIsAddCategoryDialogVisible] = useState(false)
    const [words, setWords] = useState(undefined)

    useEffect(() => {
      firebase
        .database()
        .ref(`users/${viewer.uid}/words`)
        .on('value', snap => {
          setWords(snap.val())
        })
    }, [])

    return (
      <AuthenticatedNavigation
        onLogout={() => firebase.auth().signOut()}
        categories={[]}
        showCategoryDialog={() => setIsAddCategoryDialogVisible(true)}
      >
        {words === undefined ? null : words ? (
          <Grid container spacing={24} wrap='wrap'>
            {Object.keys(words).map((word, i) => (
              <Grid item xs={12} sm={10} md={4} lg={3} key={i}>
                <Word word={words[word]} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container alignItems='center' justify='center' spacing={24}>
            <Grid item xs={5}>
              <p>No words yet</p>
              <Button variant='contained' color='primary'>
                <Trans>Add my first word</Trans>
              </Button>
            </Grid>
          </Grid>
        )}
        <Button
          variant='fab'
          color='primary'
          aria-label='Add'
          className={classes.fab}
          onClick={() => setIsAddWordDialogVisible(true)}
        >
          <AddIcon />
        </Button>
        <AddWordDialog
          viewer={viewer}
          isVisible={isAddWordDialogVisible}
          onClose={() => setIsAddWordDialogVisible(false)}
        />
        <AddCategoryDialog
          isVisible={isAddCategoryDialogVisible}
          onClose={() => setIsAddCategoryDialogVisible(false)}
        />
      </AuthenticatedNavigation>
    )
  })
)
