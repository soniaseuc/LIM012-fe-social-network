
// FIRESTORAGE
export const uploadImagePost = (file, uid) => {
  const refStorage = firebase.storage().ref(`imgPost/${uid}/${file.name}`);
  refStorage.put(file);
  return refStorage;
};

/** FIRESTORE STORAGE DELETE FILE
  export const deleteImagePost = (file, uid) => {
    // Create a reference to the file to delete
    const desertRef = firebase.storage().ref(`imgPost/${uid}/${file.name}`);
    // Delete the file
    desertRef.delete().then(() => {
      // File deleted successfully
    }).catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error.message);
    });
};
*/
