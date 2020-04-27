import { signIn } from '../src/data.js';

describe('signIn', () => {
	it('debería porder iniciar sesion con email: paula@gmail.com y password: 123456', () => {
		return signIn('front@end.la', '123456')
			.then((user) => {
				expect(user.email).toBe('front@end.la');
			});
	});
});
