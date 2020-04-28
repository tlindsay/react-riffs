import { act, renderHook } from '@testing-library/react-hooks';
import { useMidiInputs, useNote } from '../../src/';

describe('useNote hook', () => {
  test('it returns a webmidi event and boolean isOn flag for any given note', () => {
    let [midiInput] = renderHook(() => useMidiInputs()).result.current;
    let { result } = renderHook(() => useNote(midiInput));

    act(() => {
      midiInput._userHandlers.channel.noteoff['1'].forEach((l) => l.call());
    });

    let [note, isOn] = result.current;

    expect(isOn).toEqual(false);
    expect(note).toEqual({
      target: {},
      data: new Uint8Array([1, 2, 3]),
      timestamp: 1234.56789,
      channel: 1,
      type: 'noteoff',
      note: {
        number: 1,
        name: 'C',
        octave: 1
      },
      velocity: 0.5,
      rawVelocity: 100
    });
  });

  test('it noops if no input is passed', () => {
    let { result } = renderHook(() => useNote());

    expect(result.current).toEqual([{}, false]);
  });
});

