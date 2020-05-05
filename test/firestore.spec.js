import MockFirebase from 'mock-cloud-firestore';

const firestoreTest = {
  __collection__: {
    notes: {
      __doc__: {
        abc1d: {
          date: '5/5/2020',
          name: 'Test Sunday',
          status: 'me llamo test sunday. Pueder verlo?',
        },
      },
    },
  },
};
global.firebase = new MockFirebase(firestoreTest, { isNaiveSnapshotListenerEnabled: true });

// eslint-disable-next-line import/first
import { publishStatus, getStatus } from '../src/firestore.js';

describe('lista de notas', () => {
  it('Debería porder agregar una nota', done => publishStatus('Test Sunday', 'me llamo test sunday. Pueder verlo?')
    .then(() => getStatus(
      (data) => {
        const result = data.find(note => note.status === 'me llamo test sunday. Pueder verlo?');
        expect(result.status).toBe('me llamo test sunday. Pueder verlo?');
        done();
      },
    )));
});
