
import { View,Image,StyleSheet } from "react-native";
import React from "react";
const styles = StyleSheet.create({
    image:{
        height:30,
        width:30,
        resizeMode:'contain',
    }
})
function CartPic () {
    return (
        <View>
            <Image style={styles.image} source = {require("../images/shopping_cart.png")} />
        </View>
    );
}
export default CartPic;