import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Divider } from "react-native-elements";
import LoginForm from "../../components/account/LoginForm";
import UserGuest from "./UserGuest";
//SE DEFINE LA VISTA DE LOGGEO
export default function Login() {
  return (
    <ScrollView>
      <Image
        source={require("../../../assets/7.1 5-tenedores-letras-icono-logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewContainer}>
        <LoginForm />
        <CreateUser />
        <Divider style={styles.divider} />
        
      </View>
    </ScrollView>
  );
}

//DEFINIMOS COMPONENTE PARA CREARUSER
function CreateUser() {
  //DEFINIMOS EN EL COMPONENTE EL NAVIGATION PARA NAVEGAR AL SITTIO DE REGISTRO
  const navigation = useNavigation();
  console.log(navigation);
  //useNavigation("X") -> DEBE SER EL NAME QUE SE LE DA AL SCREEN
  return (
    <Text style={styles.textRegister}>
      ¿No tienes cuenta?{" "}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("register")}
      >
        Registrate
      </Text>
    </Text>
  );
}

//ESTILO
const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  btnRegister: {
    color: "#00a680",
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 40,
  },
});
