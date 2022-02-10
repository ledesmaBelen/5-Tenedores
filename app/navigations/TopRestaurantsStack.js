import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopRestaurants from "../screens/TopRestaurants";

//AÑADIMOS EL STACK DE ARRIBA,
//SOLO PUEDE SER VISIBLE UNO A LA VEZ,LOS OTROS ESTAN ACCESIBLES PERO NO VISIBLES
const Stack = createStackNavigator();

export default function TopRestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="top-restaurants"
        component={TopRestaurants}
        options={{ title: "Los Mejores Restaurantes" }}
      />
    </Stack.Navigator>
  );
}
