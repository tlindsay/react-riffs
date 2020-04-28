export default {
  clock: {
    target: {},
    data: new Uint8Array([248]),
    timestamp: 1234.56789,
    type: 'clock'
  },
  noteoff: {
    target: {},
    data: new Uint8Array([1, 2, 3]),
    timestamp: 1234.56789,
    channel: 1,
    type: 'noteoff',
    note: {
      number: 1,
      name: 'C',
      octave: 1
    },
    velocity: 0.5,
    rawVelocity: 100
  },
  noteon: {
    target: {},
    data: new Uint8Array([1, 2, 3]),
    timestamp: 1234.56789,
    channel: 1,
    type: 'noteon',
    note: {
      number: 1,
      name: 'C',
      octave: 1
    },
    velocity: 0.5,
    rawVelocity: 100
  },
  pitchbend: {
    target: {},
    data: new Uint8Array([1, 2, 3]),
    timestamp: 1234.56789,
    channel: 1,
    type: 'pitchbend',
    value: 0.5
  },
  reset: {},
  start: {},
  stop: {}
};

