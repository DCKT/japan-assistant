// @flow

import React, { Suspense, useState, useEffect } from 'react'

/**
 * Components
 */
import { Router } from '@reach/router'

/**
 * Utils
 */
import type { FirebaseLists, FirebaseWordsList, FirebaseViewer } from '../../../../services/utils/types'
import { onFirebaseValue } from '../../../../services/firebase'

const NotesHome = React.lazy(() => import('./scenes/home'))
const NoteDetails = React.lazy(() => import('./scenes/details'))

type NotesProps = {|
  lists: FirebaseLists,
  words: FirebaseWordsList,
  viewer: FirebaseViewer
|}

export default (props: NotesProps) => {
  const [notes, setNotes] = useState(undefined)

  useEffect(() => {
    onFirebaseValue(`users/${props.viewer.uid}/notes`, setNotes)
  }, [])

  return (
    <Suspense>
      <Router>
        <NotesHome {...props} notes={notes} path='/' />
        <NoteDetails {...props} notes={notes} path='/:noteId' />
      </Router>
    </Suspense>
  )
}
