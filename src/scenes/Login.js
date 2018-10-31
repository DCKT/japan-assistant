// @flow

import React, { useContext } from 'react'
import { navigate } from '@reach/router'
import { UserContext } from '../App'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import firebase from '../services/firebase'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
})

export default withStyles(styles)(({ classes }) => {
  const userContext = useContext(UserContext)

  const logMe = () => {
    userContext.setUser('toto')
    firebase
      .auth()
      .signInWithEmailAndPassword('test@test.fr', 'testtest')
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // ...
      })
    // navigate('/app')
  }

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          This is a sheet of paper.
        </Typography>
        <Typography component="p">
          Paper can be used to build surface or other elements for your application.
        </Typography>
        <button onClick={logMe}>logme</button>
      </Paper>
    </div>
  )
})
