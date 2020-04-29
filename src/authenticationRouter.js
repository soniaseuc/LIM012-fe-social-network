export const authentification = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Take user to a different or home page
      // User is signed in
      // myCurrentUser();
      window.location.hash = '#/home';
    } else {
      // no user is signed in
      window.location.hash = '#/';
    }
  });
};
