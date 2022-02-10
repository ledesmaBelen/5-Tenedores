import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Favorites from "../screens/Favorites";

//AÑADIMOS EL STACK DE ARRIBA,
//SOLO PUEDE SER VISIBLE UNO A LA VEZ,LOS OTROS ESTAN ACCESIBLES PERO NO VISIBLES
const Stack = createStackNavigator();
export default function RestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="favorites"
        component={Favorites}
        options={{ title: "Restaurantes Favoritos" }}
      />
    </Stack.Navigator>
  );
}
