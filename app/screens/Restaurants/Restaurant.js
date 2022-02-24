import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { app } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import Loading from "../../components/Loading";

const db = firebase.firestore(app);

export default function Restaurant(props) {
  const { navigation, route } = props;
  const { id, name } = route.params;
  const [restaurant, setrestaurant] = useState(null);

  console.log(restaurant);
  navigation.setOptions({ title: name });

  useEffect(() => {
    db.collection("restaurants")
      .doc(id)
      .get()
      .then((response) => {
        const data = response.data();
        data.id = response.id;
        setrestaurant(data);
      });
  }, []);

  if (!restaurant) return <Loading isVisible={true} text="Cargando..." />;

  return (
    <View style={styles.viewContainer}>
      <Image
        source={{ uri: restaurant.images }}
        resizeMode="cover"
        style={styles.port}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  port: {
    width: "100%",
    height: 250,
  },
});
