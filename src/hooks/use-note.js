import { useState, useEffect } from 'react';

export default function useNote(input, channel = 'all') {
  const [value, setValue] = useState([{}, false]);

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

