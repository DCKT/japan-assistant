// @flow

import React from 'react'

/**
 * Components
 */
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import { Trans } from '@lingui/macro'
import CategoryListItem from './components/CategoryListItem'

export default ({ categories }) => {
  console.log(categories)
  return (
    <div>
      <Typography component='h1' variant='h3' gutterBottom>
        <Trans>Manage categories</Trans>
      </Typography>
      <Paper>
        <List>
          {categories.map((category, i) => (
            <CategoryListItem key={i} categories={categories} value={category} />
          ))}
        </List>
      </Paper>
    </div>
  )
}
