// firebase
import { firebase_auth } from "./src/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
// nav
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// uses
import { useEffect, useState } from "react";
// screens
import SignIn from "./src/screens/SignIn";
import HomeScreen from "./src/screens/HomeScreen";
import Create from "./src/screens/Create";
import Journals from "./src/screens/Journals";
import Settings from "./src/screens/Settings";

export default function App() {
  // create navigators
  const Stack = createNativeStackNavigator();
  const BottomTab = createBottomTabNavigator();
  // useState for the user, starts empty because no user is signed in
  const [user, setUser] = useState(null);

  // function for whole bottom tab after sign in
  // protected navs: https://docs.expo.dev/router/advanced/protected/
  function mainRootNav() {
    return (
      <BottomTab.Navigator initialRouteName="Home">
        <BottomTab.Screen name="Home" component={HomeScreen} />
        {/* tutorial to hide nav bar when on create page: https://www.youtube.com/watch?v=oqPrCiZyUEs */}
        <BottomTab.Screen name="Create" component={Create} options = {{tabBarStyle: {display: "none"}}} />
        <BottomTab.Screen name="Journals" component={Journals} />
        <BottomTab.Screen name="Settings" component={Settings} />
      </BottomTab.Navigator>
    );
  }
  // additional stack is needed for the journal route, create it below this comment

  useEffect(() => {
    // onAuthStateChanged from firebase sets up a listener
    onAuthStateChanged(firebase_auth, (user) => {
      // if a user is found, set the user to the signed in user, otherwise it will stay empty
      setUser(user);
    });
  }, []); // fires exactly once

  return (
    <NavigationContainer>
      {/* initial route name has to match the screen name */}
      <Stack.Navigator initialRouteName="Sign In">
        {/* if a user exists, go to home from the main root navigation, 
        if user is null, be on sign in screen*/}
        {user ? (
          <Stack.Screen
            name="Home"
            component={mainRootNav}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Sign In"
            component={SignIn}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// reference for how i hid the header: https://docs.expo.dev/router/advanced/stack/
