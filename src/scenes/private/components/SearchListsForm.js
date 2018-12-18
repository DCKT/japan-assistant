// @flow

import React from 'react'

/**
 * Components
 */
import Select from 'react-select'
import { Trans } from '@lingui/macro'

/**
 * Utils
 */
import type { ReactSelectOption } from '../../../services/utils/types'

type SearchFormProps = {|
  options: Array<ReactSelectOption>,
  isMulti: boolean,
  onChange: (values: Array<ReactSelectOption>) => void
|}

export default ({ classes, options, onChange, isMulti, ...rest }: SearchFormProps) => {
  return (
    <Select
      options={options}
      isMulti={isMulti}
      styles={{
        menu: provided => ({
          ...provided,
          zIndex: 100000
        }),
        input: () => ({
          height: 50,
          lineHeight: '50px'
        })
      }}
      placeholder={<Trans>Search lists</Trans>}
      onChange={onChange}
      {...rest}
    />
  )
}
