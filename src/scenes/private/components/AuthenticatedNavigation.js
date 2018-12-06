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
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import CategoryIcon from '@material-ui/icons/Category'
import { Link } from '@reach/router'
import Media from 'react-media'
/**
 * Utils
 */
import { withStyles } from '@material-ui/core/styles'

const drawerWidth = 240
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
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 10
  }
})

export default withStyles(styles, { withTheme: true })(({ classes, theme, children, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [isMobileOpen, setMobileOpen] = useState(false)
  const isMenuOpen = Boolean(anchorEl)

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  function closeMobileMenu () {
    setMobileOpen(false)
  }

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.appBar}>
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
      <Media query='(max-width: 599px)'>
        {matches => (
          <Drawer
            variant={matches ? 'temporary' : 'permanent'}
            anchor='left'
            className={classes.drawer}
            open={isMobileOpen}
            onClose={() => setMobileOpen(false)}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.toolbar} />
            <Divider />
            <List>
              <ListItem button component={Link} to='/app' onClick={closeMobileMenu}>
                <ListItemText primary={<Trans>Home</Trans>} />
              </ListItem>

              <ListItem button component={Link} to='lists' onClick={closeMobileMenu}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary={<Trans>Manage lists</Trans>} />
              </ListItem>
            </List>
          </Drawer>
        )}
      </Media>

      <main className={classes.content}>{children}</main>
    </div>
  )
})
