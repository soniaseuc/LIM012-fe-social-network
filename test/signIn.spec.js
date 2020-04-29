/* // intentando manual mock.
import mockFirebase from '../_mocks_/firebase-mock.js';
global.firebase = mockFirebase();
*/

import firebasemock from 'firebase-mock';

const mockauth = new firebasemock.MockAuthentication();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
);

// eslint-disable-next-line import/first
import { signIn, signUp, signOut } from '../src/firebase.js';

describe('signIn', () => {
  it('debería porder iniciar sesion con email: paula@gmail.com y password: 123456', () => signIn('paula@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('paula@gmail.com');
    }));
});

describe('signOut', () => {
  it('debería porder cerrar sesion con email: paula@gmail.com y password: 123456', () => signOut()
    .then((user) => {
      expect(user).toBe(undefined);
    }));
});

describe('signUp', () => {
  it('debería porder registrar un email: laboratoria@gmail.com y password: 123456', () => signUp('laboratoria@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('laboratoria@gmail.com');
    }));
});
