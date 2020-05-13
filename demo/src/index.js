import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';

import {
  useClock,
  useControl,
  useMidiInputs,
  useNotes,
  usePitchbend
} from '../../src';

function Demo() {
  let inputs = useMidiInputs({ debug: false });
  let [midiInput, setInput] = useState(inputs[0]);
  let pressedKeys = useNotes(midiInput);
  let bend = usePitchbend(midiInput);
  let mod = useControl(midiInput);
  let [clock] = useClock(midiInput);

  // Handle new/lost connections
  useEffect(() => setInput(inputs[0]), [inputs]);

  return (
    <div style={{ fontFamily: 'monospace' }}>
      <h1>React Riffs</h1>

      <div>Inputs Attached: {inputs.length}</div>
      <div>
        <label htmlFor="midi-select">Selected Input:</label>
        <select
          id="midi-select"
          name="midi-select"
          onChange={(e) => setInput(inputs.find(({ id }) => id === e.target.value))}
        >
          {inputs.map(({ name, id }) => <option key={id} value={id}>{name}</option>)}
        </select>
      </div>
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
