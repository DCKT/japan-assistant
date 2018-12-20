// @flow

import React from 'react'

/**
 * Components
 */
import { Router } from '@reach/router'
import NotesList from './scenes/list'
import NoteDetails from './scenes/details'

/**
 * Utils
 */
import type { FirebaseLists, FirebaseWordsList, FirebaseViewer } from '../../../../services/utils/types'

type NotesProps = {|
  lists: FirebaseLists,
  words: FirebaseWordsList,
  viewer: FirebaseViewer
|}

export default (props: NotesProps) => {
  return (
    <Router>
      <NotesList {...props} path='/' />
      <NoteDetails {...props} path='/:noteId' />
    </Router>
  )
}
