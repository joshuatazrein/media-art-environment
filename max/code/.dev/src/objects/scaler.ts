import isEqual from 'lodash/isEqual'
import dummy from 'packages/dummy'

outlets = 2
setinletassist(0, '[voice, note, velocity]')

setoutletassist(0, '[note (float), amplitude (0-1), bend (0-127), channel]')
setoutletassist(1, 'dumpout (scale_degrees, scale_total, scale)')

/**
 * A set of steps defining a usable scale. If 0, the note is skipped
 */
let scale: number[] = [1]
let scaleDegrees: number[] = [1]
let scaleTotal: number = 1

function setscale(...newScale: any) {
  scale = newScale
  let total = 0
  scaleDegrees = []
  for (let step of scale) {
    total += step
    scaleDegrees.push(total)
  }
  scaleTotal = total
  outlet(1, 'scale_total', total)
  outlet(1, ['scale_degrees'].concat(scaleDegrees as any))
  outlet(1, ['scale'].concat(scale as any))
}

function setscaledegrees(...newScaleDegrees: any) {
  if (isEqual(scaleDegrees, newScaleDegrees)) return
  let last = 0
  const scale = []
  for (let degree of newScaleDegrees) {
    scale.push(degree - last)
    last = degree
  }
  post('SCALE:', scale)
  setscale(...scale)
}

// @ts-expect-error
declareattribute('scale', null, 'setscale')

/**
 * 0 - 1, scaled to 1 - 127
 */
let loudness: number = 1
declareattribute('loudness')

let max_pitchbend = 4
declareattribute('max_pitchbend')

/**
 * MIDI note
 */
let fundamental: number = 60
declareattribute('fundamental')
let center: number = 24
declareattribute('center')

function list(channel: number, note: number, velocity: number) {
  note = note - center
  let step = note % scale.length
  if (step < 0) step = scale.length + step
  if (scale[step] === 0) return
  const octave = Math.floor(note / scale.length) * scaleTotal
  const degree = scaleDegrees[step]
  const targetNote = octave + degree
  const pitchBend = targetNote - Math.floor(targetNote)
  outlet(
    0,
    targetNote + fundamental,
    loudness * velocity,
    Math.floor((pitchBend * 127) / max_pitchbend),
    channel
  )
}

if (dummy) {
  list(0, 0, 0)
  setscale([1])
  setscaledegrees([])
}
