import { components } from '../view/index.js';

// controlar el cambio de la vista == view-controler
export const changeTmp = (hash) => {
  const id = hash.split('/')[1];
  const sectionMain = document.getElementById('logIn');
  sectionMain.innerHTML = '';

  switch (hash) {
    case '':
    case '#':
    case '#/':
    { return sectionMain.appendChild(components.logInform()); }
    case '#/signUpform':
    case '#/logInform':
    case '#/profile':
    { return sectionMain.appendChild(components[id]()); }
    case '#/home':
    { return sectionMain.appendChild(components.home()); }
    default:
      return sectionMain.appendChild(components.different());
  }
};

// Your web app's Firebase configuration

// const firebaseConfig = {
// apiKey: 'AIzaSyDIY0_9hxFXSshWgzZz6SZA7kZBy4LDXVg',
// authDomain: 'testauthentication-f576c.firebaseapp.com',
// databaseURL: 'https://testauthentication-f576c.firebaseio.com',
// projectId: 'testauthentication-f576c',
// storageBucket: 'testauthentication-f576c.appspot.com',
// messagingSenderId: '602622699268',
// appId: '1:602622699268:web:ca55eac0521d4da60c9251',
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();

// export const signUp = () => {
// const email = document.getElementById('email');
// const password = document.getElementById('password');
// const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
// promise.catch(e => alert(e.message));
// alert('Signed Up');
// };

// export const signIn = () => {
// const email = document.getElementById('email');
// const password = document.getElementById('password');
// const promise = auth.signInWithEmailAndPassword(email.value, password.value);
// promise.catch(e => alert(e.message));
// };

// export const signOut = () => {
// auth.signOut();
// alert('Signed Out');
// };

// auth.onAuthStateChanged((user) => {
// if (user) {
// const email = user.email;
// alert(`Active User ${email}`);
// // Take user to a different or home page
// // is signed in
// } else {

// alert('No Active User');

// // no user is signed in
// }
// });
