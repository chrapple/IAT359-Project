import { Pressable, Text, TextInput, View, Button } from "react-native";
import { useState } from "react";
import { firebase_auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styles from "../styles";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = firebase_auth;

  // code for retrieving and storing and adding user data in firebase
  async function signUpHandler() {
    try {
      // tells firebase to create a user with these details
      const userInfo = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      // screen switches automatically if success
      console.log(userInfo);
      alert("Success." + email + " has been signed up.");
    } catch (error) {
      // in the case that an error occurs so that the system doesn't crash
      console.log(error.message);
      alert(error.message);
    }
  }
  async function logInHandler() {
    try {
      // tells firebase to log in a user with these details
      const userInfo = await signInWithEmailAndPassword(auth, email, password);
      console.log(userInfo);
      alert("Welcome back, " + email + ".");
    } catch (error) {
      // in the case that an error occurs so that the system doesn't crash
      console.log(error.message);
      alert(error.message);
    }
  }

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
        <Button
          style={styles.signinButton}
          title="Sign Up"
          onPress={signUpHandler}
        />
        <Button
          style={styles.signinButton}
          title="Log In"
          onPress={logInHandler}
        />
      </View>
    </View>
  );
}
// buttons above are native, if we wanna stylize them we should change them to pressables i think
