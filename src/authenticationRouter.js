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
        const emailId = myUser.email;
        // document.getElementById('fulanita').innerHTML = `Hola ${emailId}`;
        console.log(emailId);
        // getStatus();
      }
    } else {
      // no user is signed in
      window.location.hash = '#/';
    }
  });
};


// const user = firebase.auth().currentUser;

// user.updateProfile({
//   displayName: 'Jane Q. User',
//   photoURL: 'https://example.com/jane-q-user/profile.jpg',
// }).then(() => {
//   // Update successful.
// }).catch((error) => {
//   // An error happened.
// });


// export const user = () => firebase.auth().currentUser;

// export const myUser = () => {
//   const user = firebase.auth().currentUser;
//   if (user != null) {
//     user.providerData.forEach((profile) => {
//       console.log(`Sign-in provider: ${profile.providerId}`);
//       console.log(`  Provider-specific UID: ${profile.uid}`);
//       console.log(`  Name: ${profile.displayName}`);
//       console.log(`  Email: ${profile.email}`);
//       console.log(`  Photo URL: ${profile.photoURL}`);
//     });
//   } return user;
// };
