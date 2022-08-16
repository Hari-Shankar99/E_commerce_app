import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ToastAndroid,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Product} from '../store';

const styles = StyleSheet.create({
  product: {
    flex: 1,
    justifyContent: 'space-between',
    width: '48%',
    alignItems: 'center',
    borderWidth: 0.75,
    margin: '1%',

    backgroundColor: '#a2ebb5',
    borderRadius: 20,
  },
  text: {
    margin: 3,
    padding: 2,
    fontSize: 15,
    fontFamily: 'arial',
  },
  productImage: {
    marginTop: 9,
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 20,
  },
});

function productCard({
  product,
  onPress,
}: {
  product: Product;
  onPress: (item: Product) => void;
}) {
  const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  return (
    <>
      <TouchableOpacity
        style={styles.product}
        onPress={() => {
          Platform.OS === 'android' ? showToast('Item added to Cart!') : null;
          onPress(product);
        }}>
        <Image
          style={styles.productImage}
          source={
            product.image
              ? {
                  uri: product.image,
                }
              : require('../images/default/default_pic.png')
          }
        />

        <Text
          style={{
            ...styles.text,
            padding: 3,
            fontSize: 15,
            fontWeight: '500',
          }}>
          {product.name}
        </Text>
        <Text
          style={{
            ...styles.text,
          }}>{`Rs: ${product.price}`}</Text>
      </TouchableOpacity>
    </>
  );
}

export default productCard;
