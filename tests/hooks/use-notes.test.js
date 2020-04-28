import { act, renderHook } from '@testing-library/react-hooks';
import { useMidiInputs, useNotes } from '../../src/';

describe('useNotes hook', () => {
  test('it returns an array of notes which are currently being played', () => {
    let [midiInput] = renderHook(() => useMidiInputs()).result.current;
    let { result } = renderHook(() => useNotes(midiInput));

    act(() => {
      midiInput._userHandlers.channel.noteon['1'].forEach((l) => l.call());
    });

    expect(result.current).toEqual([{
      target: {},
      data: new Uint8Array([1, 2, 3]),
      timestamp: 1234.56789,
      channel: 1,
      type: 'noteon',
      note: {
        number: 1,
        name: 'C',
        octave: 1
      },
      velocity: 0.5,
      rawVelocity: 100
    }]);
  });

  test('it noops if no input is passed', () => {
    let { result } = renderHook(() => useNotes());

    expect(result.current).toEqual([]);
  });
});

