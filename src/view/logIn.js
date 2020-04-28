import { signIn, authentification } from '../firebase.js';

export default () => {
	const logInform = `
  <h2>¡Bienvenid@, estudiante!</h2>
  <div id="formContainer">
    <input type="email" id="email" placeholder="email">
    <input type="password" id="password" placeholder="password">
    <button class="btnSign" id="SignIn">Sign In</button>
  </div>
	<p>O bien ingresa con...</p>
	<input id="fbInput"></input>
	<label id="fbIcon" for=fbInput> <img src="../img/social-facebook-button-blue-icon.png"></img></label>
	<input id="googleInput"></input>
	<label id="googleIcon" for=googleInput><img src="../img/Google-Icon.svg"></img></label>

  <p>¿No tienes una cuenta? <span><a href="#/signUpform">Registrate</a></span></p>
    `;

	const divElemt = document.createElement('div');
	divElemt.classList.add('signInForm');
	divElemt.innerHTML = logInform;
	const btnSignIn = divElemt.querySelector('button');
	btnSignIn.addEventListener('click', (event) => {
		event.preventDefault();
		console.log('SignIn Ok');
		const email = divElemt.querySelector('[type="email"]').value;
		const password = divElemt.querySelector('[type="password"]').value;
		signIn(email, password);
		authentification();
	});
	return divElemt;
};

// Funcion de Login debe validar si existe el usuario y luego redireccionar al #home

// HOME:
// Validar la existencia del usuario "currentUser"
