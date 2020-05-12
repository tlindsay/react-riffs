export default {
  clock: {
    target: {},
    data: new Uint8Array([248]),
    timestamp: 1234.56789,
    type: 'clock'
  },
  controlchange: {
    target: {},
    data: new Uint8Array([1, 2, 3]),
    timestamp: 1234.56789,
    channel: 1,
    controller: { number: 1, name: 'modulationwheelcoarse' },
    type: 'controlchange',
    value: 64
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
  start: {
    target: {},
    data: new Uint8Array([250]),
    timestamp: 1.23456789,
    type: 'start'
  },
  stop: {
    target: {},
    data: new Uint8Array([252]),
    timestamp: 2345.678901,
    type: 'stop'
  }
};

