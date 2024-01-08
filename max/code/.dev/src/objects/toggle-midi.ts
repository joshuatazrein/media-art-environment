import findIndex from 'lodash/findIndex'
import range from 'lodash/range'
import dummy from 'packages/dummy'
import invariant from 'tiny-invariant'

outlets = 1
setoutletassist(0, '[voice, note, velocity]')
const notes: (number | null)[] = range(0, 6).map(() => null)

function msg_int(note: number) {
  const foundNote = findIndex(
    notes,
    (otherNote) => !!otherNote && otherNote === note
  )
  if (foundNote === -1) {
    const freeVoice = notes.indexOf(null)
    if (freeVoice === -1) {
      invariant(notes[0] !== null)
      output(1, notes[0], 0)
      notes[0] = note
      output(1, note, 1)
    } else {
      notes[freeVoice] = note
      output(freeVoice + 1, note, 1)
    }
  } else {
    notes[foundNote] = null
    output(foundNote + 1, note, 0)
  }
}

function output(voice: number, note: number, velocity: number) {
  outlet(0, voice, note, velocity)
}

if (dummy) {
  msg_int(0)
}
