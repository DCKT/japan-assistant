// @flow

import React, { useReducer } from 'react'

/**
 * Components
 */
import Typography from '@material-ui/core/Typography'
import { Trans } from '@lingui/macro'
import SelectTrainingConfig from './components/select-training-config'
import Quizz from './components/quizz'
import Results from './components/results'
import Button from '@material-ui/core/Button'

/**
 * Utils
 */
import { filter, shuffle, random } from 'lodash'
import type { FirebaseViewer, FirebaseList } from '../../../../services/utils/types'
import { getAnswer } from './services/utils/quizz'

const initialState = { step: 1, remainingWords: [], trainingType: null, currentWord: null, guessWords: [] }

function reducer (state, action) {
  switch (action.type) {
    case 'START_TRAINING':
      return {
        ...state,
        remainingWords: action.payload.remainingWords,
        trainingType: action.payload.trainingType,
        currentWord: action.payload.currentWord
      }
    case 'GUESS':
      return {
        ...state,
        guessWords: [action.payload.guessWord, ...state.guessWords],
        remainingWords: action.payload.remainingWords,
        currentWord: action.payload.currentWord
      }
    case 'CHANGE_STEP':
      return {
        ...state,
        step: action.payload.step
      }
    case 'STOP_TRAINING':
      return initialState
    default:
      return state
  }
}

type TrainingProps = {|
  viewer: FirebaseViewer,
  lists: {
    [id: string]: FirebaseList
  },
  words: Object
|}

export default ({ viewer, lists, words }: TrainingProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  function onWordValidation (guess) {
    if (state.trainingType && state.currentWord) {
      const answer = getAnswer({ trainingType: state.trainingType, currentWord: state.currentWord })
      const remainingWords = state.remainingWords.filter(({ id }) => id !== state.currentWord.id)

      dispatch({
        type: 'GUESS',
        payload: {
          remainingWords,
          guessWord: {
            guess,
            isValid: answer.toLowerCase() === guess.toLowerCase(),
            word: state.currentWord
          },
          currentWord: remainingWords[random(0, remainingWords.length - 1)]
        }
      })

      dispatch({
        type: 'CHANGE_STEP',
        payload: {
          step: remainingWords.length ? 2 : 3
        }
      })
    }
  }

  function startTraining ({ selectedLists, trainingType }) {
    const selectedListsIds = selectedLists.map(({ value }) => value.id)
    const filteredWords = shuffle(
      filter(words, word => {
        return selectedListsIds.includes(word.list.id)
      })
    )

    dispatch({
      type: 'START_TRAINING',
      payload: {
        remainingWords: filteredWords,
        trainingType,
        currentWord: filteredWords[0]
      }
    })

    dispatch({
      type: 'CHANGE_STEP',
      payload: {
        step: 2
      }
    })
  }

  function stopTraining () {
    dispatch({
      type: 'STOP_TRAINING'
    })
  }

  if (state.step === 1) {
    return (
      <React.Fragment>
        <SelectTrainingConfig lists={lists} onSubmit={startTraining} />
      </React.Fragment>
    )
  }

  if (state.step === 2) {
    return (
      <React.Fragment>
        <Button variant='contained' onClick={stopTraining}>
          <Trans>Stop training</Trans>
        </Button>
        <Quizz
          currentWord={state.currentWord}
          trainingType={state.trainingType}
          progress={{
            current: state.guessWords.length + 1,
            total: state.remainingWords.length + state.guessWords.length
          }}
          onWordValidation={onWordValidation}
        />
      </React.Fragment>
    )
  }

  if (state.step === 3) {
    return (
      <div>
        <Typography component='h1' variant='h2' gutterBottom>
          <Trans>Training results</Trans>
        </Typography>
        <Results trainingType={state.trainingType} guessWords={state.guessWords} />
      </div>
    )
  }
}
