import React from "react";
import {StyleSheet, View, Image} from 'react-native';

export default function TopRestaurants() {
    return(
        <View style={styles.container}>
            <Image
                source={require("../../assets/construccion.jpg")}
                resizeMode="contain"
                style={styles.logo}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    logo:{
        width:"100%",
        height:400,
    },
    container:{
        flex:1,
        justifyContent:"center",
    },
});