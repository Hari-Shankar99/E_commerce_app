import create from 'zustand';
import {AxiosResponse} from 'axios';

export type DataStore = {
  cart: Array<CartItem>;
  addToCart: (item: Product) => void;
  deleteFromCart: (itemId: number) => void;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};
export type CartItem = {
  id: number;
  count: number;
  name: string;
  price: number;
  image: string;
};

export const useStore = create<DataStore>(set => ({
  cart: [],
  addToCart: (item: Product) =>
    set(state => {
      let newCart = [];
      let alreadyExist = false;
      for (let i = 0; i < state.cart.length; i++) {
        let itemFromState = state.cart[i];
        if (itemFromState.id === item.id) {
          alreadyExist = true;
          newCart.push({...item, count: itemFromState.count + 1});
        } else {
          newCart.push(itemFromState);
        }
      }
      if (alreadyExist === false) {
        newCart.push({...item, count: 1});
      }
      return {...state, cart: newCart};
    }),
  deleteFromCart: itemId =>
    set(state => {
      let newCart = [];
      for (let i = 0; i < state.cart.length; i++) {
        let itemFromState = state.cart[i];
        if (itemFromState.id !== itemId) {
          newCart.push({
            id: itemFromState.id,
            name: itemFromState.name,
            image: itemFromState.image,
            count: itemFromState.count,
            price: itemFromState.price,
          });
        } else {
          if (state.cart[i].count !== 1) {
            newCart.push({...state.cart[i], count: itemFromState.count - 1});
          }
        }
      }
      return {...state, cart: newCart};
    }),
}));
