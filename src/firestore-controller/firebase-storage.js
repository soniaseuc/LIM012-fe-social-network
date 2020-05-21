
// FIRESTORAGE
export const uploadImagePost = (file, uid) => {
  const refStorage = firebase.storage().ref(`imgPost/${uid}/${file.name}`);
  refStorage.put(file).then(() => {
    console.log(`Uploaded a file ${refStorage}`);
  });
  // console.log(`soy file de firestore.js ${refStorage}`);
};
