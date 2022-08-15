import React from 'react';
import {
  Button,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {StyleSheet, Text} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {Image} from 'react-native';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductPage from './screens/ProductPage';
import CartPage from './screens/CartPage';
import {SafeAreaView} from 'react-native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import {NavigationEvents} from 'react-navigation';
import Logo from './components/Logo';
import {
  ProductPageNavigationProp,
  CartPageNavigationProp,
} from './navigation/types';
import CartButton from './components/CartButton';
import {DataStore, useStore} from './store';
const dummyData = [
  {name: 'hari', price: 10},
  {name: 'hari', price: 10},
  {name: 'hari', price: 10},
];
const Stack = createNativeStackNavigator();
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  product: {
    backgroundColor: 'pink',
    borderRadius: 20,
  },
  text: {
    padding: 2,
    marginLeft: 20,
    fontSize: 15,
    fontFamily: 'arial',
  },
  productImage: {
    width: 150,
    height: 150,
    marginLeft: 20,
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
const queryClient = new QueryClient();
const App = () => {
  const cartLength:number = useStore((state: DataStore) => state.cart.length);
  return (
    <>
      <StatusBar style="dark" />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="ProductPage"
            screenOptions={{
              headerStyle: {backgroundColor: '#4bc46b'},
              headerBackTitleVisible: false,
              headerTintColor: 'black',
              contentStyle: {backgroundColor: '#d5f0d3'},
            }}>
            <Stack.Screen
              name="ProductPage"
              component={ProductPage}
              options={({navigation}) => ({
                title: "Hari's Shop",
                headerTitleStyle: {fontFamily:'Times new roman',fontWeight:'300', fontSize:26,},
                headerRight: () => (
                  <CartButton Navigation={navigation} count={cartLength} />
                ),
                headerLeft: () => (<Logo />),
              })}
            />
            <Stack.Screen
              name="CartPage"
              component={CartPage}
              options={{
                title: 'Cart',
                
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
   </>
  );
};
export default App;
