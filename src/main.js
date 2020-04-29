import { changeTmp } from './view-controller/router.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCeNrkvdzWB6_ox2aAbSB_RcooqZzS4KHc',
  authDomain: 'social-network-a68c0.firebaseapp.com',
  databaseURL: 'https://social-network-a68c0.firebaseio.com',
  projectId: 'social-network-a68c0',
  storageBucket: 'social-network-a68c0.appspot.com',
  messagingSenderId: '427677359698',
  appId: '1:427677359698:web:27d4064d69fbe191ed898b',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const init = () => {
  changeTmp(window.location.hash);
  window.addEventListener('hashchange', () => changeTmp(window.location.hash));
};
window.addEventListener('load', init);

// AGREGAR O ELIMINAR CLASE A <LI>,ACTIVAR AL HACER CLICK
const ul = document.querySelector('ul');
const li = document.querySelectorAll('li');

li.forEach((el) => {
  el.addEventListener('click', () => {
    ul.querySelector('.active').classList.remove('active');
    el.classList.add('active');
  });
});

// data();
// MVC para correr test
