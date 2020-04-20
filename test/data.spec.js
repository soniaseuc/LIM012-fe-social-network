import { data } from '../src/data.js';

describe('data', () => {
  it('debería ser una función', () => {
    expect(typeof data).toBe('function');
  });
});
