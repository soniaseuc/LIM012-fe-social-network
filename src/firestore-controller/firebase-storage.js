
// FIRESTORAGE
export const uploadImagePost = (file, uid) => {
  const refStorage = firebase.storage().ref(`imgPost/${uid}/${file.name}`);
  console.log(`soy file de firestore.js ${refStorage}`);
  console.log(`refStorage.put(file) ${refStorage.put(file)}`);
  return refStorage.put(file);
};
