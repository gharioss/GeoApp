import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, SafeAreaView, View, Image } from 'react-native';
import * as MediaLibrary from "expo-media-library";
import { shareAsync } from 'expo-sharing';

export default function CameraApp() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      let cameraPermission = await Camera.requestCameraPermissionsAsync({});
      let mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync({});
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");      
    })();
  }, []);

  // if (!hasCameraPermission === undefined) {
  //   return <Text>Demande de permission...</Text>
  // } else if (!hasCameraPermission) {
  //   return;
  // };

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };
    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };
    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };
    
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64}} />
        <Button title="Share" onPress={sharePic} />
        { hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined }
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    )
  }

  return (
      <Camera style={styles.container} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <Button title="Take picture" onPress={takePic} />
        </View>
      </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1
  }
})