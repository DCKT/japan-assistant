// @flow

import React from 'react'
import { Trans } from '@lingui/macro'

export const required = value => (value ? undefined : <Trans>Required</Trans>)
