import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Rating, ListItem, Icon } from "react-native-elements";
import { map } from "lodash";
import { app } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import Loading from "../../components/Loading";
import Map from "../../components/Map";

const db = firebase.firestore(app);

export default function Restaurant(props) {
  const { navigation, route } = props;
  const { id, name } = route.params;
  const [restaurant, setrestaurant] = useState(null);
  const [rating, setrating] = useState(0);

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
        setrating(data.rating);
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
      <TitleRestaurant
        name={restaurant.name}
        description={restaurant.descrption}
        rating={rating}
      />
      <RestaurantInfo
        location={restaurant.location}
        name={restaurant.name}
        address={restaurant.address}
      />
    </View>
  );
}

function TitleRestaurant(props) {
  const { name, description, rating } = props;

  return (
    <View styles={styles.viewRestaurantTitle}>
      <View styles={{ flexDirection: "row" }}>
        <Text style={styles.nameRestaurant}>{name}</Text>
        <Rating
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View>
      <Text style={styles.descriptionRestaurant}>{description}</Text>
    </View>
  );
}

function RestaurantInfo(props) {
  const { location, name, address } = props;
  console.log(address);

  const listInfo = {
    text: address,
    iconName: "map-marker",
    iconType: "material-community",
    action: null,
  };

  return (
    <View style={styles.viewRestaurantInfo}>
      <Text style={styles.restaurantInfoTitle}>
        Información sobre el restaurante
      </Text>
      <Map location={location} name={name} height={100} />

      <Text
        leftIcon={{
          name: listInfo.iconName,
          type: listInfo.iconType,
          color: "#00a680",
        }}
        style={styles.containerListItem}
      >
        Dirección: {listInfo.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  port: {
    width: "100%",
    height: 250,
  },
  viewRestaurantTitle: {
    padding: 15,
  },
  nameRestaurant: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
  descriptionRestaurant: {
    marginTop: 5,
    color: "grey",
    marginLeft: 5,
  },
  rating: {
    position: "absolute",
    right: 0,
    bottom: 5,
  },
  viewRestaurantInfo: {
    margin: 15,
    marginTop: 25,
  },
  restaurantInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  containerListItem: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
