import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
});
function Logo() {
  return (
    <View>
      <Image style={styles.image} source={require('../images/logo.png')} />
    </View>
  );
}
export default Logo;
