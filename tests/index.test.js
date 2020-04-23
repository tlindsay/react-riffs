import * as Riffs from '../src/';

describe('the package', () => {
  test('exports all of the correct hooks', () => {
    expect(Riffs).toHaveProperty('useMidiInputs');
    expect(Riffs).toHaveProperty('useNote');
    expect(Riffs).toHaveProperty('useNotes');
    expect(Riffs).toHaveProperty('useClock');
    expect(Riffs).toHaveProperty('usePitchbend');
  });
});
