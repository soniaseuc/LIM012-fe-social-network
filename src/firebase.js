
// eslint-disable-next-line max-len
export const signUp = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

// eslint-disable-next-line max-len
export const signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

export const signOut = () => firebase.auth().signOut();


// export const myCurrentUser = () => {
//   const user = firebase.auth().currentUser;
//   let email;
//   if (user != null) {
//   // User is signed in.
//     email = user.email;
//     console.log(`active user ${email}`);
//     // alert(`Active User ${email}`);
//     return user.email;
//   }
//   return ('anonimo');
// };

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};


// export const signInWithGoogle = () => {
//   const provider = new firebase.auth.GoogleAuthProvider();
//   firebase.auth().signInWithPopup(provider)
//     .then(() => {
//       const user = firebase.auth().currentUser;
//       if (user != null) {
//         user.providerData.forEach((profile) => {
//           console.log(`Sign-in provider: ${profile.providerId}`);
//           // console.log(`  Provider-specific UID: ${profile.uid}`);
//           console.log(`  Name: ${profile.displayName}`);
//           console.log(`  Email: ${profile.email}`);
//           console.log(`  Photo URL: ${profile.photoURL}`);
//         });
//       }
//     })
//     .catch((error) => {
//     // Handle Errors here.
//       const errorCode = error.code;
//       console.log(`errorCode = ${errorCode}`);
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       console.error(`errorMessage = ${errorMessage}`);
//       const email = error.email;
//       // The firebase.auth.AuthCredential type that was used.
//       console.log(`email = ${email}`);
//       const credential = error.credential;
//       // ...
//       console.log(`credential = ${credential}`);
//     });
// };




/*
// Handle Errors here.
const errorCode = error.code;
// console.log(`errorCode = ${errorCode}`);
const errorMessage = error.message;
// The email of the user's account used.
// console.error(`errorMessage = ${errorMessage}`);

const email = error.email;
// The firebase.auth.AuthCredential type that was used.
// console.log(`email = ${email}`);

const credential = error.credential;
// ...
// console.log(`credential = ${credential}`);
*/
