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
  addRestaurantModels,
  uploadImageStorageModel,
  handleLoadMoreModels,
} from "../models/restaurantModel";

//FUNCION DE LIST RESTAURANTS
export function goRestaurant() {
  console.log("Ok");
}

//RESTAURANTS
//DEFINICION DE DB
const db = firebase.firestore(app);

export async function verifState(setuser) {
  try {
    const datos = await stateUser();
    setuser(datos);
  } catch (err) {
    console.log(err);
  }
}

export function sizeRestaurants(settotalRestaurants) {
  settotalRestaurants(sizeRestaurantsModel());
}

export async function listRestaurantes(
  limitRestaurants,
  setrestaurants,
  setstartRestaurants
) {
  const resultRestaurants = [];
  const result = await listRestaurantsModel(limitRestaurants);

  setstartRestaurants(result.docs[result.docs.length - 1]);

  result.forEach((doc) => {
    const restaurant = doc.data();
    restaurant.id = doc.id;
    resultRestaurants.push(restaurant);
  });

  setrestaurants(resultRestaurants);
}

//Addresaurantsform

export function validarInfoResto(
  restaurantName,
  restaurantAddress,
  restaurantDescription,
  imagesSelected,
  locationRestaurant
) {
  if (!restaurantName || !restaurantAddress || !restaurantDescription) {
    console.log("Todos los campos son obligatorios");
    return false;
  } else if (!imagesSelected) {
    console.log("El restaurante debe tener una fotografia");
    return false;
  } else if (!locationRestaurant) {
    console.log("Tienes que localizar el restaurante en el mapa");
    return false;
  } else {
    return true;
  }
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

  const ref = firebase.storage().ref("restaurants").child(uuid());
  await ref.put(blob).then(async (result) => {
    const url = await uploadImageStorageModel(result);
    imageBlob.push(url);
  });

  return imageBlob[0];
}

export async function obtenerlaLocalizacionService(setLocation) {
  const result = await Location.requestForegroundPermissionsAsync();

  if (result.status !== "granted") {
    console.log("Permission to access location was denied");
  } else {
    const loc = await Location.getCurrentPositionAsync({});
    const loca = {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    };
    setLocation(loca);
  }
}

export async function imageSelectService(setimagesSelected) {
  let permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    console.log("Se require que acepte los permisos");
  } else {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled) {
      console.log("Necesita seleccionar una imagen");
    } else {
      setimagesSelected(pickerResult.uri);
    }
  }
}

export async function handleLoadMoreController(
  startRestaurants,
  setrestaurants,
  setstartRestaurants,
  restaurants,
  limitRestaurants,
  setisLoading
) {
  const resultRestaurants = [];
  const result = await handleLoadMoreModels(limitRestaurants, startRestaurants);

  if (result.docs.length > 0) {
    setstartRestaurants(result.docs[result.docs.length - 1]);
  } else {
    setisLoading(false);
  }
  result.forEach((doc) => {
    const restaurant = doc.data();
    restaurant.id = doc.id;
    resultRestaurants.push(restaurant);
  });
  setrestaurants([...restaurants, ...resultRestaurants]);
}
