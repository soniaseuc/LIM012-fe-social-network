import { signUp, authentification } from '../firebase.js';

export default () => {
	const signUpform = `
    <section id="signUpform">
    <form>
        <h3>Ingresa tus datos aquí para registarte:</h3>
        <input type="email" id="email" placeholder="email">
        <input type="password" id="password" placeholder="password">
        <button class="btnSign" id="SignUp">Sign up</button>
    </form>
    </section>
  `;

	const divElemt = document.createElement('div');
	// divElemt.classList.add('position');
	divElemt.innerHTML = signUpform;

	const btnSignUp = divElemt.querySelector('button');
	btnSignUp.addEventListener('click', (event) => {
		event.preventDefault();
		console.log('SignUp Ok');
		const email = divElemt.querySelector('[type="email"]').value;
		const password = divElemt.querySelector('[type="password"]').value;
		signUp(email, password);
		authentification();
	});
	return divElemt;
};
