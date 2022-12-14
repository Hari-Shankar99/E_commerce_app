import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  home: undefined;
  ProductPage: {};
  CartPage: {};
};
export type AppPageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'home'
>;
export type ProductPageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProductPage'
>;
export type CartPageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CartPage'
>;
