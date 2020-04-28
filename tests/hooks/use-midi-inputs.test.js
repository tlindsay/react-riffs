import { renderHook } from '@testing-library/react-hooks';
import { useMidiInputs } from '../../src/';

describe('useMidiInputs hook', () => {
  test('it exists', () => {
    expect(useMidiInputs).not.toBeNull();
  });

  test('it returns at least one input', () => {
    let { result } = renderHook(() => useMidiInputs());
    let [input] = result.current;

    expect(result.current).toHaveLength(1);
    expect(input).toMatchObject({
      connection: 'open',
      id: '123456789',
      manufacturer: 'Arturia',
      name: 'Arturia KeyStep 32',
      state: 'connected',
      type: 'input'
    });
  });

  test('it receives the debug flag', () => {
    let { result } = renderHook(() => useMidiInputs({ debug: true }));
    let [input] = result.current;

    // Check for noteon listener on all channels
    expect(input._userHandlers.channel.noteon['1'][0]).toBeInstanceOf(Function);
    expect(input._userHandlers.channel.noteon['2'][0]).toBeInstanceOf(Function);
    expect(input._userHandlers.channel.noteon['3'][0]).toBeInstanceOf(Function);

    // Check for noteoff listener on channel 1
    expect(input._userHandlers.channel.pitchbend['1'][0]).toBeInstanceOf(Function);
    expect(input._userHandlers.channel.pitchbend['2'][0]).toBeInstanceOf(Function);
    expect(input._userHandlers.channel.pitchbend['3'][0]).toBeInstanceOf(Function);

    input.removeListener();
  });

  test('it can add and remove event listeners', () => {
    let { result } = renderHook(() => useMidiInputs({ debug: false }));
    let [input] = result.current;
    let listener = (e) => e;
    let emptyListeners = {
      channel: {
        noteon: {
          1: [],
          2: [],
          3: []
        },
        noteoff: {
          1: [],
          2: [],
          3: []
        }
      },
      system: {
        clock: []
      }
    };

    // Check that we start with no listeners
    expect(input._userHandlers).toMatchObject(emptyListeners);

    // Add some listeners
    input.addListener('noteon', 'all', listener);
    input.addListener('noteoff', '1', listener);
    input.addListener('clock', 'all', listener);

    // Check for noteon listener on all channels
    expect(input._userHandlers.channel.noteon['1'][0]).toBeInstanceOf(Function);
    expect(input._userHandlers.channel.noteon['2'][0]).toBeInstanceOf(Function);
    expect(input._userHandlers.channel.noteon['3'][0]).toBeInstanceOf(Function);

    // Check for noteoff listener on channel 1
    expect(input._userHandlers.channel.noteoff['1'][0]).toBeInstanceOf(Function);
    expect(input._userHandlers.channel.noteoff['2'][0]).toBeUndefined();
    expect(input._userHandlers.channel.noteoff['3'][0]).toBeUndefined();

    // Check for clock listener
    expect(input._userHandlers.system.clock[0]).toBeInstanceOf(Function);

    // Remove all listeners
    input.removeListener();

    expect(input._userHandlers).toMatchObject(emptyListeners);
  });
});
