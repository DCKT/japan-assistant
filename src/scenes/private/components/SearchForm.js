// @flow

import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import Select from 'react-select'
import { Trans } from '@lingui/macro'

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.05),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.15)
    },
    border: `1px solid ${fade(theme.palette.primary.main, 0.15)}`,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
})

type ReactSelectOption = {|
  label: string,
  value: string
|}

type SearchFormProps = {|
  classes: Object,
  options: Array<ReactSelectOption>
|}

export default withStyles(styles)(({ classes, options }: SearchFormProps) => {
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <Select
        options={options}
        isMulti
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        placeholder={<Trans>Search by categories</Trans>}
      />
    </div>
  )
})
