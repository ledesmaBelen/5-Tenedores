import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

export default function Restaurants(props) {
  const { navigation } = props;
  const [user, setuser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setuser(userInfo);
    });
  }, []);

  return (
    <View style={StyleSheet.viewBody}>
      <Text>Restaurants</Text>
      {user && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color={"#00a680"}
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("add-restaurant")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btnContainer: {
    position: "absolute",
    bottom: -400,
    right: 10,
    alignItems: "flex-end",
    alignSelf: "flex-end",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});
