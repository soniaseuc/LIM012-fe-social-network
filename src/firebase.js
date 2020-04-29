
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
//   }
//   return firebase.auth().currentUser;
// };


// otra funcion solo para devolver el currentUser
// export const signInWithGoogle = () => {
//   // Create an instance of the Google provider object
//   const provider = new firebase.auth.GoogleAuthProvider();
//   return firebase.auth().signInWithPopup(provider);
// };

// export const signInWithFacebook = () => {
// const provider = new firebase.auth.FacebookAuthProvider();
// return firebase.auth().signInWithPopup(provider);
// };
