import { Text, View, FlatList, Pressable, Button } from "react-native";
import styles from "../styles";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export default function HomeScreen() {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const isFocused = useIsFocused();
  // will use later, keeps running into an error
  const navigation = useNavigation();

  const getRecentlyViewed = async () => {
    try {
      // get the items from async storage
      const viewedJournals = await AsyncStorage.getItem("journal");
      console.log("viewedJournals: ", viewedJournals);
      if (viewedJournals !== null) {
        // parse the items back into arrays
        const parsedResult = JSON.parse(viewedJournals);
        // set the recentlyViewed variable
        setRecentlyViewed(parsedResult);
        console.log("recentlyViewed: ", recentlyViewed);
      } else {
        // otherwise, use an empty array
        setRecentlyViewed([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // clearing the history
  const clearHistory = async () => {
    // clear the UI first
    setRecentlyViewed([]);
    // then clear the actual storage data
    await AsyncStorage.clear();
  };

  useEffect(() => {
    if (isFocused) {
      // if this screen is in focused view, run the function
      getRecentlyViewed();
      console.log("use effect worked, getRecentlyViewed() run");
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.homeScreenTitle}>Jump back in!</Text>
      <Button title="Clear History" onPress={clearHistory} />
      <FlatList
        data={recentlyViewed}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            {/* Encased list items onto pressable buttons */}
            <Pressable style={styles.recentlyViewedList}>
              <Text style={styles.journalListTitles}>{item.journalName}</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
