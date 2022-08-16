import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {DataStore, useStore} from '../store';
const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    paddingRight: 40,
  },
});
function CartPic() {
  const cartLength = useStore((state: DataStore) => state.cart.length);
  return (
    <View>
      <Image
        style={styles.image}
        source={require('../images/shopping_cart.png')}
      />
      <View
        style={{
          position: 'absolute',
          right: 0,
          backgroundColor: 'red',
          borderRadius: 20,
          //   overflow: 'hidden',
        }}>
        <Text style={{fontSize: 12, fontWeight: '500', color: 'white'}}>
          {' '}
          {cartLength}{' '}
        </Text>
      </View>
    </View>
  );
}
export default CartPic;
