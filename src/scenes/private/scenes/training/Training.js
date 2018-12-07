// @flow

import React, { useState } from 'react'

/**
 * Components
 */
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { Trans } from '@lingui/macro'
import SearchListsForm from '../../components/SearchListsForm'
import Button from '@material-ui/core/Button'

/**
 * Utils
 */
import containerPicture from './assets/container.svg'
import { withStyles } from '@material-ui/core/styles'
import { map } from 'lodash'

const styles = theme => ({
  paperContainer: {
    maxWidth: 500,
    margin: 'auto',
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4
  },
  containerPicture: {
    maxWidth: 350,
    marginBottom: theme.spacing.unit * 2
  },
  searchContainer: {
    maxWidth: 350,
    margin: 'auto',
    textAlign: 'left',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
})

export default withStyles(styles)(({ classes, viewer, lists, words }) => {
  const [selectedLists, setSelectedLists] = useState([])

  return (
    <div>
      <Typography component='h1' variant='h1' gutterBottom>
        <Trans>Training</Trans>
      </Typography>

      <Paper className={classes.paperContainer}>
        <img src={containerPicture} className={classes.containerPicture} />
        <Typography component='h2' variant='title'>
          <Trans>Select the list you want to train</Trans>
        </Typography>
        <div className={classes.searchContainer}>
          <SearchListsForm
            isMulti
            options={map(lists, list => ({
              label: list.name,
              value: list
            }))}
            onChange={values => setSelectedLists(values)}
          />
        </div>
        {selectedLists.length ? (
          <Button variant='contained' color='primary'>
            <Trans>Start training !</Trans>
          </Button>
        ) : null}
      </Paper>
    </div>
  )
})
