// @flow

export const getMediaRecorder = (): Promise<Object> =>
  new Promise((resolve, reject) => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        if (MediaRecorder) {
          const mediaRecorder = new MediaRecorder(stream)

          resolve(mediaRecorder)
        } else {
          reject(new Error({ mediaRecorderUnsupported: true }))
        }
      })
    } else {
      reject(new Error({ mediaDevicesUnsupported: true }))
    }
  })

export const createAudioFromChunks = audioChunks => {
  const audioBlob = new Blob(audioChunks)
  const audioUrl = URL.createObjectURL(audioBlob)

  return new Audio(audioUrl)
}

export const createAudioUrl = audioChunks => {
  const audioBlob = new Blob(audioChunks)
  return URL.createObjectURL(audioBlob)
}
