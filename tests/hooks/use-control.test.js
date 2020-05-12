import { act, renderHook } from '@testing-library/react-hooks';
import { useMidiInputs, useControl } from '../../src/';

describe('useControl hook', () => {
  test('it returns the control value', () => {
    let [midiInput] = renderHook(() => useMidiInputs()).result.current;
    let { result } = renderHook(() => useControl(midiInput));

    expect(result.current).toEqual(0);

    act(() => {
      midiInput._userHandlers.channel.controlchange['1'].forEach((l) => l.call());
    });

    expect(result.current).toEqual(64);
  });

  test('it noops if no input is passed', () => {
    let { result } = renderHook(() => useControl());

    expect(result.current).toEqual(0);
  });
});


