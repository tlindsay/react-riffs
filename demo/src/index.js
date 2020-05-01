import React from 'react';
import { render } from 'react-dom';

import {
  useClock,
  useMidiInputs,
  useNotes,
  usePitchbend
} from '../../src';

function Demo() {
  let [midiInput] = useMidiInputs({ debug: true });
  let pressedKeys = useNotes(midiInput, 15);
  let bend = usePitchbend(midiInput);
  let [clock] = useClock(midiInput);

  return (
    <div style={{fontFamily: 'monospace'}}>
      <div>Clock: {clock}</div>
      <div>Bend: {bend}</div>
      <ul>
        {
          pressedKeys.map(({ note: n, velocity: v }, i) =>
            <li key={i}>{n.name} {n.number} {v}</li>)
        }
      </ul>
    </div>
  );
}
render(<Demo/>, document.querySelector('#demo'));
