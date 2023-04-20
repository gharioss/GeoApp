import { StyleSheet, View, StatusBar, Text } from "react-native";
import Map from "../../components/Map";
import InputText from "../../components/InputText";
import { useState } from "react";
import { Link } from "expo-router";
import ImagePickerApp from "../../components/ImagePickerApp";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

export default function Page() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState(null);

  const onChangeMarker = ({ latitude, longitude, address }) => {
    setLatitude(latitude);
    setLongitude(longitude);
    setAddress(address);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Map onChangeMarker={onChangeMarker} />
        <InputText title={latitude} />
        <InputText title={longitude} />
        <InputText title={address} />
        <InputText title={latitude} />
        <InputText title={longitude} />
        <InputText title={address} />
        <InputText title={latitude} />
        <InputText title={longitude} />
        <InputText title={address} />
        <InputText title={latitude} />
        <InputText title={longitude} />
        <InputText title={address} />
        <InputText title={latitude} />
        <InputText title={longitude} />
        <InputText title={address} />
        <InputText title={latitude} />
        <InputText title={longitude} />
        <InputText title={address} />

        <ImagePickerApp />
        <Link href="/camera">Take a Picture</Link>
      </ScrollView>
    </SafeAreaView>
    // <SafeAreaView>
    //   <ScrollView>
    //     <View style={styles.container}>
    //       <Map onChangeMarker={onChangeMarker} />
          
    //       <InputText title={latitude} />
    //       <InputText title={longitude} />
    //       <InputText title={address} />

    //       <ImagePickerApp />
    //       <Link href="/camera">Take a Picture</Link>
          
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});
