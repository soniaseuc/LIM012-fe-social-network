export default () => {
  const logInform = `
  <h2>¡Bienvenid@, estudiante!</h2>
    <input type="text" placeholder="Email">
    <input type="text" placeholder="Password">
    <button>Log in</button>
    <p>O bien ingresa con...</p>
  <ul>
    <li><a href="#/Facebook">Facebook</a></li>
    <li><a href="#/google">google</a></li>
  </ul>
  <p>¿No tienes una cuenta? <span><a href="#/signUpform">Registrate</a></span></p>
    `;

  const divElemt = document.createElement('div');
  // divElemt.classList.add('position');
  divElemt.innerHTML = logInform;
  return divElemt;
};
