// @flow

export type TrainingType = 'kanji_to_kana' | 'kanji_to_traduction' | 'traduction_to_kanji' | 'traduction_to_kana'

export type FirebaseList = {|
  id: string,
  name: string
|}

export type FirebaseWord = {
  id: string,
  name: string,
  kana: string,
  list: ?FirebaseList,
  kanji: ?string,
  note: ?string,
  type: ?string
}

export type FirebaseViewer = {
  email: string,
  uid: string
}

export type ReactSelectOption = {|
  label: string,
  value: any
|}

export type GuessWords = Array<{ isValid: boolean, guess: string, word: FirebaseWord }>
