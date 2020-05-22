// Now mock 'firebase`:
import firebasemock from 'firebase-mock';

// const firestoreTest = {
//   __collection__: {
//     imgPost: {
//       __doc__: {
//         DbOyaYk8eeb4pxpBeNNQyOb095O2: {
//           name: 'Sonia Seuc Alvarez1.jpg',
//         },
//       },
//     },
//   },
// };

// jest.mock('../src/firestore-controller/firebase-storage.js', () => {
// const firebasemock = require('firebase-mock');
const mockauth = new firebasemock.MockAuthentication();
const mockfirestore = new firebasemock.MockFirestore();

global.firebase = firebasemock.MockFirebaseSdk(
  null, // RTDB
  () => mockauth,
  () => mockfirestore,
);
// });


// eslint-disable-next-line import/first
import { uploadImagePost } from '../src/firestore-controller/firebase-storage.js';
// eslint-disable-next-line import/first
// import { getStatus } from '../src/firestore-controller/firestore.js';

it('Deberia poder subir una img al storage', done => uploadImagePost('file', 'uid')
  .then((data) => {
    const result = data.find(note => note.id === 'uid');
    expect(result.file.name).toEqual('/imgPost/DbOyaYk8eeb4pxpBeNNQyOb095O2/Sonia Seuc Alvarez1.jpg');
    done();
  }));
