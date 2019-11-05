//Libraries
import React from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';

//Componentes
import Header from './src/screens/components/header';
import CardList from './src/screens/containers/card-list';

const App: () => React$Node = () => {
  return (
    <View style={{backgroundColor: 'black', height: '100%'}}>
      <Header />
      <CardList />
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
