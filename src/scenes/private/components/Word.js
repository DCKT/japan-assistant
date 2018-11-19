// @flow

import React from 'react'

/**
 * Components
 */
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'
import { Trans } from '@lingui/macro'

/**
 * Utils
 */
import { withStyles } from '@material-ui/core/styles'
import type { FirebaseWord } from '../../../services/utils/types.js'

const styles = {
  card: {
    position: 'relative'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}

type WordProps = {|
  classes: Object,
  word: FirebaseWord,
  onDeleteButtonClick: Function,
  onEditionButtonClick: Function
|}

function Word ({ classes, word, onDeleteButtonClick, onEditionButtonClick }: WordProps) {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color='textSecondary' gutterBottom>
          {word.category ? word.category.name : null}
        </Typography>
        <Typography variant='h4' component='h2'>
          {word.kanji || word.kana}
        </Typography>
        {word.kanji ? (
          <Typography className={classes.pos} color='textSecondary'>
            {word.kana}
          </Typography>
        ) : null}
        <Typography component='p'>{word.note}</Typography>
      </CardContent>
      <CardActions>
        <Tooltip title={<Trans>Edit</Trans>}>
          <IconButton aria-label={<Trans>Edit</Trans>} onClick={onEditionButtonClick}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={<Trans>Remove</Trans>}>
          <IconButton aria-label={<Trans>Edit</Trans>} onClick={onDeleteButtonClick}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  )
}

export default withStyles(styles)(Word)
