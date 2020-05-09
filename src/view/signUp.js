import { signUp } from '../firebase.js';
import { authentification } from '../authenticationRouter.js';


export default () => {
  const signUpform = `
  <main>
  <img class="laptopPic" src="./img/laptop.png" alt="laptopPic">

    <h1>EducaChat</h1>
    
    <h2>La red de educación para jóvenes!</h2>
      
  <section class="formContainer">
          <h3>Ingresa tus datos aquí para registarte:</h3>
          <input type="email" id="email" placeholder="email">
          <input type="password" id="password" placeholder="password">
          <button class="btnSign" id="SignUp">Sign up</button>
  </section>

    <p>¿Ya tienes una cuenta? <span><a href="#/logInform">Logueate</a></span></p>
  </main>

  </main>
  `;

  const divElemt = document.createElement('div');
  // divElemt.classList.add('position');
  divElemt.innerHTML = signUpform;

  const btnSignUp = divElemt.querySelector('button');
  btnSignUp.addEventListener('click', (event) => {
    event.preventDefault();
    // console.log('SignUp Ok');
    const email = divElemt.querySelector('[type="email"]').value;
    const password = divElemt.querySelector('[type="password"]').value;
    signUp(email, password);
    authentification();
  });
  return divElemt;
};
