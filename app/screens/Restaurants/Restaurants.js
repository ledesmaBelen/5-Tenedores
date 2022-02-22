import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Button, Icon } from "react-native-elements";
import { app } from "../../utils/firebase";
import firebase from "firebase";
import "firebase/firestore";
import {
  verifState,
  listRestaurantes,
  sizeRestaurants,
  handleLoadMoreController,
} from "../../controllers/RestaurantsController";
import ListRestaurants from "../../components/Restaurants/ListRestaurants";

const db = firebase.firestore(app);

export default function Restaurants(props) {
  const { navigation } = props;
  const [user, setuser] = useState(null);
  const [restaurants, setrestaurants] = useState([]);
  const [totalRestaurants, settotalRestaurants] = useState(0);
  const [startRestaurants, setstartRestaurants] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const limitRestaurants = 10;

  useEffect(() => {
    verifState(setuser);
  }, []);

  useEffect(() => {
    sizeRestaurants(settotalRestaurants);
    listRestaurantes(limitRestaurants, setrestaurants, setstartRestaurants);
  }, []);

  useFocusEffect(
    useCallback(() => {
      verifState(setuser);
      sizeRestaurants(settotalRestaurants);
      listRestaurantes(limitRestaurants, setrestaurants, setstartRestaurants);
    }, [])
  );

  const handleLoadMore = () => {
    restaurants.length < totalRestaurants && setisLoading(true);
    handleLoadMoreController(
      startRestaurants,
      setrestaurants,
      setstartRestaurants,
      restaurants,
      limitRestaurants,
      setisLoading
    );
  };

  return (
    <View style={StyleSheet.viewBody}>
      <ListRestaurants
        restaurants={restaurants}
        handleLoadMore={handleLoadMore}
        isLoading={isLoading}
      />

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
    bottom: 10,
    right: 10,
    alignItems: "flex-end",
    alignSelf: "flex-end",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});
