import React, { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Dimensions,
} from "react-native";
import { Avatar, Icon, Input } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { map, result, size } from "lodash";
import Modal from "../Modal";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import uuid from "random-uuid-v4";
import { app } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
// definimos la db
const db = firebase.firestore(app);
const widthScreen = Dimensions.get("window").width;

export default function AddRestaurantForm(props) {
  const { setisLoading, navigation } = props;
  const [restaurantName, setrestaurantName] = useState("");
  const [restaurantAddress, setrestaurantAddress] = useState("");
  const [restaurantDescription, setrestaurantDescription] = useState("");
  const [imagesSelected, setimagesSelected] = useState(null);
  const [locationRestaurant, setlocationRestaurant] = useState(null);
  const [isVisibleMap, setisVisibleMap] = useState(false);

  const addRestaurant = () => {
    if (!restaurantName || !restaurantAddress || !restaurantDescription) {
      console.log("Todos los campos son obligatorios");
    } else if (!imagesSelected) {
      console.log("El restaurante debe tener una fotografia");
    } else if (!locationRestaurant) {
      console.log("Tienes que localizar el restaurante en el mapa");
    } else {
      setisLoading(true);
      uploadImageStorage().then((response) => {
        console.log(response);
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
            setisLoading(false);
            navigation.navigate("restaurants");
          })
          .catch(() => {
            setisLoading(false);
            console.log("Error al subir el restaurante, intentelo más tarde");
          });
      });
    }
  };

  const uploadImageStorage = async () => {
    const imageBlob = [];

    const response = await fetch(imagesSelected);
    const blob = await response.blob();
    const ref = firebase.storage().ref("restaurants").child(uuid());
    await ref.put(blob).then(async (result) => {
      await firebase
        .storage()
        .ref(`restaurants/${result.metadata.name}`)
        .getDownloadURL()
        .then((photoUrl) => {
          console.log(photoUrl);
          imageBlob.push(photoUrl);
        });
    });

    return imageBlob[0];
  };
  return (
    <ScrollView style={styles.scrollView}>
      <ImageRestaurant imagenRestaurant={imagesSelected} />
      <FormAdd
        setrestaurantName={setrestaurantName}
        setrestaurantAddress={setrestaurantAddress}
        setrestaurantDescription={setrestaurantDescription}
        setisVisibleMap={setisVisibleMap}
        locationRestaurant={locationRestaurant}
      />
      <UploadImage
        imagesSelected={imagesSelected}
        setimagesSelected={setimagesSelected}
      />
      <Button
        title="Crear Restaurante"
        onPress={addRestaurant}
        buttonStyle={styles.btnAddRestaurant}
      />
      <Map
        isVisibleMap={isVisibleMap}
        setisVisibleMap={setisVisibleMap}
        setlocationRestaurant={setlocationRestaurant}
      />
    </ScrollView>
  );
}
function ImageRestaurant(props) {
  const { imagenRestaurant } = props;

  return (
    <View style={styles.viewPhoto}>
      <Image
        source={
          imagenRestaurant
            ? { uri: imagenRestaurant }
            : require("../../../assets/no-image.png")
        }
        style={{ width: widthScreen, height: 200 }}
      />
    </View>
  );
}

//OBJETO FORMULARIO
function FormAdd(props) {
  const {
    setrestaurantName,
    setrestaurantAddress,
    setrestaurantDescription,
    setisVisibleMap,
    locationRestaurant,
  } = props;

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del restaurante"
        containerStyle={styles.input}
        onChange={(e) => setrestaurantName(e.nativeEvent.text)}
      />
      <Input
        placeholder="Dirección"
        containerStyle={styles.input}
        onChange={(e) => setrestaurantAddress(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: locationRestaurant ? "#00a680" : "#c2c2c2",
          onPress: () => setisVisibleMap(true),
        }}
      />
      <Input
        placeholder="Descripcion del restaurante"
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChange={(e) => setrestaurantDescription(e.nativeEvent.text)}
      />
    </View>
  );
}

function Map(props) {
  const { isVisibleMap, setisVisibleMap, setlocationRestaurant } = props;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  const confirmLocation = () => {
    setlocationRestaurant(location);

    setisVisibleMap(false);
  };

  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setisVisibleMap}>
      <View>
        {location && (
          <MapView
            style={styles.mapStyle}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={(region) => setLocation(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              draggable
            />
          </MapView>
        )}
        <View style={styles.viewMapBtnContainerSave}>
          <Button
            title="Guardar Ubicación"
            buttonStyle={styles.viewMapBtnSave}
            onPress={confirmLocation}
          />
          <Button
            title="Cancelar Ubicación"
            buttonStyle={styles.viewMapBtnCancel}
            onPress={() => setisVisibleMap(false)}
          />
        </View>
      </View>
    </Modal>
  );
}

//SUBIR FOTO PARA RESTORANT
function UploadImage(props) {
  const { imagesSelected, setimagesSelected } = props;

  const imageSelect = async () => {
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
  };

  return (
    <View styles={styles.viewImages}>
      <Icon
        type="material-community"
        name="camera"
        color="#7a7a7a"
        containerStyle={styles.containerIcon}
        onPress={imageSelect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  btnAddRestaurant: {
    backgroundColor: "#00a680",
    margin: 20,
  },
  viewImages: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
  },
  mapStyle: {
    width: "100%",
    height: 550,
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5,
  },
  viewMapBtnCancel: {
    backgroundColor: "#a60d0d",
  },
  viewMapBtnContainerSave: {
    paddingRight: 5,
  },
  viewMapBtnSave: {
    backgroundColor: "#00a680",
  },
});
