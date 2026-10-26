import { Pressable, Text, TextInput, View } from "react-native";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
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

      <View style={styles.signinContainer}>
        <Pressable style={styles.signinButton} title="Sign Up" />
        <Pressable style={styles.signinButton} title="Log In" />
      </View>
    </View>
  );
}
