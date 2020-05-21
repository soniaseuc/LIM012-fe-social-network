// Now mock 'firebase`:
import firebasemock from 'firebase-mock';

jest.mock('../src/firestore-controller/firebase-storage.js', () => {
  const firebasemock = require('firebase-mock');
  const mockauth = new firebasemock.MockAuthentication();
  const mockfirestore = new firebasemock.MockFirestore();
  return new firebasemock.MockFirebaseSdk(
    null, // RTDB
    () => mockauth,
    () => mockfirestore,
  );
});


// eslint-disable-next-line import/first
import { uploadImagePost } from '../src/firestore-controller/firebase-storage.js';
// eslint-disable-next-line import/first
import { getStatus } from '../src/firestore-controller/firestore.js';

it('Deberia poder subir una img al storage', done => uploadImagePost('file', 'uid')
  .then(() => getStatus(
    (data) => {
      const result = data.find(note => note.id === 'uid');
      expect(result.file.name).toEqual('file');
      done();
    },
  )));
