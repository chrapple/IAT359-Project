import { Text, TextInput, View, Pressable } from "react-native";
import { useState } from "react";
import { firebase_auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styles from "../styles";

export default function SignIn() {
  // useStates are user information
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // manages the authentication
  const auth = firebase_auth;

  // adding user in firebase
  async function signUpHandler() {
    try {
      // tells firebase to create a user with these details
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      // pops up if success
      console.log(response);
      alert("Success." + email + " has been signed up.");
    } catch (error) {
      // in the case that an error occurs so that the system doesn't crash
      // pop up alert is email is invalid, password is too weak, etc
      console.log(error.message);
      alert(error.message);
    }
  }
  // signing into existing user in firebase
  async function logInHandler() {
    try {
      // tells firebase to log in a user with these details
      const response = await signInWithEmailAndPassword(auth, email, password);
      // pops up if success
      console.log(response);
      alert("Welcome back, " + email + ".");
    } catch (error) {
      // in the case that an error occurs so that the system doesn't crash
      // pop up if user doesn't exist, etc
      console.log(error.message);
      alert(error.message);
    }
  }
  // switching of pages from sign in to the home screen happens in App.js

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
        {/* <Button
          style={styles.signinButton}
          title="Sign Up"
          onPress={signUpHandler}
        />
        <Button
          style={styles.signinButton}
          title="Log In"
          onPress={logInHandler}
        /> */}
        <Pressable style={styles.signinButton} onPress={signUpHandler}>
          <Text>Sign Up</Text>
        </Pressable>
        <Pressable style={styles.signinButton} onPress={logInHandler}>
          <Text>Log In</Text>
        </Pressable>
      </View>
    </View>
  );
}
