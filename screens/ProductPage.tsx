// import {StatusBar} from 'expo-status-bar';
import {ActivityIndicator, Button, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {DataStore, useStore} from '../store';
import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {StyleSheet} from 'react-native';
import ProductCard from '../components/ProductCard';
import {FlatList} from 'react-native';
import openseaAPI from '../api/opensea';

const styles = StyleSheet.create({
  loadingMsg: {
    marginTop: '45%',
  },
  errorMsg: {textAlign: 'center', textAlignVertical: 'center'},
  flatList: {
    padding: 10,
  },
  flexPage: {
    flexDirection: 'row',
 
  },
  pageNumber: {
    paddingVertical: 2,
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
  },
  pageButtons: {
    flex: 5,
    marginHorizontal: 20,
  },
});

type QueryKey = {queryKey: [string, number]};
type Data = {collections: object};

function ProductPage() {
  // const navigation = useNavigation<ProductPageNavigationProp>();

  const [page, setPage] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [products, setProducts] = useState([]);
  const addToCart = useStore((state: DataStore) => state.addToCart);

  const fetchProducts = async ({queryKey}: QueryKey) => {
    const startPage = queryKey[1];
    return openseaAPI.get('', {
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
  } = useQuery(['products', page], fetchProducts);

  useEffect(() => {
    console.log('checking status');
    if (isSuccess) {
      const data = response.data as Data;
      setProducts(
        response.data.collections.map(
          (
            item: object & {
              name: string;
              image_url: string;
              stats: {average_price: number};
            },
            index: number,
          ) => {
            return {
              id: page * 10 + index,
              name: item.name,
              image: item.image_url,
              price: item.stats.average_price + 20,
            };
          },
        ),
      );
    } else if (isError) {
      setErrorMsg(error.message);
    }
  }, [response, error, isError, isSuccess, page]);

  return (
    <View>
      {isLoading ? (
        <View style={styles.loadingMsg}>
          <ActivityIndicator size="large" />
        </View>
      ) : isError ? (
        <Text style={styles.errorMsg}>{errorMsg}</Text>
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          style={styles.flatList}
          renderItem={({item}) => (
            <ProductCard product={item} onPress={addToCart} />
          )}
          ListFooterComponent={() => (
            <View style={styles.footer}>
              <View style={styles.pageButtons}>
                <Button
                  disabled={page === 0}
                  title={'Previous'}
                  onPress={() => {
                    if (page !== 0) {
                      setPage(page - 1);
                    }
                  }}
                />
              </View>
              <View style={styles.pageNumber}>
                <Text
                  style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>{page + 1}</Text>
              </View>
              <View style={styles.pageButtons}>
                <Button title="Next" onPress={() => setPage(page + 1)} />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
export default ProductPage;
