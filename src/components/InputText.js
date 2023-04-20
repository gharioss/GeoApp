import { StyleSheet, Text, View, Button } from "react-native";

export default function InputText({ title }) {
  return (
      <Text style={styles.input}>{title}</Text>
  );
};

const styles = StyleSheet.create({
    input: {
      width: "100%",
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });