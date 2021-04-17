import React, { Component } from 'react';
import {  PermissionsAndroid,StyleSheet, View,Alert } from 'react-native';
import { Marker } from 'react-native-maps';
import MapView, {PROVIDER_GOOGLE, PROVIDER_DEFAULT} from 'react-native-maps';

export async function request_ACCESS_FINE_LOCATION_runtime_permission() {

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'XENIA LOCATION Permission',
        'message': 'XENIA App needs access to your LOCATION '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert("LOCATION Permission Granted.");
    }
    else {
      Alert.alert("LOCATION Permission Not Granted");
    }
  } catch (err) {
    console.warn(err)
  }
}

export default class map extends Component {
  async componentDidMount() {
  await request_ACCESS_FINE_LOCATION_runtime_permission()
}
  render() {
    return (
      <View style={styles.MainContainer}>
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          initialRegion={{
            latitude: 28.579660,
            longitude: 77.321110,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{ latitude:28.579660, longitude:77.321110 }}
            title={""}
            description={""}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    position: 'absolute',
    height: '50%',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
