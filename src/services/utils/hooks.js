// @flow

import { useState, useCallback } from 'react'

export const useInput = (initialValue: ?string) => {
  const [value, setValue] = useState(initialValue)
  const onChange = useCallback(function (event: SyntheticEvent<*>) {
    setValue(event.currentTarget.value)
  }, [])

  return {
    value,
    onChange
  }
}

export const useBoolean = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue)

  return {
    value,
    toggle: useCallback(() => setValue(!value), []),
    setTrue: useCallback(() => setValue(true), []),
    setFalse: useCallback(() => setValue(false), [])
  }
}
