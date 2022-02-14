import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { app } from "../../utils/firebase";
import firebase from "firebase";
import "firebase/firestore";

const db = firebase.firestore(app);

export default function Restaurants(props) {
  const { navigation } = props;
  const [user, setuser] = useState(null);
  const [restaurants, setrestaurants] = useState([]);
  const [totalRestaurants, settotalRestaurants] = useState(0);
  const [startRestaurants, setstartRestaurants] = useState(null);
  const limitRestaurants = 2;

  console.log(restaurants);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setuser(userInfo);
    });
  }, []);

  useEffect(() => {
    db.collection("restaurants")
      .get()
      .then((snap) => {
        console.log(snap.size);
        settotalRestaurants(snap.size);
      });
    const resultRestaurants = [];

    db.collection("restaurants")
      .orderBy("createAt", "desc")
      .limit(limitRestaurants)
      .get()
      .then((response) => {
        setstartRestaurants(response.docs[response.docs.length - 1]);

        response.forEach((doc) => {
          const restaurant = doc.data();
          restaurant.id = doc.id;
          resultRestaurants.push(restaurant);
        });
        setrestaurants(resultRestaurants);
        console.log(restaurants);
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
