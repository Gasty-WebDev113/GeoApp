import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/GeoApp_logo.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
