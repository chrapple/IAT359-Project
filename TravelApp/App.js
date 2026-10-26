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

// stack navigator
function StackNavigator() {
  // this needs to be filled with like pages that stack further, for example, the journal page for example
  // my travel journals > specific journal > detailed view of maps, photos, etc
}

// stack navigator
function authentificationNavigator() {
  // reference firebase auth demo lab for having the user authenticate before getting access to the rest of the app
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="SignIn" component={SignIn} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Create" component={Create} />
        <Tab.Screen name="Journals" component={Journals} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
