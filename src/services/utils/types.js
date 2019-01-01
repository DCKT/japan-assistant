// @flow

export type TrainingType = 'kanji_to_kana' | 'kanji_to_traduction' | 'traduction_to_kanji' | 'traduction_to_kana'

export type FirebaseListID = string

export type FirebaseListItem = {|
  id: FirebaseListID,
  name: string
|}

export type FirebaseLists = {
  [id: FirebaseListID]: FirebaseListItem
}

export type FirebaseWordID = string

export type FirebaseWord = {|
  id: FirebaseWordID,
  traduction: string,
  kana: string,
  list: ?Array<FirebaseListID>,
  kanji: ?string,
  note: ?string,
  type: ?string,
  secondaryTraduction?: string
|}

export type FirebaseWordsList = {
  [id: FirebaseWordID]: FirebaseWord
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

export type FirebaseNoteID = string

export type FirebaseNote = {|
  id: FirebaseNoteID,
  title: string,
  content: string
|}

export type FirebaseNotesList = {|
  [id: FirebaseNoteID]: FirebaseNote
|}
