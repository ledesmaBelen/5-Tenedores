import * as firebase from "firebase";
//OBTENER USUARIO ACTUAL
//OBTENER CREDENCIALES
//ENVIAR CREDENCIALES A REAUNTETICATE,
//SI ES INCORRECTO DA ERROR
export function reauthenticate(password) {
  const user = firebase.auth().currentUser;
  const credencials = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );
  return user.reauthenticateWithCredential(credencials);
}
