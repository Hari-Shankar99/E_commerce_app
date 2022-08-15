// import {StatusBar} from 'expo-status-bar';
import {Button, FlatList, Text, View} from 'react-native';
import React from 'react';

import {DataStore, Product, useStore} from '../store';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

import {NavigationEvents} from 'react-navigation';
import {
  ProductPageNavigationProp,
  CartPageNavigationProp,
} from '../navigation/types';
import {useNavigation} from '@react-navigation/native';
import CartCard from '../components/CartCard';

export default function CartPage() {
  const navigation = useNavigation<CartPageNavigationProp>();

  const cart = useStore((state: DataStore) => state.cart);
  const deleteFromCart = useStore((state: DataStore) => state.deleteFromCart);
  const addToCart = useStore((state: DataStore) => state.addToCart);
  const totalPrice = list => {
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
        style={{padding: 10}}
        renderItem={({item}) => (
          <CartCard product={item} onPress={deleteFromCart} />
        )}
        ListFooterComponent={() => (
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 30,
                fontWeight: 'bold',
              }}>{`Total Price: ${totalPrice(cart)}`}</Text>
            <Button
              title="Go to Products List"
              
              onPress={() => navigation.navigate('ProductPage')}
            />
          </View>
        )}></FlatList>
    </View>
  );
}
