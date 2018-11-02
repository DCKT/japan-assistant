import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { Router, Link } from '@reach/router'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import NavigationBar from '../components/NavigationBar'
import Word from '../components/Word'
import AddWordDialog from '../components/AddWordDialog'

import firebase from '../services/firebase'

const styles = theme => ({
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 30
  }
})

export default React.memo(
  withStyles(styles)(({ classes }) => {
    const [isAddWordDialogVisible, setIsAddWordDialogVisible] = useState(false)
    const [words, setWords] = useState(null)

    useEffect(
      () => {
        firebase
          .database()
          .ref('words')
          .on('value', snap => {
            setWords(snap.val())
          })
      },
      [words]
    )

    return (
      <div>
        <NavigationBar onLogout={() => firebase.auth().signOut()} />
        <div style={{ padding: 15 }}>
          {words ? (
            <Grid container spacing={24}>
              {Object.keys(words).map((word, i) => (
                <Grid item xs={3} key={i}>
                  <Word word={word} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container alignItems='center' justify='center' spacing={24}>
              <Grid item xs={5}>
                <p>No words yet</p>
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
          <AddWordDialog isVisible={isAddWordDialogVisible} onClose={() => setIsAddWordDialogVisible(false)} />
        </div>
      </div>
    )
  })
)
