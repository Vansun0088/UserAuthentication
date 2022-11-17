import { StyleSheet, Text, View } from "react-native";

import Button from "./Button";
import { Colors } from "../../constants/styles";

export default function ErrorOverlay({ message, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.capitalText}>Error!</Text>
      <Text style={styles.messageText}>{message}</Text>
      <Button onPress={onPress}>Go back</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  capitalText: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.primary500,
  },
  messageText: {
    fontSize: 20,
    marginVertical: 15,
  },
});
