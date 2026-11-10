import { Text, View, FlatList, Pressable } from "react-native";
import styles from "../styles";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useState, useEffect, useRef } from "react";

export default function Entry({ navigation, route }) {
  const { item } = route.params;
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
        console.log(foundLocation);
        // set the location of this journal entry to the coordinates above
        setJournalLoc(foundLocation);
      }
    } catch (error) {
      console.log(error);
    }
  }
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
