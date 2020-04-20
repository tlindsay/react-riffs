import { useState, useEffect } from 'react';
import WebMidi from 'webmidi';
import { isEmpty } from 'lodash/lang';

export function useMidiInputs(opts = { debug: false }) {
  const { debug } = opts;
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    if (!isEmpty(inputs)) {
      return () => {
        teardownMidiListeners(inputs);
      };
    }

    WebMidi.enable((err) => {
      if (!err) {
        if (debug) {
          WebMidi.addListener('connected', () => {
            console.log('new connection');
            addDebugListeners(WebMidi.inputs);
          });
          WebMidi.addListener('disconnected', () => {
            console.log('connection lost');
            teardownMidiListeners(inputs);
          });
        }

        setInputs(WebMidi.inputs);
      } else {
        console.error(err);
      }
    });
  }, []);

  return inputs;
}

export function useMidiNote(input, channel = 'all') {
  const [value, setValue] = useState({});

  const on = (e) => setValue([e, true]);
  const off = (e) => setValue([e, false]);

  useEffect(() => {
    if (!input) return () => {};

    input.addListener('noteon', channel, on);
    input.addListener('noteoff', channel, off);

    return () => {
      input.removeListener('noteon', channel, on);
      input.removeListener('noteoff', channel, off);
    };
  }, [input]);

  return value;
}

export function useMidiNotes(input, channel = 'all') {
  const [notes, setNotes] = useState([]);
  const [value, isOn] = useMidiNote(input, channel);

  useEffect(() => {
    if (!input) return () => {};

    if (isOn) setNotes([...notes, value]);
    else setNotes(notes.filter(({ note }) => note.number !== value.note.number));
  }, [value]);

  return notes;
}

export function usePitchBend(input, channel = 'all') {
  const [bend, setBend] = useState(0);
  const bender = ({ value }) => setBend(value);

  useEffect(() => {
    if (!input) return () => {};
    input.addListener('pitchbend', channel, bender);

    return () => input.removeListener('pitchbend', channel, bender);
  }, [input]);

  return bend;
}

export function useClock(input, channel = 'all') {
  const [value, setValue] = useState(0);
  const tick = ({ timestamp }) => setValue(timestamp);

  useEffect(() => {
    if (!input) return () => {};

    input.addListener('clock', channel, tick);

    return () => input.removeListener('clock', channel, tick);
  }, [input]);

  return value;
}

function addDebugListeners(inputs) {
  if (inputs) {
    inputs.forEach((input) => {
      input.addListener('noteon', 'all', (e) => console.log('noteon', e));
      input.addListener('pitchbend', 'all', (e) => console.log('pitchbend', e));
      input.addListener('start', 'all', (e) => console.log('start', e));
      input.addListener('stop', 'all', (e) => console.log('stop', e));
      input.addListener('reset', 'all', (e) => console.log('reset', e));
    });
  }
}

function teardownMidiListeners(inputs) {
  inputs.forEach((input) => input.removeListener());
}
