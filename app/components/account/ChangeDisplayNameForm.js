import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import { updateName } from "../../controllers/UserController";

export default function ChangeDisplayNameForm(props) {
  const { displayName, setShowModal, setreloadUserInfo } = props;
  const [newDisplayName, setnewDisplayName] = useState(null);
  const [error, seterror] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const onSubmit = () => {
    seterror(null);
    if (!newDisplayName) {
      seterror("El nombre no puede estar vacio");
    } else if (displayName === newDisplayName) {
      seterror("El nombre no puede ser igual");
    } else {
      setisLoading(true);
      const update = {
        displayName: newDisplayName,
      };
      updateName(
        setisLoading,
        setreloadUserInfo,
        setShowModal,
        update,
        setErrors
      );
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre y Apellido"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        defaultValue={displayName || ""}
        onChange={(e) => setnewDisplayName(e.nativeEvent.text)}
        errorMessage={error}
      />
      <Button
        title="Cambiar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#00a680",
  },
});
