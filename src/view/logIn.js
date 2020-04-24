export default () => {
  const logInform = `
  <h2>¡Bienvenid@, estudiante!</h2>
  <form>
    <input type="email" placeholder="Email" required>
    <input type="password" placeholder="Password" required>
    <button type="submit">Log in</button>
    </form>
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

// Funcion de Login debe validar si existe el usuario y luego redireccionar al #home

// HOME: 
 // Validar la existencia del usuario "currentUser"