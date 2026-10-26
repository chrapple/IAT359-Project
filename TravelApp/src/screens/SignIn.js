import { Pressable, Text, TextInput, View, Button } from "react-native";
import { useState } from "react";
import { firebase_auth } from "../firebaseConfig";
import styles from "../styles";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = firebase_auth;

  // code for retrieving and storing user data in firebase

  // ui
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Name</Text>
      <Text>Sign In/Log In</Text>

      <View style={styles.signinContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.signinButtonsContainer}>
        <Button style={styles.signinButton} title="Sign Up" />
        <Button style={styles.signinButton} title="Log In" />
      </View>
    </View>
  );
}
// buttons above are native, if we wanna stylize them we should change them to pressables i think
