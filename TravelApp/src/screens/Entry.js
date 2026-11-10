import { Text, View, FlatList, Pressable, Button, ScrollView, Image } from "react-native";
import styles from "../styles";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useRef } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

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
  const [countryFlag, setCountryFlag] = useState(null);

  async function getInitLocation() {
    try {
      // source documentation: https://docs.expo.dev/versions/latest/sdk/location/#locationgeocodeasyncaddress
      // attempts to find most suitable coordinates for location field in the item
      const locationToFind = await Location.geocodeAsync(item.location);
      // console.log(locationToFind);
      // if the coordinates have been found and exist,
      // format the coordinates for longitude and latitude of the first index (best fit) find
      if (locationToFind.length > 0) {
        const foundLocation = {
          latitude: locationToFind[0].latitude,
          longitude: locationToFind[0].longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        };
        // console.log(foundLocation);
        // set the location of this journal entry to the coordinates above
        setJournalLoc(foundLocation);

        // returning the foundLocation to use in the getFlag function
        return foundLocation;
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

  async function deleteJournal(id) {
    // deleting a document from the collection in firebase: https://firebase.google.com/docs/firestore/manage-data/delete-data
    try {
      await deleteDoc(doc(db, "journals", id));
      navigation.goBack();
    } catch (e) {
      console.error("Error deleting your journal: ", e);
    }
  }

  async function getLocationFlag() {
    try {
      // calling the getInitLocation to get location
      const location = await getInitLocation();

      // use revese geocoding to retrieve the information on the inital location from the locations long and lat 
      const country = await Location.reverseGeocodeAsync({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      // console.log(country);
      // getting the country name to then pass into the api call
      const countryName = country[0].country;
      // console.log(countryName);

      // calling https://restcountries.com/ api to get the journal location country flag to display
      const response = await fetch (`https://api.restcountries.com/countries/v5?q=${countryName}`,
        { headers: { 'Authorization': 'Bearer rc_live_c2d46a4478814dba9e138e5f47049045' } });
      const data = await response.json();

      // console.log(data.data.objects[0]);

      // setting the country flag as the associated png from fetch
      // properties of the api fetch can be found here: https://restcountries.com/
      setCountryFlag(data.data.objects[0].flag.url_png);
    } catch (e) {
      console.log("Error in fetching the country flag: ", e);
    }
  }

  // get the location and country flag when this component mounts
  useEffect(() => {
    getInitLocation();
    getLocationFlag();
  }, []);

  // displaying categories -- creates new array with just names because allCategories includes id and some entries dont have categories at all.
  const categories = item.allCategories.length > 0 ? item.allCategories.map((entry) => ({
    id: entry.id,
    name: entry.name
  })) : null;
  // console.log(categories);

  return (
    // <ScrollView style={styles.journalContainer}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Pressable
        style={styles.journalBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text>Back</Text>
      </Pressable>

      <Text style={styles.journalTitle}>{item.journalName}</Text>

      {/* TO DO styling */}
      <View>
        <Image source={{uri: countryFlag}} style = {styles.flagImage}/>
        <Text style={styles.journalSubtitle}>{item.location}</Text>
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
      
      {/* Adding text between array string items: https://dev.to/ofthewildfire/javascript-string-manipulation-how-to-use-split-reverse-and-join-4ojf */}
      {/* {categories ? <Text style={styles.journalCategories}>{categories.join(", ")}</Text> : <Text style={styles.journalCategories}>No categories</Text>} */}
      
      <View>
        <Text>Categories</Text>
        {categories ? 
        <View style = {styles.categoryGrid}>
          {categories.map((category) => (
            <View key = {category.id} style = {styles.categoryFolder}>
              <Text>{category.name}</Text>
            </View>
          ))}
        </View>
        : 
        <Text style={styles.journalCategories}>No categories</Text>}
      </View>

      {/* journal delete button */}
      <Pressable onPress = {() => deleteJournal(item.id)} style = {styles.signOutButton}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
      </Pressable>
    </ScrollView>
  );
}
