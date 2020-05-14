import { changeTmp } from './view-controller/router.js';
// import logIn from './view/logIn.js';


// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyCeNrkvdzWB6_ox2aAbSB_RcooqZzS4KHc',
//   authDomain: 'social-network-a68c0.firebaseapp.com',
//   databaseURL: 'https://social-network-a68c0.firebaseio.com',
//   projectId: 'social-network-a68c0',
//   storageBucket: 'social-network-a68c0.appspot.com',
//   messagingSenderId: '427677359698',
//   appId: '1:427677359698:web:27d4064d69fbe191ed898b',
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);


// educaChat = project = socialNetwork => educhatlim012@gmail.com
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC8VlB-iWOQRvOwVFFlkIciTeygM1aEkVU',
  authDomain: 'socialnetwork-59f0d.firebaseapp.com',
  databaseURL: 'https://socialnetwork-59f0d.firebaseio.com',
  projectId: 'socialnetwork-59f0d',
  storageBucket: 'socialnetwork-59f0d.appspot.com',
  messagingSenderId: '661343392066',
  appId: '1:661343392066:web:558cb276d45c2d3916f8db',
  measurementId: 'G-GL7ZK0PFNX',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export const storage = firebase.storage();


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


const numeroDeEntradas = window.history.length;
console.log(numeroDeEntradas);
