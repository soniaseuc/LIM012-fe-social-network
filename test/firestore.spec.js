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
          date: '5/5/2020 10:05:11',
          visibility: 'public',
          img: '',
        },
      },
    },
  },
};

global.firebase = new MockFirebase(firestoreTest, { isNaiveSnapshotListenerEnabled: true });

// eslint-disable-next-line import/first
import {
  publishStatus, getStatus, deletePublication, editNote, changeVisibility,
} from '../src/firestore-controller/firestore.js';


// describe('crear y mostrar post', () => {
// eslint-disable-next-line max-len
// it('Debería porder agregar una nota', done => publishStatus('test Sunday', 'test@gmail.com', 'me llamo test sunday. Puedes verlo?', '5/5/2020 10:05:11', 'public', '', 'lv0i9')
//     .then(() => getStatus(
//       (data) => {
//         const result = data.find(note => note.status === 'me llamo test sunday. Puedes verlo?');
//         expect(result.status).toBe('me llamo test sunday. Puedes verlo?');
//         done();
//       },
//     )));
// });

describe('crear y mostrar post', () => {
// eslint-disable-next-line max-len
  it('Debería porder agregar una nota', done => publishStatus('test Sunday', 'test@gmail.com', 'me llamo test sunday. Puedes verlo?', '5/5/2020 10:05:11', 'public', '', 'lv0i9')
    //  la funcion que publica un post creea un documento en el mock server => promesa
    .then(() => {
      const callback = (data) => {
        const result = data.find(note => note.data().status === 'me llamo test sunday. Puedes verlo?');
        expect(result.data().status).toBe('me llamo test sunday. Puedes verlo?');
        done();
      };
      getStatus(callback);
    }));

  it('Debería poder modificar una nota', done => editNote('abc1d', 'me llamo test sunday')
    .then(() => {
      const callback = (data) => {
        const result = data.find(note => note.id === 'abc1d');
        expect(result.data().status).toBe('me llamo test sunday');
        done();
      };
      getStatus(callback);
    }));

  it('Debería poder modificar si es publico o privado', done => changeVisibility('abc1d', 'private')
    .then(() => getStatus(
      (data) => {
        const result = data.find(note => note.id === 'abc1d');
        expect(result.data().visibility).toEqual('private');
        done();
      },
    )));
  it('Debería poder eliminar una nota', done => deletePublication('abc1d')
    .then(() => getStatus(
      (data) => {
        const result = data.find(note => note.id === 'abc1d');
        expect(result).toBe(undefined);
        done();
      },
    )));
});
