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
import logoSvg from '../../assets/logo.svg'

/**
 * Utils
 */
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    background: '#5c6bc0'
  },
  paperRoot: {
    padding: theme.spacing.unit * 3,
    textAlign: 'center'
  },
  actionsRoot: {
    marginTop: theme.spacing.unit * 3
  },
  logoImg: {
    marginBottom: theme.spacing.unit * 2
  }
})

export default withStyles(styles)(({ classes }) => {
  return (
    <div className={classes.root}>
      <Grid container justify='center' alignItems='center' style={{ height: '100%' }}>
        <Grid item xs={10} md={6} lg={4}>
          <Paper elevation={1} className={classes.paperRoot}>
            <img src={logoSvg} alt='Japan Assistant logo' className={classes.logoImg} />
            <Typography component='h1' variant='h3' gutterBottom>
              Japan Assistant
            </Typography>
            <Typography component='p' variant='subheading' color='textSecondary'>
              Keep your japanese words everywhere
            </Typography>
            <div className={classes.actionsRoot}>
              <Button color='default' component={Link} to='/login'>
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
})
