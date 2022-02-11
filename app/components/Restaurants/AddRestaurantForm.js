import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { Input } from "react-native-elements";

export default function AddRestaurantForm(props) {
  const { setiIsLoading, navigation } = props;
  const [restaurantName, setrestaurantName] = useState("");
  const [restaurantAddress, setrestaurantAddress] = useState("");
  const [restaurantDescription, setrestaurantDescription] = useState("");

  const addRestaurant = () => {
    console.log("ok");
    console.log("restaurantName:" + restaurantName);
    console.log("restaurantadres:" + restaurantAddress);
    console.log("restaurantdescrip:" + restaurantDescription);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <FormAdd
        setrestaurantName={setrestaurantName}
        setrestaurantAddress={setrestaurantAddress}
        setrestaurantDescription={setrestaurantDescription}
      />
      <Button
        title="Crear Restaurante"
        onPress={addRestaurant}
        buttonStyle={styles.btnAddRestaurant}
      />
    </ScrollView>
  );
}

function FormAdd(props) {
  const { setrestaurantName, setrestaurantAddress, setrestaurantDescription } =
    props;

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
});
