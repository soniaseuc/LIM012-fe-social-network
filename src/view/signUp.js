export default () => {
  //   const sectionLog = document.getElementById('logIn');

  const signUpform = `
    <section id="signUpform">
    <h2>Ingresa tus datos aquí para registarte:</h2>
    <input type="text" placeholder="Email">
    <input type="text" placeholder="Password">
    <button>Registrarse</button>
    </section>
  `;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  // sectionLog.innerHTML = '';
  divElemt.innerHTML = signUpform;
  return divElemt;
};
