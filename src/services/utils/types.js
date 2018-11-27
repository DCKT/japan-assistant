// @flow

export type FirebaseCategory = {|
  id: string,
  name: string
|}

export type FirebaseWord = {
  id: string,
  name: string,
  kana: string,
  category: ?FirebaseCategory,
  kanji: ?string,
  note: ?string,
  type: ?string
}

export type Viewer = {
  email: string
}

export type ReactSelectOption = {|
  label: string,
  value: any
|}
