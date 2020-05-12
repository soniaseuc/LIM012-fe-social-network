import MockFirebase from 'mock-cloud-firestore';

const firestoreTest = {
  __collection__: {
    post: {
      __doc__: {
        abc1d: {
          date: '5/5/2020',
          name: 'Test Sunday',
          status: 'me llamo test sunday. Puedes verlo?',
        },
      },
    },
  },
};

global.firebase = new MockFirebase(firestoreTest, { isNaiveSnapshotListenerEnabled: true });

// eslint-disable-next-line import/first
import { publishStatus, getStatus } from '../src/firestore.js';

describe('lista de notas', () => {
  it('Debería porder agregar una nota', done => publishStatus('test Sunday', 'me llamo test sunday. Puedes verlo?')
    .then(() => getStatus(
      (data) => {
        const result = data.find(note => note.status === 'me llamo test sunday. Puedes verlo?');
        expect(result.status).toBe('me llamo test sunday. Puedes verlo?');
        done();
      },
    )));
});

//   it('Debería poder eliminar una nota', done => deleteNote('abc1d')
//     .then(() => getNotes(
//       (data) => {
//         const result = data.find(note => note.id === 'abc1d');
//         expect(result).toBe(undefined);
//         done();
//       },
//     )));
