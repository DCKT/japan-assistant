// @flow

import React from 'react'

/**
 * Components
 */
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Link } from '@reach/router'
import Button from '@material-ui/core/Button'

export default () => (
  <div style={{ width: '100%', height: '100%', background: 'rgba(24,24,24, 0.3)' }}>
    <Grid container justify='center' alignItems='center' style={{ height: '100%' }}>
      <Grid item xs={10} md={6} lg={4}>
        <Paper elevation={1} style={{ padding: 20, textAlign: 'center' }}>
          <Typography component='h1' variant='h3' gutterBottom>
            Japan Assistant
          </Typography>
          <Typography component='p' variant='subheading' color='textSecondary'>
            Keep your japanese words everywhere
          </Typography>
          <div style={{ marginTop: 30 }}>
            <Button color='' component={Link} to='/login'>
              Login
            </Button>

            <Button color='primary' variant='contained' component={Link} to='/register'>
              Register
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  </div>
)
