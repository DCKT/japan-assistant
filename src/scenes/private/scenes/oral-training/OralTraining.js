// @flow

import React, { useState } from 'react'

/**
 * Components
 */
import Button from '@material-ui/core/Button'
import { Trans } from '@lingui/macro'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add'
import AddVocalRecordDialog from './components/AddVocalRecordDialog'

/**
 * Utils
 */
import { withStyles } from '@material-ui/core/styles'
import { getMediaRecorder, createAudioUrl } from '../../../../services/utils/media-recorder'

const styles = theme => ({
  fab: {
    position: 'fixed',
    right: 30,
    bottom: 30
  }
})

export default withStyles(styles)(({ classes }) => {
  const [recorder, setRecorder] = useState(null)
  const [audioChunks, setAudioChunks] = useState([])
  const [isAddDialogVisible, setDialogVisibility] = useState(false)

  function toggleDialogVisibility () {
    setDialogVisibility(!isAddDialogVisible)
  }

  function startMicrophoneTracking () {
    getMediaRecorder().then(recorder => {
      setRecorder(recorder)
      recorder.start()

      recorder.addEventListener('dataavailable', event => {
        setAudioChunks([...audioChunks, event.data])
      })
    })
  }

  function stopMicrophoneTracking () {
    if (recorder) {
      recorder.stop()
      setRecorder(null)
    }
  }

  // function play () {
  //   const audio = createAudioFromChunks(audioChunks)
  //   audio.play()
  // }

  return (
    <div>
      <h1>Oral</h1>
      {recorder ? (
        <Button variant='contained' onClick={stopMicrophoneTracking}>
          Stop tracking
        </Button>
      ) : (
        <Button variant='contained' color='primary' onClick={startMicrophoneTracking}>
          start tracking
        </Button>
      )}

      {audioChunks.length ? (
        <div>
          <audio controls src={createAudioUrl(audioChunks)} />
        </div>
      ) : null}

      <Tooltip title={<Trans>Add a new word</Trans>}>
        <Button variant='fab' color='primary' aria-label='Add' className={classes.fab} onClick={toggleDialogVisibility}>
          <AddIcon />
        </Button>
      </Tooltip>

      {isAddDialogVisible ? (
        <AddVocalRecordDialog isVisible={isAddDialogVisible} onClose={toggleDialogVisibility} onCreate={console.log} />
      ) : null}
    </div>
  )
})
