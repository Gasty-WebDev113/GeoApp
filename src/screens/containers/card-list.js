import React, {Component} from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import {Text as TextElement} from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';
import WatherCard from '../components/card';

class CardList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      forecast: [],
      error: '',
      loading: true,
      optimize: false,
    };
  }

  componentDidMount() {
    this.getLocalization();
  }

  getLocalization() {
    Geolocation.getCurrentPosition(
      //Get the localization
      info => {
        this.setState(
          prevState => ({
            latitude: info.coords.latitude, //this set the position of geolocalization
            longitude: info.coords.longitude,
          }),
          () => {
            this.getWeather();
          }, //after to set the state, this call a callback sending the Api
        );
      },
      error => this.ErrorHandler(error),
      {
        enableHighAccuracy: this.state.optimize ? false : true,
        timeout: 10000,
        maximumAge: 1000,
      },
      //Timeout: tiempo de espera
    );
  }

  getWeather() {
    const Api_key = '07a38e99cf5088cb4f9a75140796497e';

    let Api =
      'https://api.openweathermap.org/data/2.5/forecast?lat=' +
      this.state.latitude +
      '&lon=' +
      this.state.longitude +
      `&units=metric&appid=${Api_key}`;
    //Set the Api with the latitude and longitude and search the place where you live

    //Call the Api
    fetch(Api)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState((prevState, props) => ({
          forecast: data,
          loading: false,
        }));
      })
      .then(console.log(this.state.forecast));
  }

  ErrorHandler(error) {
    error.code === 2
      ? (Alert.alert('GPS Apagado 😱'),
        this.setState({error: 'Enciende tu GPS para continuar 🛰'}))
      : error.code === 3
        ? (Alert.alert('Se acabo el tiempo ⏰. Bajando Precision'),
          this.setState({
            error: 'El Gps tarda demaciado ☹ Bajando Precision...',
            optimize: true,
          }),
          this.getLocalization())
        : null;
  }

  render() {
    return (
      <View>
        {this.state.loading & !this.state.error ? (
          <ActivityIndicator style={styles.loading} size={70} />
        ) : null}
        <FlatList
          data={this.state.forecast.list}
          keyExtractor={item => item.dt}
          style={styles.list}
          renderItem={({item}) => (
            <WatherCard
              detail={item}
              location={this.state.forecast.city.name}
            />
          )}
          ListEmptyComponent={
            this.state.error ? (
              <TextElement h4 style={styles.error_message}>
                {' '}
                {this.state.error}{' '}
              </TextElement>
            ) : (
              <TextElement h4 style={styles.message}>
                {' '}
                Recuerda Encender La Localizacion{' '}
              </TextElement>
            )
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    height: 300,
    marginHorizontal: 25,
  },
  list: {
    backgroundColor: 'black',
    marginBottom: 150,
  },
  error_message: {
    textAlign: 'center',
    color: 'white',
    justifyContent: 'center',
    marginTop: '50%',
  },
  message: {
    textAlign: 'center',
    color: 'white',
    marginTop: '20%',
  },
});

export default CardList;
