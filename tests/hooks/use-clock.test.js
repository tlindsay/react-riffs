import { act, renderHook } from '@testing-library/react-hooks';
import { useMidiInputs, useClock } from '../../src/';

describe('useClock hook', () => {
  test('it returns the clock value', () => {
    let [midiInput] = renderHook(() => useMidiInputs()).result.current;
    let { result } = renderHook(() => useClock(midiInput));

    act(() => {
      midiInput._userHandlers.system.clock.forEach(l => l.call());
    });

    expect(result.current).toEqual(1234.56789);
  });

  test('it noops if no input is passed', () => {
    let { result } = renderHook(() => useClock());

    expect(result.current).toEqual(0);
  });
});

