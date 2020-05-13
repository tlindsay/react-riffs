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
        WebMidi.addListener('connected', ({ port }) => {
          if (port.type !== 'input') return;

          if (debug) {
            console.groupCollapsed('[riffs] new connection', port.name, inputs);
            addDebugListeners(port);
            console.groupEnd();
          }

          setInputs(WebMidi.inputs);
        });
        WebMidi.addListener('disconnected', ({ port }) => {
          if (port.type !== 'input') return;

          if (debug) console.debug('connection lost: ', port.name);

          setInputs(WebMidi.inputs.filter(({ id }) => id !== port.id));
          teardownMidiListeners(port);
        });
      } else {
        console.error(err);
      }
    });
  }, []);

  return inputs;
}

function addDebugListeners(input) {
  console.log(`${input.name} supported control types:`);
  console.table(WebMidi.MIDI_CONTROL_CHANGE_MESSAGES);
  input.addListener('noteon', 'all', (e) => console.log('noteon', e));
  input.addListener('pitchbend', 'all', (e) => console.log('pitchbend', e));
  input.addListener('controlchange', 'all', (e) => console.log('controlchange', e));
  input.addListener('start', 'all', (e) => console.log('start', e));
  input.addListener('stop', 'all', (e) => console.log('stop', e));
}

function teardownMidiListeners(input) {
  if (!input.removeListener) return;
  input.removeListener();
}
