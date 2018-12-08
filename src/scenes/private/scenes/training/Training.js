// @flow

import React, { useReducer } from 'react'

/**
 * Components
 */
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { Trans } from '@lingui/macro'
import Button from '@material-ui/core/Button'
import SelectTrainingConfig from './components/select-training-config'
import Quizz from './components/quizz'

/**
 * Utils
 */
import { withStyles } from '@material-ui/core/styles'
import { map, filter } from 'lodash'

const styles = theme => ({
  paperContainer: {
    maxWidth: 500,
    margin: 'auto',
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4
  },
  containerPicture: {
    maxWidth: 350,
    marginBottom: theme.spacing.unit * 2
  },
  formContainer: {
    maxWidth: 350,
    margin: 'auto',
    textAlign: 'left',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
})

const initialState = { selectedWords: null, trainingType: null, currentWord: null }

function reducer (state, action) {
  switch (action.type) {
    case 'START_TRAINING':
      return {
        ...state,
        selectedWords: action.payload.words,
        trainingType: action.payload.trainingType,
        currentWord: action.payload.words[0]
      }
    case 'next':
      return state

    default:
      return state
  }
}

export default withStyles(styles)(({ classes, viewer, lists, words }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
      <Typography component='h1' variant='h1' gutterBottom>
        <Trans>Training</Trans>
      </Typography>
      {state.selectedWords || true ? (
        <Quizz
          currentWord={{ id: 1542482066509, kana: 'あお', kanji: '青', name: 'bleu' }}
          trainingType={'kanji_to_kana'}
        />
      ) : (
        <SelectTrainingConfig
          lists={lists}
          onSubmit={({ selectedLists, trainingType }) => {
            const selectedListsIds = selectedLists.map(({ value }) => value.id)
            const filteredWords = filter(words, word => {
              return selectedListsIds.includes(word.list.id)
            })

            dispatch({
              type: 'START_TRAINING',
              payload: {
                words: filteredWords,
                trainingType
              }
            })
          }}
        />
      )}
    </div>
  )
})
