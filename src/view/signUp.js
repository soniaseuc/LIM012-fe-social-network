import { signUp } from '../firestore-controller/firebase.js';
import { authentification } from '../firestore-controller/authenticationRouter.js';


export default () => {
  const signUpform = `
  <main>
  <img class="laptopPic1" src="./img/laptop.png" alt="laptopPic">
    <main class="mainSignUp">
      <h1>EducaChat</h1>
      
      <h2>La red de educación para jóvenes!</h2>
          
      <section class="formContainer">
              <h3>Ingresa tus datos aquí para registrarte:</h3>
              <input type="email" id="email" placeholder="email">
              <input type="password" id="password" placeholder="password">
              <button class="btnSign" id="SignUp">Sign up</button>
      </section>

      <p>¿Ya tienes una cuenta? <span><a href="#/logInform">Logueate</a></span></p>
    </main>
  </main>
  `;

  const divElemt = document.createElement('div');
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
