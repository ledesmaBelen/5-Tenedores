import { app } from "../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(app);

export function stateUser() {
  firebase.auth().onAuthStateChanged((userInfo) => {
    return userInfo;
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
  db.collection("restaurants")
    .orderBy("createAt", "desc")
    .limit(limitRestaurants)
    .get()
    .then((response) => {
      return response;
    });
}

export function handleLoadMoreModels(limitRestaurants, startRestaurants) {
  db.collection("restaurants")
    .orderBy("createAt", "desc")
    .startAfter(startRestaurants.data().createAt)
    .limit(limitRestaurants)
    .get()
    .then((response) => {
      return response;
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

export async function uploadImageStorageModel(blob, imageBlob) {
  const ref = firebase.storage().ref("restaurants").child(uuid());
  await ref.put(blob).then(async (result) => {
    await firebase
      .storage()
      .ref(`restaurants/${result.metadata.name}`)
      .getDownloadURL()
      .then((photoUrl) => {
        console.log(photoUrl);
        console.log("entro en linea 125 service");
        imageBlob.push(photoUrl);
      })
      .catch((err) => console.log(err));
  });
}
