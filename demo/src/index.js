import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

import { useMidiInputs } from '../../src';

function Demo() {
  let [midiInput] = useMidiInputs();
  let [pressedKeys, setKeys] = useState([]);
  let [bend, setBend] = useState(null);

  useEffect(() => {
    if (!midiInput) { return; }

    midiInput.addListener('noteon', 'all', ({ note }) => setKeys(prevState => [...prevState, note.name]));
    midiInput.addListener('noteoff', 'all', ({ note }) => setKeys(prevState => prevState.filter(k => k !== note.name)));
    midiInput.addListener('pitchbend', 'all', ({ value }) => setBend(value));
  }, [midiInput]);

  return (
    <div>
      Bend: {bend}
      <ul>
        {pressedKeys.map((k, i) => <li key={i}>{k}</li>)}
      </ul>
    </div>
  );
}
render(<Demo/>, document.querySelector('#demo'));
