import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text, Card, Divider, Badge} from 'react-native-elements';

class WatherCard extends Component {
  render() {
    return (
      <Card>
        <Text style={styles.locationtext}>{this.props.location}</Text>
        <View style={styles.visuals}>
          <Image
            style={styles.weatherimage}
            source={{
              uri:
                'https://openweathermap.org/img/w/' +
                this.props.detail.weather[0].icon +
                '.png',
            }}
          />
          <Text h4>
            {' '}
            {this.props.detail.main.temp}
            °C{' '}
          </Text>
        </View>
        <Text style={styles.temptext}>
          MAX: {this.props.detail.main.temp_max}
          °C - MIN: {this.props.detail.main.temp_min}
          °C{' '}
        </Text>
        <View style={styles.badgescontainer}>
          <Badge
            status="success"
            value={
              <Text style={styles.badgetext}>
                {' '}
                Humedad: {this.props.detail.main.humidity}{' '}
              </Text>
            }
          />
          <Badge
            status="primary"
            value={
              <Text style={styles.badgetext}>
                {' '}
                Presion: {this.props.detail.main.pressure}{' '}
              </Text>
            }
          />
          <Badge
            status="warning"
            value={
              <Text style={styles.badgetext}>
                {' '}
                Nivel Del Suelo: {this.props.detail.main.grnd_level}{' '}
              </Text>
            }
          />
        </View>
        <Divider style={styles.divider} />
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(56, 172, 236, 1)',
    borderWidth: 0,
    borderRadius: 20,
  },
  locationtext: {
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  visuals: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherimage: {
    width: 70,
    height: 70,
  },
  temptext: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  badgescontainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  divider: {
    backgroundColor: 'blue',
  },
  badgetext: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WatherCard;
