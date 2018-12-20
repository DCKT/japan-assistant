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
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import CategoryIcon from '@material-ui/icons/Category'
import LibraryBooksIcons from '@material-ui/icons/LibraryBooks'
import HomeIcon from '@material-ui/icons/Home'
import HelpIcon from '@material-ui/icons/Help'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import TranslateIcon from '@material-ui/icons/Translate'
import NoteIcon from '@material-ui/icons/Create'
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver'
import { Link, Match } from '@reach/router'
import Media from 'react-media'
import SnackbarContext from '../../../services/states/SnackbarContext'
import Snackbar from '@material-ui/core/Snackbar'

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
    height: '100%',
    position: 'relative',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 10,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 3,
      paddingTop: theme.spacing.unit * 10
    }
  },
  snackbar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
})

export default withStyles(styles, { withTheme: true })(({ classes, theme, children, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [isMobileOpen, setMobileOpen] = useState(false)
  const [snackbarStatus, setSnackbarStatus] = useState({ visible: false, message: null })
  const [isTrainingMenuVisible, setTrainingMenuVisibility] = useState(false)
  const isMenuOpen = Boolean(anchorEl)

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  function closeMobileMenu () {
    setMobileOpen(false)
  }

  function toggleMenuTraining () {
    setTrainingMenuVisibility(!isTrainingMenuVisible)
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
              <Match path='/app'>
                {({ match }) => (
                  <ListItem button component={Link} to='/app' onClick={closeMobileMenu} selected={!!match}>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={<Trans>Home</Trans>} />
                  </ListItem>
                )}
              </Match>

              <Match path='lists'>
                {({ match }) => (
                  <ListItem button component={Link} to='lists' onClick={closeMobileMenu} selected={!!match}>
                    <ListItemIcon>
                      <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary={<Trans>Manage lists</Trans>} />
                  </ListItem>
                )}
              </Match>

              <Match path='notes'>
                {({ match }) => (
                  <ListItem button component={Link} to='notes' onClick={closeMobileMenu} selected={!!match}>
                    <ListItemIcon>
                      <NoteIcon />
                    </ListItemIcon>
                    <ListItemText primary={<Trans>Notes</Trans>} />
                  </ListItem>
                )}
              </Match>

              <ListItem button onClick={toggleMenuTraining}>
                <ListItemIcon>
                  <LibraryBooksIcons />
                </ListItemIcon>
                <ListItemText inset primary={<Trans>Training</Trans>} />
                {isTrainingMenuVisible ? <ExpandLess /> : <ExpandMore />}
              </ListItem>

              <Collapse in={isTrainingMenuVisible} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  <Match path='training'>
                    {({ match }) => (
                      <ListItem
                        button
                        component={Link}
                        to='training'
                        onClick={closeMobileMenu}
                        selected={!!match}
                        className={classes.nested}
                      >
                        <ListItemIcon>
                          <TranslateIcon />
                        </ListItemIcon>
                        <ListItemText primary={<Trans>Vocabulary</Trans>} />
                      </ListItem>
                    )}
                  </Match>

                  <Match path='oral-training'>
                    {({ match }) => (
                      <ListItem
                        button
                        component={Link}
                        to='oral-training'
                        onClick={closeMobileMenu}
                        selected={!!match}
                        className={classes.nested}
                      >
                        <ListItemIcon>
                          <RecordVoiceOverIcon />
                        </ListItemIcon>
                        <ListItemText primary={<Trans>Oral</Trans>} />
                      </ListItem>
                    )}
                  </Match>
                </List>
              </Collapse>

              <Divider />

              <Match path='support'>
                {({ match }) => (
                  <ListItem button component={Link} to='support' onClick={closeMobileMenu} selected={!!match}>
                    <ListItemIcon>
                      <HelpIcon />
                    </ListItemIcon>
                    <ListItemText primary={<Trans>Support memori</Trans>} />
                  </ListItem>
                )}
              </Match>
            </List>
          </Drawer>
        )}
      </Media>

      <main className={classes.content}>
        <SnackbarContext.Provider
          value={{
            isVisible: snackbarStatus.visible,
            displaySnackbar: ({ message, action }) => {
              setSnackbarStatus({ visible: true, message, action })
            }
          }}
        >
          {children}
          <Snackbar
            open={snackbarStatus.visible}
            autoHideDuration={4000}
            onClose={() => setSnackbarStatus({ visible: false, message: '' })}
            message={snackbarStatus.message}
          />
        </SnackbarContext.Provider>
      </main>
    </div>
  )
})
