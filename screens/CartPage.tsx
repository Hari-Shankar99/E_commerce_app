import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {DataStore, useStore} from '../store';
import {CartItem} from '../store';
import {CartPageNavigationProp} from '../navigation/types';
import CartCard from '../components/CartCard';

const styles = StyleSheet.create({
  flatList: {
    padding: 10,
  },
  footer: {
    paddingVertical: 30,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
export default function CartPage({
  navigation,
}: {
  navigation: CartPageNavigationProp;
}) {
  // const navigation = useNavigation<CartPageNavigationProp>();

  const cart = useStore((state: DataStore) => state.cart);
  const deleteFromCart = useStore((state: DataStore) => state.deleteFromCart);
  const totalPrice = (list: CartItem[]) => {
    let sum = 0;
    list.forEach(item => {
      sum = sum + item.price * item.count;
    });
    return sum;
  };

  return (
    <View>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
        renderItem={({item}) => (
          <CartCard product={item} onPress={deleteFromCart} />
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <Text style={styles.footerText}>{`Total Price: ${totalPrice(
              cart,
            )}`}</Text>
            <Button
              title="Go to Products List"
              onPress={() => navigation.navigate('ProductPage')}
            />
          </View>
        )}
      />
    </View>
  );
}
