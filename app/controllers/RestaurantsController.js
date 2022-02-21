import * as ImagePicker from "expo-image-picker";
import { map, result, size } from "lodash";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import uuid from "random-uuid-v4";
import { app } from "../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import {
  stateUser,
  sizeRestaurantsModel,
  listRestaurantsModel,
  handleLoadMoreModels,
  addRestaurantModels,
  uploadImageStorageModel,
} from "../models/restaurantModel";
//FUNCION DE LIST RESTAURANTS
export function goRestaurant() {
  console.log("Ok");
}

//RESTAURANTS
//DEFINICION DE DB
const db = firebase.firestore(app);

// // export function verifState(setuser) {
// //   firebase.auth().onAuthStateChanged((userInfo) => {
// //     setuser(userInfo);
// //   });
// // }

// export function sizeRestaurants(settotalRestaurants) {
//   settotalRestaurants(sizeRestaurantsModel());
// }

// export function listRestaurantes(
//   limitRestaurants,
//   setrestaurants,
//   setstartRestaurants
// ) {
//   const resultRestaurants = [];
//   db.collection("restaurants")
//     .orderBy("createAt", "desc")
//     .limit(limitRestaurants)
//     .get()
//     .then((response) => {
//       setstartRestaurants(response.docs[response.docs.length - 1]);

//       response.forEach((doc) => {
//         const restaurant = doc.data();
//         restaurant.id = doc.id;
//         resultRestaurants.push(restaurant);
//       });
//     });

//   console.log("entro en funcion listarestaurant SERVICE");
//   setrestaurants(resultRestaurants);
// }

// export function reload(
//   settotalRestaurants,
//   limitRestaurants,
//   setstartRestaurants,
//   setrestaurants
// ) {
//   sizeRestaurants(settotalRestaurants);

//   const resultRestaurants = [];

//   db.collection("restaurants")
//     .orderBy("createAt", "desc")
//     .limit(limitRestaurants)
//     .get()
//     .then((response) => {
//       setstartRestaurants(response.docs[response.docs.length - 1]);

//       response.forEach((doc) => {
//         const restaurant = doc.data();
//         restaurant.id = doc.id;
//         resultRestaurants.push(restaurant);
//       });
//       setrestaurants(resultRestaurants);
//     });
// }

// export function handleLoadMoreController(
//   restaurants,
//   setisLoading,
//   startRestaurants,
//   limitRestaurants,
//   setstartRestaurants,
//   setrestaurants,
//   totalRestaurants
// ) {
//   const resultRestaurants = [];
//   restaurants.length < totalRestaurants && setisLoading(true);
//   db.collection("restaurants")
//     .orderBy("createAt", "desc")
//     .startAfter(startRestaurants.data().createAt)
//     .limit(limitRestaurants)
//     .get()
//     .then((response) => {
//       if (response.docs.length > 0) {
//         setstartRestaurants(response.docs[response.docs.length - 1]);
//       } else {
//         setisLoading(false);
//       }
//       response.forEach((doc) => {
//         const restaurant = doc.data();
//         restaurant.id = doc.id;
//         resultRestaurants.push(restaurant);
//       });

//       setrestaurants([...restaurants, ...resultRestaurants]);
//       console.log("hable more con exito");
//     });
// }

// export function validarInfoResto(
//   restaurantName,
//   restaurantAddress,
//   restaurantDescription,
//   imagesSelected,
//   locationRestaurant
// ) {
//   if (!restaurantName || !restaurantAddress || !restaurantDescription) {
//     console.log("Todos los campos son obligatorios");
//     return false;
//   } else if (!imagesSelected) {
//     console.log("El restaurante debe tener una fotografia");
//     return false;
//   } else if (!locationRestaurant) {
//     console.log("Tienes que localizar el restaurante en el mapa");
//     return false;
//   } else {
//     return true;
//   }
// }
// export function addRestaurantController(
//   restaurantName,
//   restaurantAddress,
//   restaurantDescription,
//   locationRestaurant,
//   response
// ) {
//   db.collection("restaurants")
//     .add({
//       name: restaurantName,
//       address: restaurantAddress,
//       descrption: restaurantDescription,
//       location: locationRestaurant,
//       images: response,
//       rating: 0,
//       quantifyVoting: 0,
//       createAt: new Date(),
//       createBy: firebase.auth().currentUser.uid,
//     })
//     .then(() => {
//       console.log(
//         "ENTRO POR THEN Y RETORNA TRUE LINEA 85 AGREGAR RESTAURANT SERVICE"
//       );
//     })
//     .catch((err) => {
//       console.log(err);
//       console.log("ENTRO POR CATCH Y RETORNA FALSE ADD RESTAURANT SERVICE");
//     });
// }

