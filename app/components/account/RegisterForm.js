import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import Loading from "../Loading";
import { validateEmail } from "../../utils/validations";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

//LOS ICONOS SON PARTE DE REACT
export default function RegisterForm() {
  //definimos las propiedades que vienen de Register
  //const { toastRef } = props;
  //DEFINIMOS EL ESTADO DE LA CONTRASEÑA PARA MOSTRAR O NO
  //mediante los hook
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  //HOOK PARA DATOS DINAMCOS DEL FORMULARIO
  const [fromData, setfromData] = useState(defaultFromValue());
  //COMPONENTE LOADING PARA CARGA MIENTRAS CREA USER
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  //Valida que los campos sean correctos
  //LOS TOAST RETORNAN LOS ERRORES GRAFICAMENTE
  const onSubmit = () => {
    if (
      isEmpty(fromData.email) ||
      isEmpty(fromData.password) ||
      isEmpty(fromData.passwordRepeat)
    ) {
      //toastRef.current.show("Todos los campos son obligatorios");
      console.log("Todos los campos son obligatorios");
    } else if (!validateEmail(fromData.email)) {
      // toastRef.current.show("El email es incorrecto");
      console.log("El email es incorrecto");
    } else if (fromData.password !== fromData.passwordRepeat) {
      // toastRef.current.show("Las contraseñas deben ser iguales");
      console.log("Las contraseñas deben ser iguales");
    } else if (size(fromData.password) < 6) {
      //toastRef.current.show("La contraseña debe tener al menos 6 caracteres");
      console.log("La contraseña debe tener al menos 6 caracteres");
    } else {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(fromData.email, fromData.password)
        .then((res) => {
          navigation.navigate("account");
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  //Onchange tiene un evento y un tipo
  // se pone en corchetes porque la key es un valor dinamico
  const onChange = (e, type) => {
    //...fromData => para obtener las propiedades del objeto
    setfromData({ ...fromData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            IconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "password")}
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            IconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        placeholder="Repetir Contraseña"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "passwordRepeat")}
        password={true}
        secureTextEntry={showPasswordRepeat ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPasswordRepeat ? "eye-off-outline" : "eye-outline"}
            IconStyle={styles.iconRight}
            onPress={() => setShowPasswordRepeat(!showPasswordRepeat)}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="creando cuenta" />
    </View>
  );

  function defaultFromValue() {}
}
const styles = StyleSheet.create({
  formContainer: {
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#00A683",
  },
  iconRight: {
    color: "#c1c1c1",
  },
  IconStyle: {
    color: "#c1c1c1",
  },
});
