const auth = jest.fn(() => ({
  signInWithEmailAndPassword: (email, password) => new Promise((resolve) => {
    resolve({ email });
  }),
}));

// const firebase = {
//   auth,
// };


// export default jest.fn(()=> firebase);
