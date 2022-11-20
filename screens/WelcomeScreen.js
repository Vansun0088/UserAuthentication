import { useContext, useLayoutEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";
import { freshToken, welcomeMessage } from "../util/auth";

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState("");

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useLayoutEffect(() => {
    async function getMessage() {
      const message = await welcomeMessage(token);
      setFetchedMessage(message);
    }
    getMessage();
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>{fetchedMessage}</Text>
      <Text>You authenticated successfully!</Text>
      <Button onPress={freshToken} title="Check" />
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
