import { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Divider,
  Modal,
  Portal,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);

  async function handleRegister() {
    if (password === "") {
      setError("A senha não pode estar vazia.");
      showModal();
      return;
    }

    if (password !== passwordConfirm) {
      setError("As senhas não coincidem.");
      showModal();
      return;
    }

    setLoading(true);
    try {
      const usuario = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userDoc = await setDoc(
        // cria uma nova entrada no banco de dados
        doc(db, "usuarios", usuario.user.uid), // define a id do documento
        {
          name,
          phone,
        }
      );
      setLoading(false);
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
      showModal();
    }
  }

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <Surface style={styles.container}>
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
          <Text style={{ textAlign: "center", color: "#000" }}>{error}</Text>
        </Modal>
      </Portal>

      <View style={styles.innerContainer}>
        <Text variant="headlineMedium">Registre sua conta</Text>
        <TextInput
          style={styles.alignSelfStretch}
          label="Nome"
          value={name}
          onChangeText={setName}
        />
        <Divider style={{ marginVertical: 5 }} />
        <TextInput
          style={styles.alignSelfStretch}
          label="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Divider style={{ marginVertical: 5 }} />
        <TextInput
          style={styles.alignSelfStretch}
          label="Telefone"
          value={phone}
          onChangeText={setPhone}
        />
        <Divider style={{ marginVertical: 5 }} />
        <TextInput
          style={styles.alignSelfStretch}
          label="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Divider style={{ marginVertical: 5 }} />
        <TextInput
          style={styles.alignSelfStretch}
          label="Confirme a senha"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          secureTextEntry
        />
        <Divider style={{ marginVertical: 5 }} />
        <Button mode="contained" onPress={handleRegister} loading={loading}>
          Cadastrar
        </Button>
        <Button onPress={() => navigation.navigate("LoginScreen")}>
          Já tem uma conta? Faça login
        </Button>
      </View>
    </Surface>
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
