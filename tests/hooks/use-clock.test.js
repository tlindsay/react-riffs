import { act, renderHook } from '@testing-library/react-hooks';
import { useMidiInputs, useClock } from '../../src/';

describe('useClock hook', () => {
  test('it returns the clock value', () => {
    let [midiInput] = renderHook(() => useMidiInputs()).result.current;
    let { result } = renderHook(() => useClock(midiInput));
    let [clock, isRunning] = result.current;

    expect(clock).toBe(0);
    expect(isRunning).toBe(false);

    act(() => {
      midiInput._userHandlers.system.start.forEach(l => l.call());
      midiInput._userHandlers.system.clock.forEach(l => l.call());
    });

    [clock, isRunning] = result.current;

    expect(isRunning).toBe(true);
    expect(clock).toBe(1234.56789);

    act(() => {
      midiInput._userHandlers.system.stop.forEach(l => l.call());
    });

    [clock, isRunning] = result.current;

    expect(isRunning).toBe(false);
  });

  test('it noops if no input is passed', () => {
    let { result } = renderHook(() => useClock());
    let [clock, isRunning] = result.current;

    expect(clock).toEqual(0);
    expect(isRunning).toEqual(false);
  });
});

