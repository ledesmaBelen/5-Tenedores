import React, { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
} from "react-native";
import { Avatar, Icon, Input } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { map, result, size } from "lodash";
import Modal from "../Modal";
import * as Location from "expo-location";

const widthScreen = Dimensions.get("window").width;

export default function AddRestaurantForm(props) {
  const { setiIsLoading, navigation } = props;
  const [restaurantName, setrestaurantName] = useState("");
  const [restaurantAddress, setrestaurantAddress] = useState("");
  const [restaurantDescription, setrestaurantDescription] = useState("");
  const [imagesSelected, setimagesSelected] = useState(null);
  const [isVisibleMap, setisVisibleMap] = useState(false);

  const addRestaurant = () => {
    console.log("ok");
    console.log(imagesSelected);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <ImageRestaurant imagenRestaurant={imagesSelected} />
      <FormAdd
        setrestaurantName={setrestaurantName}
        setrestaurantAddress={setrestaurantAddress}
        setrestaurantDescription={setrestaurantDescription}
        setisVisibleMap={setisVisibleMap}
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
      <Map isVisibleMap={isVisibleMap} setisVisibleMap={setisVisibleMap} />
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
            : require("../../../assets/10.1 no-image.png")
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
          color: "#c2c2c2",
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
  const [location, setLocation] = useState(null);
  const { isVisibleMap, setisVisibleMap } = props;

  useEffect(() => {
    (async () => {
      const status = await Location.requestForegroundPermissionsAsync();
      console.log(status);

      if (status !== "granted") {
        console.log("Permission to access location was denied");
      } else {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log(location);
      }
    })();
  }, []);

  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setisVisibleMap}>
      <Text>Mapa</Text>
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
