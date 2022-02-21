import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Button, Icon } from "react-native-elements";
import { app } from "../../utils/firebase";
import firebase from "firebase";
import "firebase/firestore";
import {
  verificarEstado,
  listarRestaurantes,
  cantidadRestaurants,
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
    verificarEstado(setuser);
    // firebase.auth().onAuthStateChanged((userInfo) => {
    //   setuser(userInfo);
    // });
  }, []);

  useEffect(() => {
    cantidadRestaurants(settotalRestaurants);
    listarRestaurantes(limitRestaurants, setrestaurants, setstartRestaurants);
    // db.collection("restaurants")
    //   .get()
    //   .then((snap) => {
    //     console.log(snap.size);
    //     console.log("entro en funcion cantidadresto");
    //     settotalRestaurants(snap.size);
    //   });
    // const resultRestaurants = [];

    // db.collection("restaurants")
    //   .orderBy("createAt", "desc")
    //   .limit(limitRestaurants)
    //   .get()
    //   .then((response) => {
    //     setstartRestaurants(response.docs[response.docs.length - 1]);

    //     response.forEach((doc) => {
    //       const restaurant = doc.data();
    //       restaurant.id = doc.id;
    //       resultRestaurants.push(restaurant);
    //     });
    //     console.log("entro en funcion listarrestyaurants");
    //     setrestaurants(resultRestaurants);
    //   });
  }, []);

  useFocusEffect(
    useCallback(() => {
      db.collection("restaurants")
        .get()
        .then((snap) => {
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
        });
    }, [])
  );

  const handleLoadMore = () => {
    const resultRestaurants = [];
    restaurants.length < totalRestaurants && setisLoading(true);
    db.collection("restaurants")
      .orderBy("createAt", "desc")
      .startAfter(startRestaurants.data().createAt)
      .limit(limitRestaurants)
      .get()
      .then((response) => {
        if (response.docs.length > 0) {
          setstartRestaurants(response.docs[response.docs.length - 1]);
        } else {
          setisLoading(false);
        }
        response.forEach((doc) => {
          const restaurant = doc.data();
          restaurant.id = doc.id;
          resultRestaurants.push(restaurant);
        });

        setrestaurants([...restaurants, ...resultRestaurants]);
      });
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
