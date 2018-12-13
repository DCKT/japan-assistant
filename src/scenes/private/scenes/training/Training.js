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
    default:
      return state
  }
}

export default withStyles(styles)(({ classes, viewer, lists, words }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  function onWordValidation (isValid, word) {
    const remainingWords = state.remainingWords.filter(({ id }) => id !== word.id)

    dispatch({
      type: 'GUESS',
      payload: {
        remainingWords,
        guessWord: {
          isValid,
          word
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

  if (state.step === 1) {
    return (
      <React.Fragment>
        <Typography component='h1' variant='h1' gutterBottom>
          <Trans>Training</Trans>
        </Typography>
        <SelectTrainingConfig lists={lists} onSubmit={startTraining} />
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
        <Typography component='h1' variant='h1' gutterBottom>
          <Trans>Training</Trans>
        </Typography>
        End !
      </div>
    )
  }
})
