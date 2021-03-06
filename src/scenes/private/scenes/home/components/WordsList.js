// @flow

import React from 'react'

/**
 * Components
 */
import Grid from '@material-ui/core/Grid'
import WordCard from '../../../components/WordCard'

/**
 * Utils
 */
import type { FirebaseWord } from '../../../../../services/utils/types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  gridItem: {
    [theme.breakpoints.down('xs')]: {
      margin: 'auto'
    }
  }
})

type WordsListProps = {|
  words: Array<FirebaseWord>,
  onWordDelete: FirebaseWord => void,
  onWordEdit: FirebaseWord => void
|}

export default React.memo(
  withStyles(styles)(({ words, onWordDelete, lists, onWordEdit, classes }: WordsListProps) => {
    return (
      <Grid container wrap='wrap' spacing={16}>
        {words.map((word, i) => (
          <Grid item xs={10} sm={6} md={4} lg={3} key={i} className={classes.gridItem}>
            <WordCard
              word={word}
              lists={lists}
              onDeleteButtonClick={onWordDelete ? () => onWordDelete(word) : null}
              onEditionButtonClick={onWordEdit ? () => onWordEdit(word) : null}
            />
          </Grid>
        ))}
      </Grid>
    )
  })
)
