import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductPage from './screens/ProductPage';
import CartPage from './screens/CartPage';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Logo from './components/Logo';
import CartButton from './components/CartButton';

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <StatusBar style="dark" />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="ProductPage"
            screenOptions={{
              headerTitleAlign: 'center',
              headerStyle: {backgroundColor: '#4bc46b'},
              headerBackTitleVisible: false,
              headerTintColor: 'black',
              contentStyle: {backgroundColor: '#e8d49b'},
            }}>
            <Stack.Screen
              name="ProductPage"
              component={ProductPage}
              options={({navigation}) => ({
                title: "Hari's Shop",
                headerTitleStyle: {
                  fontFamily: 'ShortBaby',
                  fontWeight: '300',
                  fontSize: 26,
                  
                },
                headerRight: () => <CartButton Navigation={navigation} />,
                headerLeft: () => <Logo />,
              })}
            />
            <Stack.Screen
              name="CartPage"
              component={CartPage}
              options={{
                title: 'Cart',
                headerTitleStyle: {fontWeight: '500', fontSize: 22},
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </>
  );
};
export default App;
