import { app } from "../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(app);

export function stateUser() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      resolve(userInfo);
    });
  });
}

export function sizeRestaurantsModel() {
  db.collection("restaurants")
    .get()
    .then((snap) => {
      return snap.size;
    });
}

export function listRestaurantsModel(limitRestaurants) {
  return new Promise((resolve, reject) => {
    db.collection("restaurants")
      .orderBy("createAt", "desc")
      .limit(limitRestaurants)
      .get()
      .then((response) => {
        resolve(response);
      });
  });
}

export function handleLoadMoreModels(limitRestaurants, startRestaurants) {
  return new Promise((resolve, reject) => {
    db.collection("restaurants")
      .orderBy("createAt", "desc")
      .startAfter(startRestaurants.data().createAt)
      .limit(limitRestaurants)
      .get()
      .then((response) => {
        resolve(response);
      });
  });
}

export function addRestaurantModels(
  restaurantName,
  restaurantAddress,
  restaurantDescription,
  locationRestaurant,
  response
) {
  db.collection("restaurants")
    .add({
      name: restaurantName,
      address: restaurantAddress,
      descrption: restaurantDescription,
      location: locationRestaurant,
      images: response,
      rating: 0,
      quantifyVoting: 0,
      createAt: new Date(),
      createBy: firebase.auth().currentUser.uid,
    })
    .then(() => {
      console.log(
        "ENTRO POR THEN Y RETORNA TRUE LINEA 85 AGREGAR RESTAURANT SERVICE"
      );
    })
    .catch((err) => {
      console.log(err);
      console.log("ENTRO POR CATCH Y RETORNA FALSE ADD RESTAURANT SERVICE");
    });
}

export async function uploadImageStorageModel(result) {
  return new Promise((resolve, reject) => {
    firebase
      .storage()
      .ref(`restaurants/${result.metadata.name}`)
      .getDownloadURL()
      .then((photoUrl) => {
        console.log(photoUrl);
        resolve(photoUrl);
      })
      .catch((err) => console.log(err));
  });
}
