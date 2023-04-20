import { useEffect, useState, useRef } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Map({ onChangeMarker }) {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const mapRef = useRef(null);

  const addressUpdated = async(coordinate) => {
    let fullAddress = await Location.reverseGeocodeAsync({
      longitude: coordinate.longitude,
      latitude: coordinate.latitude,
    });

    onChangeMarker({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      address: fullAddress[0].street
    })
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);

      addressUpdated({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      mapRef.current?.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })
    })();
  }, []);
  
  return (
      <MapView
      ref={mapRef}
      onPress={e => {
        setLatitude(e.nativeEvent.coordinate.latitude);
        setLongitude(e.nativeEvent.coordinate.longitude);
        addressUpdated(e.nativeEvent.coordinate)
        
        mapRef.current?.animateToRegion({
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        })
      }}
      userLocationPriority="high"
      showsUserLocation={true}
      style={styles.map}
      >
      <Marker
        draggable
        coordinate={{latitude: latitude, longitude: longitude}}
      />
      </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: "60%",
    width: "90%",
  },
})