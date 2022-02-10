import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "../screens/Search";

//AÑADIMOS EL STACK DE ARRIBA,
//SOLO PUEDE SER VISIBLE UNO A LA VEZ,LOS OTROS ESTAN ACCESIBLES PERO NO VISIBLES
const Stack = createStackNavigator();
export default function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="search"
        component={Search}
        options={{ title: "Buscador" }}
      />
    </Stack.Navigator>
  );
}
