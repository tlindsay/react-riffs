import { useEffect, useState } from 'react';

export default function usePitchbend(input, channel = 'all') {
  const [bend, setBend] = useState(0);
  const bender = ({ value }) => setBend(value);

  useEffect(() => {
    if (!input) return () => {};
    input.addListener('pitchbend', channel, bender);

    return () => input.removeListener('pitchbend', channel, bender);
  }, [input]);

  return bend;
}
