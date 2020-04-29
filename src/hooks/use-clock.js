import { useEffect, useState } from 'react';

export default function useClock(input, channel = 'all') {
  const [clock, setClock] = useState(0);
  const [isRunning, setRunning] = useState(false);
  const tick = ({ timestamp }) => setClock(timestamp);
  const start = () => setRunning(true);
  const stop = () => setRunning(false);

  useEffect(() => {
    if (!input) return () => {};

    input.addListener('clock', channel, tick);
    input.addListener('start', channel, start);
    input.addListener('stop', channel, stop);

    return () => input.removeListener('clock', channel, tick);
  }, [input]);

  return [clock, isRunning];
}
