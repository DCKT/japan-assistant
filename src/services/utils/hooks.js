// @flow

import { useState, useCallback, useEffect } from 'react'
import firebase from '../firebase'

export const useInput = (initialValue: ?string) => {
  const [value, setValue] = useState(initialValue)
  const onChange = useCallback(function (event) {
    setValue(event.currentTarget.value)
  }, [])

  return {
    value,
    onChange
  }
}

export const useFirebaseListener = (path: string, callback: Function) => {
  useEffect(() => {
    firebase
      .database()
      .ref(path)
      .on('value', callback)
  }, [])
}
