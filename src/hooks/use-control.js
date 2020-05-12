import { useEffect, useState } from 'react';

export default function useMidiControl(input, control = 'modulationwheelcoarse', channel = 'all') {
  const [controlVal, setControlVal] = useState(0);
  const controlchange = ({ controller: { name }, value }) => {
    if (name !== control) return;
    setControlVal(value);
  };

  useEffect(() => {
    if (!input) return () => {};

    input.addListener('controlchange', channel, controlchange);

    return () => input.removeListener('controlchange', channel, controlchange);
  }, [input]);

  return controlVal;
}
