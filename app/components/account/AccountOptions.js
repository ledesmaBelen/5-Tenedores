import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function AccountOptions(props) {
  const { userInfo, setreloadUserInfo } = props;
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setrenderComponent] = useState(null);
  console.log(userInfo);

  const selectedComponent = (key) => {
    switch (key) {
      case "displayName":
        setrenderComponent(
          <ChangeDisplayNameForm
            displayName={userInfo.displayName}
            setShowModal={setShowModal}
            setreloadUserInfo={setreloadUserInfo}
          />
        );
        setShowModal(true);
        break;
      case "email":
        setrenderComponent(
          <ChangeEmailForm
            email={userInfo.email}
            setShowModal={setShowModal}
            setreloadUserInfo={setreloadUserInfo}
          />
        );
        setShowModal(true);
        break;
      case "password":
        setrenderComponent(<ChangePasswordForm setShowModal={setShowModal} />);
        setShowModal(true);
        break;
      default:
        setrenderComponent(null);
        setShowModal(false);
        break;
    }
  };
  
  const menuOptions = generateOptions(selectedComponent);
  return (
    <View>
      {menuOptions.map((menu, i) => (
        <ListItem
          key={i}
          bottomDivider
          containerStyle={styles.menuItem}
          onPress={menu.onPress}
        >
          <Icon
            type={menu.iconType}
            name={menu.iconNameLeft}
            color={menu.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>

          <ListItem.Chevron />
        </ListItem>
      ))}
      {renderComponent && (
        <Modal isVisible={showModal} setIsVisible={setShowModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}

function generateOptions(selectedComponent) {
  return [
    {
      title: "Cambiar Nombre y Apellidos",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("displayName"),
    },
    {
      title: "Cambiar Email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("email"),
    },
    {
      title: "Cambiar contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("password"),
    },
  ];
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
});
