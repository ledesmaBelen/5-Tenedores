import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";

//DEFINIMOS UN COMPONENTE QUE SE MOSTRARA EN LAS CARGAS
export default function Loading(props) {
  //OBTIENE LOS PROPS, SI ES VISIBLE O NO Y SI TIENE TEXTO
  const { isVisible, text } = props;
  //SE CONFIGURA EL ICONO DE CARGA
  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0,0,0,0.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#00a680" />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

//se da css al componente
const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: "#FFF",
    borderColor: "#00a680",
    borderWidth: 2,
    borderRadius: 10,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#00a680",
    textTransform: "uppercase",
    marginTop: 10,
  },
});
