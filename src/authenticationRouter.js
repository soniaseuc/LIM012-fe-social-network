// import { getStatus } from './firestore.js';


export const authentification = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Take user to a different or home page
      // User is signed in
      const myUser = firebase.auth().currentUser;
      window.localStorage.setItem('email', myUser.email);
      window.location.hash = '#/home';
      if (myUser != null) {
        // const emailId = myUser.email;
        // console.log(firebase.auth().currentUser.uid);
        // console.log(`myUser.uid => ${myUser.uid}`);
        // document.getElementById('fulanita').innerHTML = `Hola ${emailId}`;
        // console.log(emailId);
        // getStatus();
      }
    } else {
      // no user is signed in
      window.location.hash = '#/';
    }
  });
};
