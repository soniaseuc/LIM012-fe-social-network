// Now mock 'firebase`:
import firebasemock from 'firebase-mock';

// import getStatus from '../src/firestore-controller/firestore.js';

const mockauth = new firebasemock.MockAuthentication();
global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
);
// jest.mock('../src/firestore-controller/firebase-storage.js', () => {
//   const mockfirestore = new firebasemock.MockFirestore();
//   return new firebasemock.MockFirebaseSdk(
//     null, // RTDB
//     () => mockauth,
//     () => mockfirestore,
//   );
// });


// eslint-disable-next-line import/first
import { uploadImagePost } from '../src/firestore-controller/firebase-storage.js';
// eslint-disable-next-line import/first
// import { getStatus } from '../src/firestore-controller/firestore.js';

const img = {
  file: {
    name: 'hola.png',
  },
  uid: '38cj4',
};

// const user = {
//   file: 'user.png',
//   uid: '38cj4',
// };
// console.log(uploadImagePost(img.file, img.uid));
// console.log();


it('Deberia poder subir una img al storage', (done) => {
  const response = uploadImagePost(img.file, img.uid);
  console.log(response.fullPath);

  try {
    // console.log(response);
    expect(response.fullPath).toEqual(`imgPost/${img.uid}/${img.file.name}`);
    done();
  } catch (error) {
    // done(error);
    console.log(error.message);
  }
  // test('the data is peanut butter', done => {
  // function callback(data) {
  //   try {
  //     expect(data).toBe('peanut butter');
  //     done();
  //   } catch (error) {
  //     done(error);
  //   }
  // }

  // fetchData(callback);
});

// .then(() => {
//   // console.log(response);
//   // const result = data.find(note => note.img === `imgPost/${img.uid}/${img.file}`);
//   expect('imgPost/38cj4/hola.png').toEqual(`imgPost/${img.uid}/${img.file}`);
//   done();
// })
// .catch((error) => {
//   // The document probably doesn't exist.
//   console.error('Error updating document: ', error);
// }));

// it('Deberia poder subir una img al storage', done => uploadImagePost(img.file, img.uid)
//   .then(() => getStatus(
//     (data) => {
//       const result = data.find(note => note.img === `imgPost/${img.uid}/${img.file}`);
//       expect(result.file.name).toEqual();
//       done();
//     },
//   )));
