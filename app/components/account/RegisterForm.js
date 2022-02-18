import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import Loading from "../Loading";
import { validateEmail } from "../../utils/validations";
import { size, isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { register } from "../../services/UserService";

//LOS ICONOS SON PARTE DE REACT
export default function RegisterForm() {
  //definimos las propiedades que vienen de Register
  //const { toastRef } = props;
  //DEFINIMOS EL ESTADO DE LA CONTRASEÑA PARA MOSTRAR O NO
  //mediante los hook
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  //HOOK PARA DATOS DINAMCOS DEL FORMULARIO
  const [formData, setformData] = useState(defaultFromValue());
  const [errors, setErrors] = useState({});
  //COMPONENTE LOADING PARA CARGA MIENTRAS CREA USER
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  //Valida que los campos sean correctos
  //LOS TOAST RETORNAN LOS ERRORES GRAFICAMENTE
  const onSubmit = () => {
    setErrors({});
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.passwordRepeat)
    ) {
      setErrors({ errEmail: "Todos los campos son obligatorios" });
    } else if (!validateEmail(formData.email)) {
      setErrors({ errEmail: "El email es incorrecto" });
    } else if (formData.password !== formData.passwordRepeat) {
      setErrors({ errPass: "Las contraseñas deben ser iguales" });
      console.log("");
    } else if (size(formData.password) < 6) {
      setErrors({ errPass: "La contraseña debe tener al menos 6 caracteres" });
    } else {
      setLoading(true);
      register(formData, navigation, setLoading);
    }
  };
  //Onchange tiene un evento y un tipo
  // se pone en corchetes porque la key es un valor dinamico
  const onChange = (e, type) => {
    //...formData => para obtener las propiedades del objeto
    setformData({ ...formData, [type]: e.nativeEvent.text });
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
        errorMessage={errors.errEmail}
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
        errorMessage={errors.errPass}
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
