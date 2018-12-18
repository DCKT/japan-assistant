// @flow

import React from 'react'

/**
 * Components
 */
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Trans } from '@lingui/macro'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'

/**
 * Utils
 */
import { withStyles } from '@material-ui/core/styles'
import type { GuessWords } from '../../../../../../services/utils/types'
import { countValidWords, getAnswer } from '../../services/utils/quizz'

const AnswerTableCell = withStyles(theme => ({
  body: {
    fontSize: 24
  }
}))(TableCell)

const styles = theme => ({
  root: {
    maxWidth: '100%',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto'
  },
  noteContainer: {
    padding: theme.spacing.unit * 3
  },
  table: {
    minWidth: 700
  },
  kanji: {
    fontSize: 24
  }
})

type ResultsProps = {|
  classes: Object,
  trainingType: string,
  guessWords: GuessWords
|}

export default withStyles(styles)(({ classes, trainingType, guessWords }: ResultsProps) => {
  return (
    <React.Fragment>
      <Paper className={classes.noteContainer}>
        <Typography component='small' variant='headline'>
          {trainingType}
        </Typography>
        <Typography component='h2' variant='title'>
          {countValidWords(guessWords)} / {guessWords.length}
        </Typography>
      </Paper>

      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Kanji</TableCell>
              <TableCell>
                <Trans>Guess</Trans>
              </TableCell>
              <TableCell>
                <Trans>Answer</Trans>
              </TableCell>
              <TableCell>
                <Trans>Found</Trans>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {guessWords.map((guessWord, i) => (
              <TableRow key={i}>
                <AnswerTableCell>{guessWord.word.kanji}</AnswerTableCell>
                <AnswerTableCell>{guessWord.guess}</AnswerTableCell>
                <AnswerTableCell>{getAnswer({ trainingType, currentWord: guessWord.word })}</AnswerTableCell>
                <AnswerTableCell>
                  {guessWord.isValid ? <CheckCircleIcon color='primary' /> : <ErrorIcon color='error' />}
                </AnswerTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  )
})
