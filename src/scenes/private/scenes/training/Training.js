// @flow

import React, { useReducer } from 'react'

/**
 * Components
 */
import Typography from '@material-ui/core/Typography'
import { Trans } from '@lingui/macro'
import SelectTrainingConfig from './components/select-training-config'
import Quizz from './components/quizz'

/**
 * Utils
 */
import { withStyles } from '@material-ui/core/styles'
import { filter, shuffle, random } from 'lodash'
import { isSwitchStatement } from 'typescript'

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

const initialState = { step: 2, remainingWords: [], trainingType: null, currentWord: null, guessWords: [] }

function reducer (state, action) {
  switch (action.type) {
    case 'START_TRAINING':
      const words = shuffle(action.payload.words)
      return {
        ...state,
        step: 2,
        remainingWords: words,
        trainingType: action.payload.trainingType,
        currentWord: words[0]
      }
    case 'GUESS':
      const remainingWords = state.remainingWords.filter(({ id }) => id !== action.payload.word.id)

      return {
        ...state,
        guessWords: [action.payload, ...state.guessWords],
        remainingWords,
        currentWord: remainingWords[random(0, remainingWords.length - 1)],
        step: remainingWords.length ? 2 : 3
      }
    case 'next':
      return state

    default:
      return state
  }
}

export default withStyles(styles)(({ classes, viewer, lists, words }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  function onWordValidation (isValid, word) {
    dispatch({
      type: 'GUESS',
      payload: {
        isValid,
        word
      }
    })
  }

  if (state.step === 1) {
    return (
      <React.Fragment>
        <Typography component='h1' variant='h1' gutterBottom>
          <Trans>Training</Trans>
        </Typography>
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
      </React.Fragment>
    )
  }

  if (state.step === 2) {
    return (
      <React.Fragment>
        <Typography component='h1' variant='h1' gutterBottom>
          <Trans>Training</Trans>
        </Typography>
        <Quizz
          currentWord={{ id: 1542482066509, kana: 'あおい', kanji: '青', name: 'bleu' }}
          trainingType={'kanji_to_kana'}
          progress={{ current: 2, total: 42 }}
          onWordValidation={onWordValidation}
        />
      </React.Fragment>
    )
  }
})
