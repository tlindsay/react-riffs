import React from 'react';
import { render } from 'react-dom';

import {
  useClock,
  useControl,
  useMidiInputs,
  useNotes,
  usePitchbend
} from '../../src';

function Demo() {
  let inputs = useMidiInputs({ debug: true });
  let [midiInput] = inputs;
  let pressedKeys = useNotes(midiInput);
  let bend = usePitchbend(midiInput);
  let mod = useControl(midiInput);
  let [clock] = useClock(midiInput);

  return (
    <div style={{ fontFamily: 'monospace' }}>
      <div>Inputs Attached: {inputs.length}</div>
      <div>Clock: {clock}</div>
      <div>Bend: {bend}</div>
      <div>Mod: {mod}</div>
      <hr />
      <table border="true" width="400">
        <caption>Notes currently being played</caption>
        <thead>
          <tr>
            <td>Note</td>
            <td>Number</td>
            <td>Velocity</td>
          </tr>
        </thead>
        <tbody>
          {
            pressedKeys.map(({ note: { name, number }, velocity }, i) =>
              <tr key={i}>
                <td>{name}</td>
                <td>{number}</td>
                <td>{velocity}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}
render(<Demo/>, document.querySelector('#demo'));
