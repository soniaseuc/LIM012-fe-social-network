// import { getStatus } from './firestore.js';
export const currentUserUid = () => firebase.auth().currentUser;

export const authentification = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Take user to a different or home page
      // User is signed in
      const myUser = currentUserUid();
      window.localStorage.setItem('email', myUser.email);
      window.location.hash = '#/home';
    } else {
      // no user is signed in
      window.location.hash = '#/';
    }
  });
};
