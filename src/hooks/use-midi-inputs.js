import { useEffect, useState } from 'react';
import WebMidi from 'webmidi';
import { isEmpty } from 'lodash/lang';

export default function useMidiInputs(opts = { debug: false }) {
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
