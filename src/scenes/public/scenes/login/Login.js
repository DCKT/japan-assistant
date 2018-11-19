// @flow

import React, { useState } from 'react'

/**
 * Components
 */
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Trans } from '@lingui/macro'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Link } from '@reach/router'

/**
 * Utils
 */
import { withStyles } from '@material-ui/core/styles'
import firebase from '../../../../services/firebase'
import { useInput } from '../../../../services/utils/hooks'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 4
  },
  textField: {
    width: 280
  }
})

export default React.memo(
  withStyles(styles)(({ classes }) => {
    const [isLoading, setIsLoading] = useState(false)
    const emailInput = useInput('')
    const passwordInput = useInput('')
    const [error, setError] = useState(null)

    const onSubmit = e => {
      e.preventDefault()
      setIsLoading(true)
      firebase
        .auth()
        .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .catch(err => {
          setError(err)
          setIsLoading(false)
        })
    }

    return (
      <Grid container spacing={24} justify='center' alignItems='center' style={{ marginTop: 50 }}>
        <Grid item xs style={{ maxWidth: 400 }}>
          <Paper className={classes.root} elevation={1}>
            <Typography variant='h4' component='h1' style={{ marginBottom: 15 }}>
              <Trans>Connexion</Trans>
            </Typography>

            {error ? (
              <Typography component='p' style={{ marginBottom: 15 }}>
                {error.message}
              </Typography>
            ) : null}

            <form onSubmit={onSubmit}>
              <div>
                <TextField
                  id='email'
                  label={<Trans>Email</Trans>}
                  margin='normal'
                  variant='outlined'
                  type='email'
                  name='email'
                  fullWidth
                  required
                  {...emailInput}
                />
              </div>
              <div>
                <TextField
                  id='password'
                  label={<Trans>Password</Trans>}
                  type='password'
                  margin='normal'
                  variant='outlined'
                  required
                  fullWidth
                  {...passwordInput}
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <Button type='submit' variant='contained' color='primary' size='large' fullWidth disabled={isLoading}>
                  {isLoading ? <CircularProgress size={28} className={classes.fabProgress} /> : <Trans>Login</Trans>}
                </Button>
              </div>
            </form>
          </Paper>
          <Typography component={Link} to='/register' style={{ marginTop: 15 }}>
            <Trans>New ? Create an account</Trans>
          </Typography>
        </Grid>
      </Grid>
    )
  })
)
