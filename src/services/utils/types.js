// @flow

export type FirebaseWord = {
  id: string,
  traduction: string,
  kana: string,
  category: ?string,
  kanji: ?string,
  note: ?string,
  type: ?string
}

export type FirebaseCategory = {|
  id: string,
  name: string
|}

export type Viewer = {
  email: string
}
