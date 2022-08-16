import {TouchableOpacity} from 'react-native';
import React from 'react';
import {AppPageNavigationProp} from '../navigation/types';
import CartPic from './CartPic';
function CartButton({Navigation}: {Navigation: AppPageNavigationProp}) {
  return (
    <TouchableOpacity
      style={{flexDirection: 'row'}}
      onPress={() => {
        Navigation.navigate('CartPage');
      }}>
      <CartPic />
    </TouchableOpacity>
  );
}

export default CartButton;
