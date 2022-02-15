import * as firebase from "firebase";

export function updateName(setisLoading, setreloadUserInfo, setShowModal, update){
    firebase
    .auth()
    .currentUser.updateProfile(update)
    .then(() => {
      setisLoading(false);
      setreloadUserInfo(true);
      setShowModal(false);
    })
    .catch((err) => {
      seterror("error al actualizar el nombre");
      console.log(err);
      setisLoading(false);
    });
}

export function updateEmail(formData, setIsLoading, setreloadUserInfo, setShowModal, setErrors){
    firebase
    .auth()
    .currentUser.updateEmail(formData.email)
    .then(() => {
      setIsLoading(false);
      setreloadUserInfo(true);
      setShowModal(false);
    })
    .catch(() => {
      setErrors("Error al actualizar el email");
      setIsLoading(false);
    });
}

export function updatePass(isSetErrors, setIsLoading, setShowModal, formData){
    firebase
    .auth()
    .currentUser.updatePassword(formData.newPassword)
    .then(() => {
      isSetErrors = false;
      setIsLoading(false);
      setShowModal(false);
      console.log(formData.password);
      firebase.auth().signOut();
    })
    .catch(() => {
      errorsTemp = {
        other: "Error al actualizar la contraseña",
      };
      setIsLoading(false);
    });
}

export const uploadImage = async (uri, setloadingText, setloading, uid) => {
  setloadingText("Actualizando Avatar");
  setloading(true);
  const response = await fetch(uri);
  const blob = await response.blob();

  const ref = firebase.storage().ref().child(`avatar/${uid}`);
  return ref.put(blob);
};

export const updatePhotoUrl = (setloading, uid) => {
  firebase
    .storage()
    .ref(`avatar/${uid}`)
    .getDownloadURL()
    .then(async (response) => {
      console.log(response);
      const update = {
        photoURL: response,
      };
      await firebase.auth().currentUser.updateProfile(update);
      setloading(false);
    })
    .catch(() => {
      console.log("Error al actualizar el avatar");
    });
};


