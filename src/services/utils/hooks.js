// @flow

import { useState, useCallback } from 'react'

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
