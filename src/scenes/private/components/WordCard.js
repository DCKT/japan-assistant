// @flow

import React, { useState } from 'react'

/**
 * Components
 */
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import InfoIcon from '@material-ui/icons/Info'
import { Trans } from '@lingui/macro'
import Chip from '@material-ui/core/Chip'
import ListItemIcon from '@material-ui/core/ListItemIcon'

/**
 * Utils
 */
import { withStyles } from '@material-ui/core/styles'
import type { FirebaseWord, FirebaseLists } from '../../../services/utils/types.js'

const styles = theme => ({
  cardContent: {
    textAlign: 'center',
    padding: theme.spacing.unit * 3,
    height: '320px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'relative',
    zIndex: 0
  },
  kanji: {
    fontSize: 60
  },
  smallerKanji: {
    fontSize: 44
  },
  kana: {
    fontSize: 32
  },
  iconButtonMenu: { position: 'absolute', right: theme.spacing.unit, top: theme.spacing.unit },
  traduction: {
    fontSize: 18,
    marginTop: theme.spacing.unit * 2
  },
  noteTooltip: {
    position: 'absolute',
    left: theme.spacing.unit,
    top: theme.spacing.unit,
    color: 'rgba(24,24,24, 0.5)'
  },
  customNoteTooltip: {
    fontSize: 16
  }
})

type WordProps = {|
  classes: Object,
  word: FirebaseWord,
  onDeleteButtonClick?: Function,
  onEditionButtonClick?: Function,
  lists: FirebaseLists
|}

export default withStyles(styles)(({ classes, word, lists, onDeleteButtonClick, onEditionButtonClick }: WordProps) => {
  const [menuAnchor, setMenuAnchor] = useState(false)

  function closeMenu () {
    setMenuAnchor(null)
  }

  return (
    <Card className={classes.cardContent}>
      {onDeleteButtonClick || onEditionButtonClick ? (
        <React.Fragment>
          {word.note && word.note.trim() ? (
            <Tooltip
              title={word.note}
              className={classes.noteTooltip}
              classes={{
                tooltip: classes.customNoteTooltip
              }}
            >
              <InfoIcon />
            </Tooltip>
          ) : null}
          <IconButton
            aria-label='More'
            aria-owns={menuAnchor ? 'simple-menu' : undefined}
            aria-haspopup='true'
            onClick={e => setMenuAnchor(e.target)}
            className={classes.iconButtonMenu}
          >
            <MoreVertIcon />
          </IconButton>

          <Menu id='long-menu' anchorEl={menuAnchor} open={menuAnchor} onClose={closeMenu}>
            {onEditionButtonClick ? (
              <MenuItem
                onClick={() => {
                  closeMenu()
                  onEditionButtonClick()
                }}
              >
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <Typography variant='inherit'>
                  <Trans>Edit</Trans>
                </Typography>
              </MenuItem>
            ) : null}
            {onDeleteButtonClick ? (
              <MenuItem
                onClick={() => {
                  closeMenu()
                  onDeleteButtonClick()
                }}
              >
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <Typography variant='inherit'>
                  <Trans>Remove</Trans>
                </Typography>
              </MenuItem>
            ) : null}
          </Menu>
        </React.Fragment>
      ) : null}
      <div>
        <Typography
          component='p'
          className={word.kanji ? (word.kanji.length > 3 ? classes.smallerKanji : classes.kanji) : classes.kana}
        >
          {word.kanji || word.kana}
        </Typography>
        {word.kanji ? (
          <Typography component='small' color='textSecondary'>
            {word.kana}
          </Typography>
        ) : null}

        <Typography component='em' className={classes.traduction}>
          {word.traduction}
        </Typography>
        <Typography component='em'>{word.secondaryTraduction}</Typography>
      </div>

      <div>
        {lists && word.list ? (
          <Grid container justify='center' spacing={8}>
            {word.list.map(
              (id, index) =>
                lists[id] ? (
                  <Grid item key={id} xs='auto'>
                    <Chip label={lists[id].name} />
                  </Grid>
                ) : null
            )}
          </Grid>
        ) : null}
      </div>
    </Card>
  )
})
