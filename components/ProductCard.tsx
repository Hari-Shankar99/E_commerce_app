import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  product: {
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
  },
  image: {
    width: 10,
    height: 10,
  },
  button: {
    margin: 1,
    backgroundColor: 'red',
    height: 10,
    borderRadius: 20,
    padding: 1,
  },
});
import {Product} from '../store';
function productCard({
  product,
  onPress,
}: {
  product: Product;
  onPress: (item: Product) => void;
}) {
  return (
    <>
      <TouchableOpacity style={styles.product} onPress={() => onPress(product)}>
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
            paddingTop: 3,
            fontSize: 15,
            fontWeight: '400',
          }}>
          {product.name}
        </Text>
        <Text style={{...styles.text, marginBottom: 2}}>{product.price}</Text>
      </TouchableOpacity>
    </>
  );
}

export default productCard;
