import { isEmpty } from "lodash";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { validateEmail } from "../../utils/validations";
import { login } from "../../controllers/UserController";
import Loading from "../Loading";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFromData] = useState(defaultFromValue);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [errors, seterrors] = useState({});

  const onChange = (e, type) => {
    setFromData({ ...formData, [type]: e.nativeEvent.text });
  };
  const onSubmit = () => {
    seterrors({});
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      seterrors({ errEmail: "Todos los campos son obligatorios" });
    } else if (!validateEmail(formData.email)) {
      seterrors({ errEmail: "El email es incorrecto" });
    } else {
      setLoading(true);
      login(formData, setLoading, navigation);
    }
  };
  
  return (
    <View styles={styles.formContainer}>
      <Input
        placeholder="Correo Electronico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon type="material-community" name="at" styles={styles.iconR} />
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
            styles={styles.iconR}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        errorMessage={errors.errPass}
      />
      <Button
        title="Iniciar Sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Iniciando Sesión" />
    </View>
  );
}

function defaultFromValue() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerLogin: {
    marginTop: 20,
    marginLeft: 8,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: "#00a680",
  },
  iconR: {
    color: "#c1c1c1",
  },
});
