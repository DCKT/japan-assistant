// @flow

import React from 'react'

/**
 * Components
 */
import Grid from '@material-ui/core/Grid'
import Word from '../../../components/Word'

/**
 * Utils
 */
import type { FirebaseWord } from '../../../../../services/utils/types'

type WordsListProps = {|
  words: Array<FirebaseWord>,
  onWordDelete: FirebaseWord => void,
  onWordEdit: FirebaseWord => void
|}

export default React.memo(({ words, onWordDelete, onWordEdit }: WordsListProps) => {
  return (
    <Grid container wrap='wrap' spacing={16}>
      {words.map((word, i) => (
        <Grid item xs={6} md={3} key={i}>
          <Word
            word={word}
            onDeleteButtonClick={() => onWordDelete(word)}
            onEditionButtonClick={() => onWordEdit(word)}
          />
        </Grid>
      ))}
    </Grid>
  )
})
