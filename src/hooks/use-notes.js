import { useEffect, useState } from 'react';
import useNote from './use-note';

export default function useNotes(input, channel = 'all') {
  const [notes, setNotes] = useState([]);
  const [value, isOn] = useNote(input, channel);

  useEffect(() => {
    if (!input) return () => {};

    if (isOn) setNotes([...notes, value]);
    else setNotes(notes.filter(({ note }) => note.number !== value.note.number));
  }, [value]);

  return notes;
}
