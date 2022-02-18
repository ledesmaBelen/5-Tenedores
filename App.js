import React from "react";
import Navigation from "./app/navigations/Navigation";
import { firebaseApp } from "./app/utils/firebase";
import { decode, encode } from "base-64";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground.",
]);

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

export default function App() {
  return <Navigation />;
}
