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
import { Link } from '@reach/router'

/**
 * Utils
 */
import { withStyles } from '@material-ui/core/styles'
import firebase, { firebaseGoogleSignIn, firebaseTwitterSignIn } from '../../../../services/firebase'
import { useInput } from '../../../../services/utils/hooks'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3
  },
  textField: {
    width: 280
  },
  socialContainer: {
    borderLeft: '1px solid #ccc',
    marginLeft: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
})

export default withStyles(styles)(({ classes }) => {
  const emailInput = useInput('')
  const passwordInput = useInput('')
  const passwordConfirmInput = useInput('')
  const [error, setError] = useState(null)

  const onSubmit = e => {
    e.preventDefault()

    if (passwordInput !== passwordConfirmInput) {
      setError({
        message: <Trans>Password missmatch</Trans>
      })
      return
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
      .catch(setError)
  }

  return (
    <Grid container spacing={24} justify='center' alignItems='center' style={{ paddingTop: 50 }}>
      <Grid item xs={12} style={{ maxWidth: 700 }}>
        <Paper className={classes.root} elevation={1}>
          <Typography variant='h4' component='h1' gutterBottom style={{ textAlign: 'center' }}>
            <Trans>Register</Trans>
          </Typography>

          <Grid container spacing={8}>
            <Grid item xs={6}>
              {error ? (
                <Typography component='p' gutterBottom>
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
                <div>
                  <TextField
                    id='passwordConfirm'
                    label={<Trans>Confirm password</Trans>}
                    type='password'
                    margin='normal'
                    variant='outlined'
                    required
                    fullWidth
                    {...passwordConfirmInput}
                  />
                </div>
                <div style={{ marginTop: 20 }}>
                  <Button type='submit' variant='contained' color='primary' size='large' fullWidth>
                    <Trans>Register</Trans>
                  </Button>
                </div>
              </form>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.socialContainer}>
                <Typography component='p' variant='overline' style={{ textAlign: 'center' }}>
                  <Trans>Or use social login</Trans>
                </Typography>
                <Button variant='contained' fullWidth onClick={firebaseGoogleSignIn}>
                  Google login
                </Button>
                <br />
                <Button variant='contained' fullWidth onClick={firebaseTwitterSignIn}>
                  Twitter login
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>

        <Typography component={Link} to='/login' style={{ marginTop: 15 }}>
          <Trans>Already registered ? Login</Trans>
        </Typography>
      </Grid>
    </Grid>
  )
})
