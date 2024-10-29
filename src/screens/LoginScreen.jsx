import { View, StyleSheet } from "react-native";
import {
  Button,
  Divider,
  Modal,
  Portal,
  Provider,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // modal
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  async function handleLogin() {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);

      if (userCredential && userCredential.user) {
        console.log(userCredential.user);
        navigation.navigate("AccountScreen");
      } else {
        throw new Error("Failed to retrieve user information.");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      showModal();
    }
  }

  return (
    <Provider>
      <Surface style={styles.container}>
        <View style={styles.container}>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
              }}
              style={{ margin: 20 }}
            >
              <Text style={{ color: "#000", textAlign: "center" }}>
                {error}
              </Text>
            </Modal>
          </Portal>
          <View style={styles.innerContainer}>
            <Text style={{ marginVertical: 10 }} variant="headlineMedium">
              Faça seu Login
            </Text>
            <TextInput
              style={styles.alignSelfStretch}
              label="Email"
              value={email}
              onChangeText={setEmail}
            />
            <Divider style={{ marginVertical: 5 }} />

            <TextInput
              style={styles.alignSelfStretch}
              label="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button
              style={styles.spaceTop}
              mode="contained"
              onPress={handleLogin}
              loading={loading}
            >
              Entrar
            </Button>
            <Button onPress={() => navigation.navigate("RegisterScreen")}>
              Não tem uma conta? Cadastre-se
            </Button>
          </View>
        </View>
      </Surface>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    padding: 20,
    maxWidth: 400,
  },
  spaceTop: {
    marginTop: 20,
  },
  alignSelfStretch: {
    alignSelf: "stretch",
  },
});
