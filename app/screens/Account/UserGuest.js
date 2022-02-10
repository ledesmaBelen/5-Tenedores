import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
//USUARIO NO LOGGEADO

export default function UserGuest() {
  //DEFINIMOS EN EL COMPONENTE EL NAVIGATION PARA NAVEGAR A UN SITIO
  //EL onPress EJECUTA LA NAVEGACION
  const navigation = useNavigation();
  //useNavigation("X") -> DEBE SER EL NAME QUE SE LE DA AL SCREEN
  return (
    <ScrollView centerContent={true} style={styles.viewBody}>
      <Image
        source={require("../../../assets/user-guest.jpg")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>Consulta tu perfil de 5 Tenedores</Text>
      <Text style={styles.description}>
        ¿Como describes a tu mejor restaurante? Busca y visualiza los mejores
        restaurantes de una forma sencilla y vota cual te ha gustado mas y
        comenta como ha sido tu experiencia
      </Text>
      <View style={styles.viewBtn}>
        <Button
          buttonStyle={styles.btnstyle}
          containerStyle={styles.btnContainer}
          title="Ver tu perfil"
          onPress={() => navigation.navigate("login")}
        />
      </View>
    </ScrollView>
  );
}

//ESTILO
const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
  },
  btnstyle: {
    backgroundColor: "#00a680",
  },
  btnContainer: {
    width: 70,
  },
});
