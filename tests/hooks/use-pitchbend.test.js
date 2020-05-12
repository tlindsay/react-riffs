import { act, renderHook } from '@testing-library/react-hooks';
import { useMidiInputs, usePitchbend } from '../../src/';

describe('usePitchbend hook', () => {
  test('it returns the pitchbend value', () => {
    let [midiInput] = renderHook(() => useMidiInputs()).result.current;
    let { result } = renderHook(() => usePitchbend(midiInput));

    expect(result.current).toEqual(0);

    act(() => {
      midiInput._userHandlers.channel.pitchbend['1'].forEach((l) => l.call());
    });

    expect(result.current).toEqual(0.5);
  });

  test('it noops if no input is passed', () => {
    let { result } = renderHook(() => usePitchbend());

    expect(result.current).toEqual(0);
  });
});

