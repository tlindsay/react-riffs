import { useEffect, useState } from 'react';

export default function useClock(input, channel = 'all') {
  const [value, setValue] = useState(0);
  const tick = ({ timestamp }) => setValue(timestamp);

  useEffect(() => {
    if (!input) return () => {};

    input.addListener('clock', channel, tick);

    return () => input.removeListener('clock', channel, tick);
  }, [input]);

  return value;
}
