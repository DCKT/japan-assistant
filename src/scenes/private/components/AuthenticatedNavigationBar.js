// @flow

import React, { useState } from 'react'

/**
 * Components
 */
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { Trans } from '@lingui/macro'

/**
 * Utils
 */
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing.unit * 2
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  grow: {
    flexGrow: 1
  }
})

export default withStyles(styles, { withTheme: true })(({ classes, theme, children, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [isMobileOpen, setMobileOpen] = useState(false)
  const isMenuOpen = Boolean(anchorEl)

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='Open drawer'
            onClick={() => setMobileOpen(!isMobileOpen)}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' color='inherit' noWrap>
            Memori
          </Typography>

          <div className={classes.grow} />
          <IconButton
            aria-owns={isMenuOpen ? 'material-appbar' : null}
            aria-haspopup='true'
            onClick={e => setAnchorEl(e.currentTarget)}
            color='inherit'
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Trans>Profile</Trans>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose()
            onLogout()
          }}
        >
          <Trans>Logout</Trans>
        </MenuItem>
      </Menu>
    </div>
  )
})
