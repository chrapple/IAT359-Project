import { Text, View, FlatList, Pressable } from "react-native";
import styles from "../styles";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Entry({ navigation, route }) {
  const { item } = route.params;

  // documentation: https://react-native-async-storage.github.io/2.0/Usage/
  const saveRecentlyViewed = async (item) => {
    try {
      // get whatever is already in the existing storage
      const existingHistory = await AsyncStorage.getItem("journal");

      let recentHistory = [];

      // if there is existing history,
      // go through and parse what already exists back to a usable format (because it is stored as a string in async storage)
      // assigned the new parsed items into the current history array
      if (existingHistory) {
        const parsed = JSON.parse(existingHistory);
        recentHistory = parsed;
      }

      // filter the history to only contain items that are not this item's id
      recentHistory = recentHistory.filter(
        (historyItem) => historyItem.id !== item.id,
      );

      // add new item to the front of the list
      // stringify it to save into async storage
      recentHistory.unshift(item);
      await AsyncStorage.setItem("journal", JSON.stringify(recentHistory));
      console.log(recentHistory);
    } catch (error) {
      console.log(error);
    }
  };

  const [journalLoc, setJournalLoc] = useState(null);

  async function getInitLocation() {
    try {
      // source documentation: https://docs.expo.dev/versions/latest/sdk/location/#locationgeocodeasyncaddress
      // attempts to find most suitable coordinates for location field in the item
      const locationToFind = await Location.geocodeAsync(item.location);
      console.log(locationToFind);
      // if the coordinates have been found and exist,
      // format the coordinates for longitude and latitude of the first index (best fit) find
      if (locationToFind.length > 0) {
        const foundLocation = {
          latitude: locationToFind[0].latitude,
          longitude: locationToFind[0].longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        };
        console.log("foundLocation:", foundLocation);
        // set the location of this journal entry to the coordinates above
        setJournalLoc(foundLocation);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (item) {
      saveRecentlyViewed(item);
    }
  }, []);

  // get the location when this component mounts
  useEffect(() => {
    getInitLocation();
  }, []);

  return (
    <View style={styles.journalContainer}>
      <Pressable
        style={styles.journalBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text>Back</Text>
      </Pressable>

      <Text style={styles.journalTitle}>{item.journalName}</Text>

      {/* converting from a firebase timestamp into a js date object: https://firebase.google.com/docs/reference/js/v8/firebase.firestore.Timestamp */}
      {/* converting from a js date object into a readable string to display in text: https://www.freecodecamp.org/news/how-to-format-a-date-with-javascript-date-formatting-in-js/ */}
      <Text>
        {item.startDate?.toDate().toLocaleDateString()} to{" "}
        {item.endDate?.toDate().toLocaleDateString()}
      </Text>
      {/*create the map view, pass the location found in the async function into the initial region*/}
      <MapView style={styles.journalMap} initialRegion={journalLoc} />
      <Text></Text>
    </View>
  );
}
