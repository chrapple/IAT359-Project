import { Text, View, Pressable, Alert } from "react-native";
import styles from "../styles";
import { signOut } from "firebase/auth";
import { firebase_auth } from "../firebaseConfig";

export default function Settings() {

  // Sign out uses firebase native signOut() function
  async function signOutHandler() {
    try {
      await signOut(firebase_auth);
      alert("Signed out successfully");
    }
    catch (e) {
      Alert.alert("Sign Out Error", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Settings</Text>

      {/* Sign Out Button */}
      <Pressable style={styles.signOutButton} onPress={signOutHandler}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Sign Out</Text>
      </Pressable>
    </View>
  );
}
