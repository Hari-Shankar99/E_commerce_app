import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ToastAndroid,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {CartItem} from '../store';
const styles = StyleSheet.create({
  cartItem: {
    width: '98%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.75,
    margin: '1%',

    backgroundColor: '#bbedaf', //'#a2ebb5'
    borderRadius: 20,
  },
  text: {
    padding: 2,
    fontFamily: 'arial',
    marginHorizontal: 'auto',
    fontSize: 15,
    fontWeight: 'bold',
  },
  itemImage: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 20,
  },
  image: {
    width: 15,
    height: 20,
  },
  verticalFlex: {
    width: '50%',
    flexDirection: 'column',
  },
});

function CartCard({
  product,
  onPress,
}: {
  product: CartItem;
  onPress: (itemId: number) => void;
}) {
  const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  return (
    <>
      <View style={styles.cartItem}>
        <Image
          style={styles.itemImage}
          source={
            product.image
              ? {
                  uri: product.image,
                }
              : require('../images/default/default_pic.png')
          }
        />
        <View style={styles.verticalFlex}>
          <Text
            style={{
              ...styles.text,
              color: 'red',
              marginTop: 1,
            }}>{`${product.count} X`}</Text>

          <Text style={styles.text}>{product.name}</Text>

          <Text
            style={{
              ...styles.text,
              marginBottom: 1,
              fontWeight: '100',
            }}>{`Rs: ${product.price}`}</Text>

          <View style={{paddingLeft: 20, paddingTop: 10, marginTop: 20}}>
            <TouchableOpacity
              style={{
                width: 19,
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
              onPress={() => {
                Platform.OS === 'android'
                  ? showToast('Item deleted from Cart!')
                  : null;
                onPress(product.id);
              }}>
              <Image
                style={styles.image}
                source={require('../images/delete.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

export default CartCard;
