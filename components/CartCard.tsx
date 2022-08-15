import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { CartItem } from '../store';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartItem: {
    width: '98%',
    flexDirection:'row',
    alignItems: 'center',
    borderWidth: 0.75,
    margin: '1%',

    backgroundColor: '#a2ebb5',
    borderRadius: 20,
  },
  text: {
    padding: 2,
    fontSize: 15,
    fontFamily: 'arial',
  },
  itemImage: {
    width: 150,
    height: 150,
  },
  image: {
    width: 10,
    height: 10,
  },
  verticalFlex: {
    flexDirection:'column',
  },
});
import {Product} from '../store';

function CartCard({
  product,
  onPress,
}: {
  product: CartItem;
  onPress: (item: CartItem) => void;
}) {
  return (
    <>
      <View style={styles.cartItem}>
        <Image
          style={styles.itemImage}
          source={
            product.image
              ? {
                  uri: 'https://openseauserdata.com/files/d9cb15726fd692ea9795dd093e6822c3.jpg',
                }
              : require('../images/default/default_pic.png')
          }
        />
        <View style = {styles.verticalFlex}>
        <Text
          style={{
            ...styles.text,
            height:40,
            width: '65%',
            paddingTop: 3,
            fontSize: 15,
            fontWeight: '500',
          }}> <Text style = {{color:'red'}}>{`${product.count} X  `}</Text>
          {product.name}
        </Text>
        <Text style={{...styles.text, marginBottom: 2}}>{`Rs: ${product.price}`}</Text>
        </View>
      </View>
    </>
  );
}

export default CartCard;
