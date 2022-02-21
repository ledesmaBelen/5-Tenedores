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
import {
  addRestaurantController,
  validarInfoResto,
  uploadImageStorageService,
  obtenerlaLocalizacionService,
  imageSelectService,
} from "../../controllers/RestaurantsController";
import * as ImagePicker from "expo-image-picker";
import { map, result, size } from "lodash";
import Modal from "../Modal";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { app } from "../../utils/firebase";
import uuid from "random-uuid-v4";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(app);
const widthScreen = Dimensions.get("window").width;

export default function AddRestaurantForm(props) {
  const {
    setisLoading,
    navigation,
    setrestaurants,
    setstartRestaurants,
    limitRestaurants,
  } = props;
  const [restaurantName, setrestaurantName] = useState("");
  const [restaurantAddress, setrestaurantAddress] = useState("");
  const [restaurantDescription, setrestaurantDescription] = useState("");
  const [imagesSelected, setimagesSelected] = useState(null);
  const [locationRestaurant, setlocationRestaurant] = useState(null);
  const [isVisibleMap, setisVisibleMap] = useState(false);

  const addRestaurant = () => {
    if (
      validarInfoResto(
        restaurantName,
        restaurantAddress,
        restaurantDescription,
        imagesSelected,
        locationRestaurant
      )
    ) {
      setisLoading(true);
      uploadImageStorageService(imagesSelected).then((response) => {
        console.log(response);
        addRestaurantController(
          restaurantName,
          restaurantAddress,
          restaurantDescription,
          locationRestaurant,
          response
        );

        setTimeout(() => {
          setisLoading(false);
          navigation.navigate("restaurants");
        }, 3000);
      });
    }
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
    obtenerlaLocalizacionService(setLocation);
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
        <View style={styles.viewMapBtn}>
          <Button
            title="Guardar Ubicacion"
            containerStyle={styles.viewMapBtnContainerSave}
            buttonStyle={styles.viewMapBtnSave}
            onPress={confirmLocation}
          />
          <Button
            title="Cancelar Ubicacion"
            containerStyle={styles.viewMapBtnContainerCancel}
            buttonStyle={styles.viewMapBtnCancel}
            onPress={() => setIsVisibleMap(false)}
          />
        </View>
      </View>
    </Modal>
  );
}

//SUBIR FOTO PARA RESTORANT
function UploadImage(props) {
  const { imagesSelected, setimagesSelected } = props;

  const imageSelect = () => {
    imageSelectService(setimagesSelected);
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
    marginTop: 5,
  },
  viewMapBtnContainerSave: {
    paddingRight: 5,
  },
  viewMapBtnSave: {
    backgroundColor: "#00a680",
  },
});
