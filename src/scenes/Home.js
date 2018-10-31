import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Router, Link } from '@reach/router'

import NavigationBar from '../components/NavigationBar'
import Word from '../components/Word'

import firebase from '../services/firebase'

export default () => (
  <>
    <NavigationBar onLogout={() => firebase.auth().signOut()} />
    <div style={{ padding: 15 }}>
      <Grid container spacing={24}>
        <Grid item xs={3}>
          <Word />
        </Grid>
        <Grid item xs={3}>
          <Word />
        </Grid>
        <Grid item xs={3}>
          <Word />
        </Grid>
        <Grid item xs={3}>
          <Word />
        </Grid>
        <Grid item xs={3}>
          <Word />
        </Grid>
        <Grid item xs={3}>
          <Word />
        </Grid>
        <Grid item xs={3}>
          <Word />
        </Grid>
        <Grid item xs={3}>
          <Word />
        </Grid>
        <Grid item xs={3}>
          <Word />
        </Grid>
      </Grid>
    </div>
  </>
)
