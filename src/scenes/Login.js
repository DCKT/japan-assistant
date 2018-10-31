// @flow

import React, { useContext, useState } from 'react'
import { navigate } from '@reach/router'
import { UserContext } from '../App'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { FormattedMessage } from 'react-intl'
import Grid from '@material-ui/core/Grid'
import firebase from '../services/firebase'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import { useInput } from '../services/utils/hooks'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 4
  },
  textField: {
    width: 280
  }
})

export default withStyles(styles)(({ classes }) => {
  const userContext = useContext(UserContext)
  const emailInput = useInput('')
  const passwordInput = useInput('')
  const [error, setError] = useState(null)

  const onSubmit = e => {
    e.preventDefault()
    firebase
      .auth()
      .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
      .catch(setError)
  }

  return (
    <Grid container spacing={24} justify="center" alignItems="center" style={{ marginTop: 50 }}>
      <Grid item xs style={{ maxWidth: 400 }}>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h4" component="h1" style={{ marginBottom: 15 }}>
            <FormattedMessage id="loginTitle" />
          </Typography>

          {error ? (
            <Typography component="p" style={{ marginBottom: 15 }}>
              {error.message}
            </Typography>
          ) : null}

          <form onSubmit={onSubmit}>
            <div>
              <TextField
                id="outlined-name"
                label="Email"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                type="email"
                required
                {...emailInput}
              />
            </div>
            <div>
              <TextField
                id="outlined-name"
                label="Password"
                type="password"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                required
                {...passwordInput}
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <Button type="submit" variant="contained" color="primary" size="large">
                Login
              </Button>
            </div>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
})
