import React, { useRef } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
//IMPORTAMOS EL KEYBOARD PARA QUE EN DISPOSITVO ANDROI O IOS EL TECLADO
//NO TAPE TODO EL FORMULARIO Y SE PUEDA HACER SCROLL
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//import Toast from "react-native-easy-toast";
import RegisterForm from "../../components/account/RegisterForm";

//FORMULARIO DE REGISTRO
export default function Register() {
  //definimos el toast con referencia
  //const toastRef = useRef();

  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../assets/7.1 5-tenedores-letras-icono-logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewForm}>
        <RegisterForm />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
});
