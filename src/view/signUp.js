export default () => {
  //   const sectionLog = document.getElementById('logIn');

  const signUpform = `
    <section id="signUpform">
    <form>
        <h2>Ingresa tus datos aquí para registarte:</h2>
        <input type="text" placeholder="Email" required>
        <input type="text" placeholder="Password" required>
        <button type="submit" >Registrarse</button>
    </form>
    </section>
  `;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  // sectionLog.innerHTML = '';
  divElemt.innerHTML = signUpform;
  return divElemt;
};
