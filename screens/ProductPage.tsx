// import {StatusBar} from 'expo-status-bar';
import {
  ActivityIndicator,
  Button,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {DataStore, Product, useStore} from '../store';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {useState} from 'react';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {StyleSheet} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import ProductCard from '../components/ProductCard';
import {FlatList} from 'react-native';
import openseaAPI from '../api/opensea';
import {NavigationEvents} from 'react-navigation';
import {
  ProductPageNavigationProp,
  CartPageNavigationProp,
} from '../navigation/types';
import {useNavigation} from '@react-navigation/native';
import CartPage from './CartPage';
import CartButton from '../components/CartButton';

const styles = StyleSheet.create({
  flexPage: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pageNumber: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  previous: {
    flex: 1,
  },
  next: {
    flex: 1,
  },
});
type QueryKey = {queryKey: [string, number]};
const queryClient = new QueryClient();

function ProductPage() {
  const navigation = useNavigation<ProductPageNavigationProp>();

  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [products, setProducts] = useState([]);
  const cartLength = useStore((state: DataStore) => state.cart.length);
  const addToCart = useStore((state: DataStore) => state.addToCart);
  const deleteFromCart = useStore((state: DataStore) => state.deleteFromCart);

  const fetchProducts = async ({queryKey}: QueryKey) => {
    const startPage = queryKey[1];
    return openseaAPI.get<Product[]>('', {
      params: {
        offset: startPage * 10,
        limit: 10,
      },
    });
  };
  const {
    data: response,
    error,
    isError,
    isSuccess,
    isLoading,
    status,
  } = useQuery(['products', page], fetchProducts);
  useEffect(() => {
    console.log('checking status');
    if (isSuccess) {
      setProducts(
        response.data.collections.map((item, index: number) => {
          return {
            id: page * 10 + index,
            name: item.name,
            image: item.image_url,
            price: item.stats.average_price+20,
          };
        }),
      );
    } else if (isError) {
      setErrorMsg(error.message);
    }
  }, [response, error]);
  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (

  //     ),
  //   });
  // }, [cartLength]);
  return (
    <View>
      {isLoading ? (
        <View
          style={{
            marginTop:'45%',
          }}>
          <ActivityIndicator size="large"/>
        </View>
      ) : isError ? (
        <Text>{error.message}</Text>
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          style={{padding: 10}}
          renderItem={({item}) => (
            <ProductCard product={item} onPress={addToCart} />
          )}
          ListFooterComponent={() => (
            <View style={styles.footer}>
              <View style={styles.previous}>
                <Button
                  title={page === 0 ? '' : 'Previous'}
                  onPress={() => {
                    if (page !== 0) {
                      setPage(page - 1);
                    }
                  }}
                />
              </View>
              <View>
                <Text style={styles.pageNumber}>{page + 1}</Text>
              </View>
              <View style={styles.next}>
                <Button title="Next" onPress={() => setPage(page + 1)} />
              </View>
            </View>
          )}></FlatList>
      )}
    </View>
  );
}
export default ProductPage;
