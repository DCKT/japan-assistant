// @flow

import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { Trans } from '@lingui/macro'
import Typography from '@material-ui/core/Typography'
import Word from '../../components/Word'
import AddWordDialogForm from '../../components/AddWordDialogForm'
import AddCategoryDialogForm from '../../components/AddCategoryDialogForm'
import AuthenticatedNavigationBar from '../../components/AuthenticatedNavigationBar'
import firebase, { onFirebaseValue, removeFirebaseValue, addFirebaseValue } from '../../../../services/firebase'
import emptyListSvg from '../../assets/empty-list.svg'
import SearchForm from '../../components/SearchForm'

const styles = theme => ({
  pageContainer: {
    height: '100%'
  },
  fab: {
    position: 'absolute',
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
    padding: theme.spacing.unit * 2
  }
})

export default React.memo(
  withStyles(styles)(({ classes, viewer }) => {
    const [isAddWordDialogVisible, setIsAddWordDialogVisible] = useState(false)
    const [isAddCategoryDialogVisible, setIsAddCategoryDialogVisible] = useState(false)
    const [editedWord, setEditedWord] = useState(null)
    const [words, setWords] = useState(undefined)
    const [categories, setCategories] = useState(undefined)
    const [categoriesFilter, setCategoriesFilter] = useState([])
    const hasWords = words !== undefined && words !== null

    const wordsList = words
      ? Object.keys(words)
        .filter(wordKeyId => {
          if (categoriesFilter.length) {
            return categoriesFilter.includes(words[wordKeyId].category)
          } else {
            return true
          }
        })
        .map(wordKey => words[wordKey])
      : null

    const categoriesList = categories ? Object.keys(categories).map(categoryKey => categories[categoryKey]) : []

    function toggleCategoryDialog () {
      setIsAddCategoryDialogVisible(!isAddCategoryDialogVisible)
    }

    function toggleAddWordDialog () {
      setIsAddWordDialogVisible(!isAddWordDialogVisible)
    }

    function removeWord (id) {
      removeFirebaseValue(`users/${viewer.uid}/words/${id}`)
    }

    function addCategoryOnSubmit (values) {
      const id = Date.now()
      addFirebaseValue(`users/${viewer.uid}/categories/${id}`, {
        id,
        name: values.name
      })
    }

    useEffect(() => {
      onFirebaseValue(`users/${viewer.uid}/words`, setWords)
      onFirebaseValue(`users/${viewer.uid}/categories`, setCategories)
    }, [])

    return (
      <div className={classes.pageContainer}>
        <AuthenticatedNavigationBar onLogout={() => firebase.auth().signOut()} />
        {hasWords ? (
          <React.Fragment>
            <div style={{ margin: 10 }}>
              {categories === undefined ? null : categories ? (
                <React.Fragment>
                  <Grid container spacing={16}>
                    <Grid item xs='auto'>
                      <Button color='primary' onClick={toggleCategoryDialog} variant='contained'>
                        <Trans>Add a category</Trans>
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <SearchForm
                        isMulti
                        options={categoriesList.map(category => ({
                          label: category.name,
                          value: category.id
                        }))}
                        onChange={values => setCategoriesFilter(values.map(({ value }) => value))}
                      />
                    </Grid>
                  </Grid>
                </React.Fragment>
              ) : (
                <Button color='primary' onClick={toggleCategoryDialog} variant='contained'>
                  <Trans>Add a category</Trans>
                </Button>
              )}
            </div>
          </React.Fragment>
        ) : null}

        <div className={classes.listContainer}>
          {words === undefined ? null : wordsList ? (
            <Grid container wrap='wrap' spacing={16} style={{ flexGrow: 1 }}>
              {wordsList.map((word, i) => (
                <Grid item xs={12} sm={10} md={4} lg={2} key={i}>
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
                <Button color='primary' onClick={toggleCategoryDialog}>
                  <Trans>Add a category</Trans>
                </Button>
              </Grid>
            </Grid>
          )}
        </div>

        {hasWords ? (
          <Button variant='fab' color='primary' aria-label='Add' className={classes.fab} onClick={toggleAddWordDialog}>
            <AddIcon />
          </Button>
        ) : null}
        {isAddWordDialogVisible ? (
          <AddWordDialogForm
            viewer={viewer}
            isVisible={isAddWordDialogVisible}
            onClose={toggleAddWordDialog}
            editedWord={editedWord}
            categories={categoriesList}
          />
        ) : null}
        {isAddCategoryDialogVisible && typeof categories !== 'undefined' ? (
          <AddCategoryDialogForm
            isVisible={isAddCategoryDialogVisible}
            onClose={toggleCategoryDialog}
            onSubmit={addCategoryOnSubmit}
            categories={Object.keys(categories).map(c => categories[c])}
          />
        ) : null}
      </div>
    )
  })
)
