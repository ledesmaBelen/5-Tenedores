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

