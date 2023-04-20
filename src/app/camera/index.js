import { StyleSheet, Text, View, Button } from "react-native";
import CameraApp from "../../components/CameraApp";

export default function Page() {

  return (
    <View style={styles.container}>
      <CameraApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
