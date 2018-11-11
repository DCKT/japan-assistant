// @flow

import React from 'react'
import { Trans } from '@lingui/macro'

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

export const required = (value: string) => (value ? undefined : <Trans>Required</Trans>)

export const isNotDuplicate = (values: Array<string>) => (value: string) =>
  values.includes(value) ? <Trans>This value already exist</Trans> : undefined
