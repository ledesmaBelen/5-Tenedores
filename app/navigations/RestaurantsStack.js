import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Restaurants from "../screens/Restaurants/Restaurants";
import AddRestaurant from "../screens/Restaurants/AddRestaurant";
import { StyleSheet } from "react-native";


//AÑADIMOS EL STACK DE ARRIBA,
//SOLO PUEDE SER VISIBLE UNO A LA VEZ,LOS OTROS ESTAN ACCESIBLES PERO NO VISIBLES
const Stack = createStackNavigator();

export default function RestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="restaurants"
        component={Restaurants}
        options={{ title: "Restaurantes" }}
      />
      <Stack.Screen
        name="add-restaurant"
        component={AddRestaurant}
        options={{ title: "Añadir un nuevo restaurante" }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  iconR: {
    color: "#00a680",
  },
});