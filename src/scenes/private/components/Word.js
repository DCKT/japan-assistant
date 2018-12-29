// @flow

import React, { useState } from 'react'

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
import Grid from '@material-ui/core/Grid'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye'
import { Trans } from '@lingui/macro'

/**
 * Utils
 */
import { withStyles } from '@material-ui/core/styles'
import type { FirebaseWord, FirebaseLists } from '../../../services/utils/types.js'

const styles = theme => ({
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
  list: {
    marginBottom: theme.spacing.unit
  }
})

type WordProps = {|
  classes: Object,
  word: FirebaseWord,
  onDeleteButtonClick: Function,
  onEditionButtonClick: Function,
  onShowTraductionButtonClick: Function,
  lists: FirebaseLists
|}

export default withStyles(styles)(
  ({ classes, word, lists, onDeleteButtonClick, onEditionButtonClick, onShowTraductionButtonClick }: WordProps) => {
    const [isTraductionVisible, setTraductionVisbility] = useState(false)

    return (
      <Card className={classes.card}>
        <CardContent style={{ minHeight: 150 }}>
          {lists && word.list ? (
            <Grid container wrap spacing={8} className={classes.list}>
              {word.list.map(
                (id, index) =>
                  lists[id] ? (
                    <Grid item key={id} xs='auto'>
                      <Typography className={classes.title} color='textSecondary'>
                        {lists[id].name}
                      </Typography>
                    </Grid>
                  ) : null
              )}
            </Grid>
          ) : null}

          <Typography variant='h4' component='h2'>
            {word.kanji || word.kana}
          </Typography>
          {word.kanji ? (
            <Typography className={classes.pos} color='textSecondary'>
              {word.kana}
            </Typography>
          ) : null}
          {isTraductionVisible ? <Typography component='em'>{word.name}</Typography> : null}
          <Typography component='p'>{word.note}</Typography>
        </CardContent>
        <CardActions>
          <Tooltip title={<Trans>Show traduction</Trans>}>
            <IconButton
              aria-label={<Trans>Show traduction</Trans>}
              onClick={() => setTraductionVisbility(!isTraductionVisible)}
            >
              <RemoveRedEyeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={<Trans>Edit</Trans>}>
            <IconButton aria-label={<Trans>Edit</Trans>} onClick={onEditionButtonClick}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={<Trans>Remove</Trans>}>
            <IconButton aria-label={<Trans>Delete</Trans>} onClick={onDeleteButtonClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    )
  }
)
