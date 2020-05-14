import { signIn, signInWithGoogle } from '../firestore-controller/firebase.js';
import { authentification } from '../firestore-controller/authenticationRouter.js';

export default () => {
  const logInform = `

  <img class="laptopPic" src="./img/laptop.png" alt="laptopPic">
  
    <h1>EducaChat</h1>
    
    <h2>La red de educación para jóvenes!</h2>
    <h2>¡Bienvenid@, estudiante!</h2>
    
    <section class="formContainer">
      <input type="email" id="email" placeholder="email">
      <input type="password" id="password" placeholder="password">
      <button class="btnSign" id="SignIn">Sign In</button>
    </section>

  <p>O bien ingresa con...</p>
    <input id="googleInput"></input>
  <label id="googleIcon" for=googleInput><img src="img/Google-Icon.svg"></img></label>

      <p>¿No tienes una cuenta? <span><a href="#/signUpform">Registrate</a></span></p>
  </main>
  `;

  const divElemt = document.createElement('div');
  divElemt.classList.add('signInForm');
  divElemt.innerHTML = logInform;

  const btnSignIn = divElemt.querySelector('button');
  btnSignIn.addEventListener('click', (event) => {
    event.preventDefault();
    // console.log('SignIn Ok');
    const email = divElemt.querySelector('[type="email"]').value;
    const password = divElemt.querySelector('[type="password"]').value;
    signIn(email, password);
    authentification();
  });

  const googleIcon = divElemt.querySelector('#googleIcon');
  googleIcon.addEventListener('click', (event) => {
    event.preventDefault();
    signInWithGoogle();
    authentification();
  });

  return divElemt;
};

// Funcion de Login debe validar si existe el usuario y luego redireccionar al #home

// HOME:
// Validar la existencia del usuario "currentUser"
