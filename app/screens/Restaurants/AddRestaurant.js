import React, { useState } from "react";
import { View } from "react-native";
import AddRestaurantForm from "../../components/Restaurants/AddRestaurantForm";
import Loading from "../../components/Loading";

export default function AddRestaurant(props) {
  const { navigation } = props;
  const [isLoading, setisLoading] = useState(false);
  return (
    <View>
      <AddRestaurantForm setisLoading={setisLoading} navigation={navigation} />
      <Loading isVisible={isLoading} text="Creando restaurante" />
    </View>
  );
}
