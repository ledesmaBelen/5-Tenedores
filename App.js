import React, { useEffect } from "react";
import Navigation from "./app/navigations/Navigation";
import { app } from "./app/utils/firebase";
import * as firebase from "firebase";

export default function App() {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {});
  }, []);
  return <Navigation />;
}
