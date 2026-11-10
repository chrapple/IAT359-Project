import { Text, View, FlatList, Pressable, Button, ScrollView } from "react-native";
import styles from "../styles";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useState, useEffect, useRef } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

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

  async function deleteJournal(id) {
    // deleting a document from the collection in firebase: https://firebase.google.com/docs/firestore/manage-data/delete-data
    try {
      await deleteDoc(doc(db, "journals", id));
      navigation.goBack();
    } catch (e) {
      console.error("Error deleting your journal: ", e);
    }
  }

  // get the location when this component mounts
  useEffect(() => {
    getInitLocation();
  }, []);

  // displaying categories -- creates new array with just names because allCategories includes id and some entries dont have categories at all.
  const categories = item.allCategories.length > 0 ? item.allCategories.map((entry) => entry.name) : null;
  // console.log(categories);

  return (
    // <ScrollView style={styles.journalContainer}>
    <ScrollView>
      <Pressable
        style={styles.journalBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text>Back</Text>
      </Pressable>

      <Text style={styles.journalTitle}>{item.journalName}</Text>
      <Text style={styles.journalSubtitle}>{item.location}</Text>
      {/* Adding text between array string items: https://dev.to/ofthewildfire/javascript-string-manipulation-how-to-use-split-reverse-and-join-4ojf */}
      {categories ? <Text style={styles.journalCategories}>{categories.join(", ")}</Text> : <Text style={styles.journalCategories}>No categories</Text>}

      {/* converting from a firebase timestamp into a js date object: https://firebase.google.com/docs/reference/js/v8/firebase.firestore.Timestamp */}
      {/* converting from a js date object into a readable string to display in text: https://www.freecodecamp.org/news/how-to-format-a-date-with-javascript-date-formatting-in-js/ */}
      <Text>
        {item.startDate?.toDate().toLocaleDateString()} to {" "}
        {item.endDate?.toDate().toLocaleDateString()}
      </Text>
      {/*create the map view, pass the location found in the async function into the initial region*/}
      <MapView style={styles.journalMap} initialRegion={journalLoc} />
    </View>
      {/* TO DO view for styling */}
      <View>
        <Text style={styles.journalTitle}>{item.journalName}</Text>

        {/* converting from a firebase timestamp into a js date object: https://firebase.google.com/docs/reference/js/v8/firebase.firestore.Timestamp */}
        {/* converting from a js date object into a readable string to display in text: https://www.freecodecamp.org/news/how-to-format-a-date-with-javascript-date-formatting-in-js/ */}
        <Text>
          {item.startDate?.toDate().toLocaleDateString()} to{" "}
          {item.endDate?.toDate().toLocaleDateString()}
        </Text>
      </View>

      <View style = {styles.entryButtons}>
        <Button title = "Location" />
        <Button title = "Category" />
        <Button title = "Edit" />
      </View>

      {/*create the map view, pass the location found in the async function into the initial region*/}
      <MapView style={styles.journalMap} initialRegion={journalLoc} />
      <Text></Text>

      {/* journal delete button */}
      <Pressable onPress = {() => deleteJournal(item.id)} style = {styles.signOutButton}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
      </Pressable>
    </ScrollView>
  );
}
