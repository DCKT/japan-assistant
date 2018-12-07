// @flow

import React, { useState } from 'react'

/**
 * Components
 */
import Grid from '@material-ui/core/Grid'
import { Button } from '@material-ui/core'
import { Trans } from '@lingui/macro'
import Typography from '@material-ui/core/Typography'
import Word from '../../components/Word'
import AddWordDialogForm from '../../components/AddWordDialogForm'
import AddListDialogForm from '../../components/AddListDialogForm'

import SearchForm from '../../components/SearchForm'
import AddIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'

/**
 * Utils
 */
import { withStyles } from '@material-ui/core/styles'
import { removeFirebaseValue, addFirebaseValue, updateFirebaseValue } from '../../../../services/firebase'
import emptyListSvg from '../../assets/empty-list.svg'
import type { FirebaseViewer } from '../../../../services/utils/types'

const styles = theme => ({
  pageContainer: {
    height: '100%'
  },
  fab: {
    position: 'fixed',
    right: 30,
    bottom: 30
  },
  emptyListPicture: {
    width: '100%',
    maxWidth: 450,
    marginBottom: theme.spacing.unit * 3
  },
  emptyContainer: {
    textAlign: 'center',
    height: 'calc(100% - 70px)'
  },
  emptyContainerActions: {
    marginTop: theme.spacing.unit * 4
  },
  listContainer: {
    paddingTop: theme.spacing.unit
  }
})

type HomeProps = {|
  classes: Object,
  viewer: FirebaseViewer,
  lists: Object,
  words: Object
|}

export default withStyles(styles)(({ classes, viewer, lists, words }: HomeProps) => {
  const [isAddWordDialogVisible, setIsAddWordDialogVisible] = useState(false)
  const [isAddListDialogVisible, setIsAddListDialogVisible] = useState(false)
  const [editedWord, setEditedWord] = useState(null)
  const [listsFilter, setListsFilter] = useState([])
  const hasWords = words !== undefined && words !== null

  const wordsList = words
    ? Object.keys(words)
      .filter(wordKeyId => {
        if (listsFilter.length) {
          const wordList = words[wordKeyId].list ? words[wordKeyId].list.id : ''
          return listsFilter.includes(wordList)
        } else {
          return true
        }
      })
      .map(wordKey => words[wordKey])
    : null

  const listsOptions = lists.map(list => ({
    label: list.name,
    value: list
  }))

  function toggleListDialog () {
    setIsAddListDialogVisible(!isAddListDialogVisible)
  }

  function toggleAddWordDialog () {
    setIsAddWordDialogVisible(!isAddWordDialogVisible)
  }

  function removeWord (id) {
    removeFirebaseValue(`users/${viewer.uid}/words/${id}`)
  }

  function addListOnSubmit (values) {
    const id = Date.now()

    addFirebaseValue(`users/${viewer.uid}/lists/${id}`, {
      id,
      name: values.name
    })
  }

  function onWordCreation (values) {
    const id = Date.now()

    addFirebaseValue(`users/${viewer.uid}/words/${id}`, {
      ...values,
      id,
      list: values.list.value
    })
  }

  function onWordEdition (values) {
    updateFirebaseValue(`users/${viewer.uid}/words/${editedWord.id}`, {
      ...values,
      list: values.list.value
    })
  }

  return (
    <div className={classes.pageContainer}>
      {hasWords ? (
        <React.Fragment>
          <div>
            {lists === undefined ? null : lists ? (
              <Grid container spacing={16}>
                <Grid item xs={12} md={6}>
                  <SearchForm
                    isMulti
                    options={listsOptions}
                    onChange={values => setListsFilter(values.map(({ value }) => value.id))}
                  />
                </Grid>
              </Grid>
            ) : (
              <Button color='primary' onClick={toggleListDialog} variant='contained'>
                <Trans>Add a list</Trans>
              </Button>
            )}
          </div>
        </React.Fragment>
      ) : null}

      <div className={classes.listContainer}>
        {words === undefined ? null : wordsList ? (
          <Grid container wrap='wrap' spacing={16} style={{ flexGrow: 1 }}>
            {wordsList.map((word, i) => (
              <Grid item xs={6} md={3} key={i}>
                <Word
                  word={word}
                  onDeleteButtonClick={() => removeWord(word.id)}
                  onEditionButtonClick={() => {
                    setEditedWord(word)
                    toggleAddWordDialog()
                  }}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container alignItems='center' justify='center' className={classes.emptyContainer}>
            <Grid item xs={5}>
              <img src={emptyListSvg} alt='No words' className={classes.emptyListPicture} />
              <Typography component='h3' variant='h4' gutterBottom>
                <Trans>No words yet</Trans>
              </Typography>
              <div className={classes.emptyContainerActions} />
              <Button variant='contained' color='primary' onClick={toggleAddWordDialog}>
                <Trans>Add my first word</Trans>
              </Button>
              &nbsp;
              <Button color='primary' onClick={toggleListDialog}>
                <Trans>Add a list</Trans>
              </Button>
            </Grid>
          </Grid>
        )}
      </div>

      {hasWords ? (
        <Tooltip title={<Trans>Add a new word</Trans>}>
          <Button variant='fab' color='primary' aria-label='Add' className={classes.fab} onClick={toggleAddWordDialog}>
            <AddIcon />
          </Button>
        </Tooltip>
      ) : null}
      {isAddWordDialogVisible ? (
        <AddWordDialogForm
          viewer={viewer}
          isVisible={isAddWordDialogVisible}
          onClose={() => {
            toggleAddWordDialog()
            setEditedWord(null)
          }}
          editedWord={editedWord}
          lists={listsOptions}
          onCreate={onWordCreation}
          onEdit={onWordEdition}
        />
      ) : null}
      {isAddListDialogVisible && typeof lists !== 'undefined' ? (
        <AddListDialogForm
          isVisible={isAddListDialogVisible}
          onClose={toggleListDialog}
          onSubmit={addListOnSubmit}
          lists={Object.keys(lists).map(c => lists[c])}
        />
      ) : null}
    </div>
  )
})
