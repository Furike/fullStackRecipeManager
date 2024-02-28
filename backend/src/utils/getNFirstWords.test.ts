import getNFirstWords from './getNFirstWords';

describe('getNFirstWords', () => {
  it('returns correct number of words', () => {
    const input = 'One two three four five six';
    const output = 'One two three...';
    expect(getNFirstWords(input, 3)).toEqual(output);
  });
});
