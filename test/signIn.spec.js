/* // intentando manual mock. 
import mockFirebase from '../_mocks_/firebase-mock.js';
global.firebase = mockFirebase();
*/
import { signIn, signUp, signOut } from '../src/data.js';


describe('signIn', () => {
	it('debería porder iniciar sesion con email: paula@gmail.com y password: 123456', () => {
		return signIn('paula@gmail.com', '123456')
		.then((user) => {
			expect(user.email).toBe('paula@gmail.com')
		})
	});
})

describe('signOut', () => {
	it('debería porder cerrar sesion con email: paula@gmail.com y password: 123456', () => {
		return signIn('paula@gmail.com', '123456')
		.then((user) => {
			expect(user.email).toBe(undefined)
		})
	});
})

describe('signUp', () => {
	it('debería porder registrar un email: laboratoria@gmail.com y password: 123456', () => {
		return signIn('laboratoria@gmail.com', '123456')
		.then((user) => {
			expect(user.email).toBe('laboratoria@gmail.com')
		})
	});
})
