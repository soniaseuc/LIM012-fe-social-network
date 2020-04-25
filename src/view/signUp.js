export default () => {
	const signUpform = `
    <section id="signUpform">
    <form>
        <h3>Ingresa tus datos aquí para registarte:</h3>
        <input type="email" id="email" placeholder="email">
        <input type="password" id="password" placeholder="password">
        <button onclick="signUp()" id="SignUp">Sign up</button>
    </form>
    </section>
  `;

	const divElemt = document.createElement('div');
	// divElemt.classList.add('position');
	divElemt.innerHTML = signUpform;
	return divElemt;
};
