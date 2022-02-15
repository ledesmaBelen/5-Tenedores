import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";
import Loading from "../../components/Loading";
import InfoUser from "../../components/account/InfoUser";
import AccountOptions from "../../components/account/AccountOptions";

export default function UserLogger() {
  const [userInfo, setuserInfo] = useState(null);
  const [loading, setloading] = useState(false);
  const [loadingText, setloadingText] = useState("");
  const [reloadUserInfo, setreloadUserInfo] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setuserInfo(user);
    })();
    setreloadUserInfo(false);
  }, [reloadUserInfo]);

  return (

    <View style={styles.viewUserInfo}>
      
      {userInfo && (
            <InfoUser 
              userInfo={userInfo} 
              setloadingText={setloadingText} 
              setloading={setloading}
            />
      )}

      <AccountOptions
        userInfo={userInfo}
        setreloadUserInfo={setreloadUserInfo}
      />
      <Button
        title="Cerrar sesion"
        buttonStyle={styles.btnCloseSesion}
        titleStyle={styles.btnCloseSesionText}
        onPress={() => firebase.auth().signOut()}
      />
      <Loading text={loadingText} isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
  },
  btnCloseSesion: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnCloseSesionText: {
    color: "#00a680",
  },
});
