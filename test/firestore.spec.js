import MockFirebase from 'mock-cloud-firestore';

const firestoreTest = {
  __collection__: {
    post: {
      __doc__: {
        abc1d: {
          id: 'lv0i9',
          name: 'Test Sunday',
          email: 'test@gmail.com',
          status: 'me llamo test sunday. Puedes verlo?',
          date: '5/5/2020',
          visibility: 'public',
          img: '',


        },
      },
    },
  },
};

global.firebase = new MockFirebase(firestoreTest, { isNaiveSnapshotListenerEnabled: true });

// eslint-disable-next-line import/first
import { publishStatus, getStatus } from '../src/firestore-controller/firestore.js';

describe('lista de notas', () => {
  it('Debería porder agregar una nota', done => publishStatus('test Sunday', 'test@gmail.com', 'me llamo test sunday. Puedes verlo?', '5/5/2020', 'public', '', 'lv0i9')
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
