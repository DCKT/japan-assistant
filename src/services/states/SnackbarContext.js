// @flow

import React from 'react'

const SnackbarContext = React.createContext({ isVisible: false, data: null, setVisibility: () => {} })

export default SnackbarContext
