import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// importing the screens
import SignIn from "./src/screens/SignIn";
import HomeScreen from "./src/screens/HomeScreen";
import Create from "./src/screens/Create";
import Journals from "./src/screens/Journals";
import Settings from "./src/screens/Settings";

// create navigators
const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

// remove the sign in from here later when the authentification is figured out, move all tabs into one function (nested)
export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen name="Sign In" component={SignIn} />
        <BottomTab.Screen name="Home" component={HomeScreen} />
        <BottomTab.Screen name="Create" component={Create} />
        <BottomTab.Screen name="Journals" component={Journals} />
        <BottomTab.Screen name="Settings" component={Settings} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
