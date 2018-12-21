// @flow

import React from 'react'

/**
 * Components
 */
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from '@reach/router'

/**
 * Utils
 */
import { map } from 'lodash'
import { withStyles } from '@material-ui/core/styles'

import type { FirebaseNotesList } from '../../../../../../../../services/utils/types'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ccc'
  },
  item: {
    '& + &': {
      borderTop: '1px solid #ccc'
    }
  }
})

type NotesListProps = {|
  notes: FirebaseNotesList
|}

export default React.memo(
  withStyles(styles)(({ notes, classes }: NotesListProps) => {
    return (
      <div className={classes.root}>
        <List component='nav'>
          {map(notes, note => (
            <ListItem key={note.id} component={Link} button to={`${note.id}`} className={classes.item}>
              <ListItemText primary={note.title} />
            </ListItem>
          ))}
        </List>
      </div>
    )
  })
)
