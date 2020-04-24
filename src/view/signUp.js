export default () => {
  const signUpform = `
    <section id="signUpform">
    <form>
        <h3>Ingresa tus datos aquí para registarte:</h3>
        <input type="email" placeholder="Email" required>
        <input type="password" placeholder="Password" required>
        <button type="submit" >Registrarse</button>
    </form>
    </section>
  `;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = signUpform;
  return divElemt;
};