// export async function uploadImageStorageService(imagesSelected) {
//   const imageBlob = [];
//   const response = await fetch(imagesSelected);
//   const blob = await response.blob();

//   const ref = firebase.storage().ref("restaurants").child(uuid());
//   await ref.put(blob).then(async (result) => {
//     await firebase
//       .storage()
//       .ref(`restaurants/${result.metadata.name}`)
//       .getDownloadURL()
//       .then((photoUrl) => {
//         console.log(photoUrl);
//         console.log("entro en linea 125 service");
//         imageBlob.push(photoUrl);
//       })
//       .catch((err) => console.log(err));
//   });

//   return imageBlob[0];
// }

// export async function obtenerlaLocalizacionService(setLocation) {
//   const result = await Location.requestForegroundPermissionsAsync();

//   if (result.status !== "granted") {
//     console.log("Permission to access location was denied");
//   } else {
//     const loc = await Location.getCurrentPositionAsync({});
//     const loca = {
//       latitude: loc.coords.latitude,
//       longitude: loc.coords.longitude,
//       latitudeDelta: 0.001,
//       longitudeDelta: 0.001,
//     };
//     setLocation(loca);
//   }
// }

// export async function imageSelectService(setimagesSelected) {
//   let permissionResult =
//     await ImagePicker.requestMediaLibraryPermissionsAsync();

//   if (permissionResult.granted === false) {
//     console.log("Se require que acepte los permisos");
//   } else {
//     let pickerResult = await ImagePicker.launchImageLibraryAsync();

//     if (pickerResult.cancelled) {
//       console.log("Necesita seleccionar una imagen");
//     } else {
//       setimagesSelected(pickerResult.uri);
//     }
//   }
// }

//CODIGO PARA MODELS

export async function verifState(setuser) {
  const restul = await stateUser();
  console.log(restul);
}

export function listRestaurantes(
  limitRestaurants,
  setrestaurants,
  setstartRestaurants
) {
  const resultRestaurants = [];
  const response = listRestaurantsModel(limitRestaurants);
  setstartRestaurants(response.docs[response.docs.length - 1]);

  response.forEach((doc) => {
    const restaurant = doc.data();
    restaurant.id = doc.id;
    resultRestaurants.push(restaurant);
  });

  setrestaurants(resultRestaurants);
}

export function reload(
  settotalRestaurants,
  limitRestaurants,
  setstartRestaurants,
  setrestaurants
) {
  sizeRestaurants(settotalRestaurants);

  const resultRestaurants = [];
  const response = listRestaurantsModel(limitRestaurants);

  setstartRestaurants(response.docs[response.docs.length - 1]);

  response.forEach((doc) => {
    const restaurant = doc.data();
    restaurant.id = doc.id;
    resultRestaurants.push(restaurant);
  });
  setrestaurants(resultRestaurants);
}

export function handleLoadMoreController(
  restaurants,
  setisLoading,
  startRestaurants,
  limitRestaurants,
  setstartRestaurants,
  setrestaurants,
  totalRestaurants
) {
  const resultRestaurants = [];
  restaurants.length < totalRestaurants && setisLoading(true);
  const response = handleLoadMoreModels(limitRestaurants, startRestaurants);
  if (response.docs.length > 0) {
    setstartRestaurants(response.docs[response.docs.length - 1]);
  } else {
    setisLoading(false);
  }
  response.forEach((doc) => {
    const restaurant = doc.data();
    restaurant.id = doc.id;
    resultRestaurants.push(restaurant);
  });

  setrestaurants([...restaurants, ...resultRestaurants]);
}

export function addRestaurantController(
  restaurantName,
  restaurantAddress,
  restaurantDescription,
  locationRestaurant,
  response
) {
  addRestaurantModels(
    restaurantName,
    restaurantAddress,
    restaurantDescription,
    locationRestaurant,
    response
  );
}

export async function uploadImageStorageService(imagesSelected) {
  const imageBlob = [];
  const response = await fetch(imagesSelected);
  const blob = await response.blob();

  uploadImageStorageModel(blob, imageBlob);

  return imageBlob[0];
}
