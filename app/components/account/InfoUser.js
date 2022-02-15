import React from "react";
import {View, StyleSheet, Text} from "react-native";
import {Avatar} from "react-native-elements";
import * as firebase from "firebase";
import "firebase/storage";
import "firebase/firestore";
import { Camera } from 'expo-camera';
import * as ImagePicker from "expo-image-picker";

export default function InfoUser(props) {
  const  {userInfo: { photoURL, displayName, email, uid},
  setloading,
  setloadingText,
    } = props;

const changeAvatar = async () => {
    console.log("cambiar avatar");
    const resultPermission = await Camera.requestCameraPermissionsAsync();
    const resultPermissionCamera =resultPermission.status;
    console.log(resultPermissionCamera)

    if (resultPermissionCamera === "denied") {
      console.log("Es necesario aceptar los permisos de la galeria");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (result.cancelled) {
        console.log("Has cerrado la seleccion de imagenes");
      } else {
        uploadImage(result.uri)
          .then(() => {
            updatePhotoUrl();
          })
          .catch((err) => {
            console.log(err);
            console.log("Error al actualizar el avatar 1");
          });
      }
    }
};

const uploadImage = async (uri) => {
    setloadingText("Actualizando Avatar");
    setloading(true);
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref().child(`avatar/${uid}`);
    return ref.put(blob);
};

const updatePhotoUrl = () => {
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

    return(
      <View style={styles.viewUserInfo}>
        <Avatar
           rounded
           size="large"
           containerStyle={styles.userInfoAvatar}
           source={
              photoURL? {uri: photoURL}: require("../../../assets/avatar-default.jpg")
           }
        >
          <Avatar.Accessory size={23} onPress={changeAvatar}/>
        </Avatar>
        <View>
          <Text style={styles.displayName}>
            {displayName ? displayName : "Anónimo"}
          </Text>
          <Text>{email? email: "Social login" }</Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      backgroundColor: "#f2f2f2",
      paddingTop: 30,
      paddingBottom: 30,
    },
    userInfoAvatar: {
      marginRight: 20,
    },
    displayName: {
      fontWeight: "bold",
      paddingBottom: 5,
    },
});