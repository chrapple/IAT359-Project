import { Pressable, Text, TextInput, View } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styles from "../styles";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = firebase_auth;

  return (
    <View style={styles.container}>
      <Text>Sign In/Log In</Text>
      <TextInput>
        style={styles.input}
        placeholder="Email" value={email}
        onChangeText={setEmail}
      </TextInput>
      <TextInput>
        style={styles.input}
        placeholder="Password" secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      </TextInput>
      <Pressable></Pressable>
    </View>
  );
}
