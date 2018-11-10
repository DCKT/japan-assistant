// @flow

import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

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
  },
  deleteButton: {
    position: 'absolute',
    right: 2,
    top: 2
  }
}

type WordProps = {|
  classes: Object,
  word: {|
    traduction: string,
    kana: string,
    kanji: ?string,
    note: ?string,
    category: ?string,
    type: ?string
  |},
  onDeleteButtonClick: Function
|}

function Word ({ classes, word, onDeleteButtonClick }: WordProps) {
  return (
    <Card className={classes.card}>
      <IconButton className={classes.deleteButton} aria-label='Delete' onClick={onDeleteButtonClick}>
        <DeleteIcon />
      </IconButton>
      <CardContent>
        <Typography className={classes.title} color='textSecondary' gutterBottom>
          {word.category}
        </Typography>
        <Typography variant='h4' component='h2'>
          {word.kanji}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {word.kana}
        </Typography>
        <Typography component='p'>{word.note}</Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>details ??</Button>
      </CardActions>
    </Card>
  )
}

export default withStyles(styles)(Word)
