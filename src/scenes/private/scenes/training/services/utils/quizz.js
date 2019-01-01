// @flow

import type { FirebaseWord, TrainingType, GuessWords } from '../../../../../../services/utils/types'

type DisplayCurrentWordArg = {|
  trainingType: TrainingType,
  currentWord: FirebaseWord
|}

export const displayCurrentWord = ({ trainingType, currentWord }: DisplayCurrentWordArg): string => {
  switch (trainingType) {
    case 'kanji_to_kana':
      return currentWord.kanji || ''
    case 'kanji_to_traduction':
      return currentWord.kanji || currentWord.kana
    case 'traduction_to_kanji':
    case 'traduction_to_kana':
      return currentWord.traduction
    default:
      return ''
  }
}

export const countValidWords = (guessWords: GuessWords): number =>
  guessWords.reduce((counter, word) => counter + word.isValid, 0)

type GetAnswerArgs = {|
  trainingType: TrainingType,
  currentWord: FirebaseWord
|}

export const getAnswer = ({ trainingType, currentWord }: GetAnswerArgs): string => {
  switch (trainingType) {
    case 'kanji_to_kana':
      return currentWord.kana
    case 'kanji_to_traduction':
      return currentWord.name
    case 'traduction_to_kanji':
      return currentWord.kanji || ''
    case 'traduction_to_kana':
      return currentWord.kana
    default:
      return ''
  }
}
