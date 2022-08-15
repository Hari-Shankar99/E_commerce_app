import {Button, TouchableOpacity,Text} from 'react-native';
import React from 'react';
import {NavigationEvents} from 'react-navigation';
import {
  ProductPageNavigationProp,
  CartPageNavigationProp,
} from '../navigation/types';
import {useNavigation} from '@react-navigation/native';
import CartPic from './CartPic';
function CartButton({Navigation,count}) {
  return (
    <TouchableOpacity
      style ={{flexDirection:'row'}}
      onPress={() => {
        Navigation.navigate('CartPage');
      }}
    ><CartPic/>
    <Text>{count.toString()}</Text>
    </TouchableOpacity>
  );
}

export default CartButton;
