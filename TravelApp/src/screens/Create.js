import {
  Text,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Image,
  Button,
  FlatList,
  Alert,
} from "react-native";
import { useState } from "react";
import DatePicker from "react-native-ui-datepicker";
import * as ImagePicker from "expo-image-picker";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function Create() {
  //variables
  const [journalName, setJournalName] = useState("");
  const [location, setLocation] = useState("");
  const [suggestedLocation, setSuggestedLocation] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  const [addedNewJournal, setaddedNewJournal] = useState("False");

  // function for the user to pick an image from their camera roll

  // DOCUMENTATION: (do the same to takePhoto function)
  // https://docs.expo.dev/versions/latest/sdk/imagepicker/
  async function pickImage() {
    // getting the image the user picked
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ["images"],
      // firestore has a limit of 1 MB so reduce quality and allow editing
      // try lowering quality even more if not working
      quality: 0.5,
      base64: true,
    });

    // setting the image picked as the one that will be used
    if (!result.canceled) {
      // image data needs to be a base64 string (probably the right answer on the midterm lol) so replaced uri with base64
      // need the data:image/jpeg;base64 so that it can be read by Image element 
      setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  }

  // function for the user to take a photo with the phone
  async function takePhoto() {
    // first we need permission to use the phones camera
    const permResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permResult.granted) {
      Alert.alert("Permission to use the camera is required.");
      return;
    }

    // this opens the camera and allows the user to take a photo
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    // sets the image taken as the image they will use
    if (!result.canceled) {
      setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  }

  // adds the category the user typed in into the allCategories array to then be displayed
  function addCategory() {
    if (category.trim()) {
      setAllCategories([
        ...allCategories,
        { id: Date.now().toString(), name: category },
      ]);
      setCategory("");
    }
  }

  // function to delete a category from the allCategories array if user presses delete on the specific category element
  function deleteCategory(id) {
    setAllCategories(allCategories.filter((category) => category.id !== id));
  }

  //function used to clear all the fields back to initial state after uploading the journal to the cloud storage
  function clearFields() {
    setJournalName("");
    setLocation("");
    setSuggestedLocation([]);
    setStartDate(null);
    setEndDate(null);
    setImage(null);
    setCategory("");
    setAllCategories([]);
  }

  async function createJournal() {
    try {
      const docRef = await addDoc(collection(db, "journals"), {
        journalName: journalName,
        location: location,
        startDate: startDate,
        endDate: endDate,
        // TO DO:
        // COVER IMAGE,
        coverImage: image,
        allCategories: allCategories,
      });
      console.log("Document written with ID: ", docRef.Id);
      clearFields();
      Alert.alert(`Your "${journalName}" journal has been created!`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // function that allows for autocomplete search of users locations to ensure that their location is valid: https://www.geoapify.com/address-autocomplete/
  async function searchLocation(city) {
    try {
      // fetching the information
      const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${city}&type=city&limit=5&format=json&apiKey=0575ebf5a0774802b8811d98b59a84d2`);

      const data = await response.json();
      // settings the data as the suggested locations the api returns back to then show users later
      setSuggestedLocation(data.results || []);
    } catch (e) {
      console.log("An error occured searching for locations: ", e);
      setSuggestedLocation([]);
    }
  }

  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* same tutorial as hiding bottom nav: https://www.youtube.com/watch?v=oqPrCiZyUEs */}
      {/* going back to last page (doesn't work tho...): https://reactnavigation.org/docs/navigating/ */}
      <Pressable
        style={styles.createBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text>Back</Text>
      </Pressable>
      {/* travel journal name input */}
      <View style={styles.createInputContainer}>
        <Text style={styles.createInputHeader}>Travel Journal Name*</Text>
        <TextInput
          style={styles.createInput}
          value={journalName}
          onChangeText={setJournalName}
          placeholder="e.g., Rome 2025"
        />
      </View>

      {/* select location input */}
      <View style={styles.createInputContainer}>
        <Text style={styles.createInputHeader}>Select Your Location*</Text>

        <TextInput
          style={styles.createInput}
          value={location}
          onChangeText={(text) => {
            setLocation(text);
            searchLocation(text);
          }}
          placeholder="Rome, Italy"
        />

        {/* displaying the suggested locations from the api call */}
        {suggestedLocation.map((location, index) => (
          // creating pressable elements for user to select their location from the suggested ones, once selected it clears the suggested array and sets the location as the selected location
          <Pressable
            key={index}
            onPress={() => {
              // .formatted is part of the api response and returns the formatted version of the location selected rather than the full object
              setLocation(location.formatted);
              setSuggestedLocation([]);
            }}
          >
            <Text>{location.formatted}</Text>
          </Pressable>
        ))}
      </View>
      {/* date input */}
      {/* rough looking, will fix later just seeing functionality */}
      {/* react native calendar so we can have data range pick for users: https://withfra.me/react-native-tutorials/how-to-use-date-picker-in-react-native, https://github.com/farhoudshapouran/react-native-ui-datepicker? */}
      <View style={styles.createInputContainer}>
        <Text style={styles.createInputHeader}>Dates*</Text>
        <DatePicker
          mode="range"
          startDate={startDate}
          endDate={endDate}
          onChange={({ startDate, endDate }) => {
            setStartDate(startDate);
            setEndDate(endDate);
          }}
          styles={{
            today: styles.datePickerToday,
            selected: styles.datePickerSelected,
            selected_label: styles.datePickerSelectedLabel,
            range_fill: styles.datePickerRangeFill,
            range_fill_weekstart: styles.datePickerRangeFillStart,
            range_fill_weekend: styles.datePickerRangeFillEnd,
          }}
        />
        {/* will make nicer */}
        <Text>Start: {String(startDate)}</Text>
        <Text>End: {String(endDate)}</Text>
      </View>
      {/* uploading or taking pictures: https://docs.expo.dev/versions/latest/sdk/imagepicker/ */}
      <View style={styles.createInputContainer}>
        <Text style={styles.createInputHeader}>Upload Your Cover</Text>
        <View style={styles.createUploadImageContainer}>
          <View style={styles.createUploadButtons}>
            <Pressable onPress={pickImage} style={styles.testingButton}>
              <Text>Select Photo</Text>
            </Pressable>
            <Pressable onPress={takePhoto} style={styles.testingButton}>
              <Text>Take Photo</Text>
            </Pressable>
          </View>

          {/* checks if there's an image, if not it will show text, otherwise it will display the image */}
          <View style={styles.createUploadPreviewImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.previewImage} />
            ) : (
              <Text>Upload an Image!</Text>
            )}
          </View>
        </View>
      </View>
      {/* creating categories */}
      <View style={styles.createInputContainer}>
        <Text style={styles.createInputHeader}>Add Categories</Text>

        {/* section for the input and add button */}
        <View style={styles.createCategoriesInput}>
          <TextInput
            style={styles.createInput}
            value={category}
            onChangeText={setCategory}
            placeholder="Category Name"
          />
          <Pressable style={styles.testingButton} onPress={addCategory}>
            <Text>Add</Text>
          </Pressable>
        </View>

        {/* section for the categories */}
        {/* use map to make each of the category in allCategories display its own element with edit and delete options */}
        {/* can't use flatlist cause there was a problem with also using a scrollview, maybe ask helmine for advice? or can just stick with simple map method cause it works */}

        {/* <FlatList>
          data = {allCategories}
          keyExtractor = {(item) => item.id}
          renderItem = {({item}) => (
            <View style = {styles.    createCategoriesDisplay}>
              <Text>{category}</Text>
              <Pressable>
                <Text>Edit</Text>
              </Pressable>
              <Pressable>
                <Text>Delete</Text>
              </Pressable>
            </View>
          )}
        </FlatList> */}

        {allCategories.map((category) => (
          <View style={styles.createCategoriesDisplay} key={category.id}>
            <Text>{category.name}</Text>
            {/* IMPLEMENT EDIT */}
            {/* <Pressable>
              <Text>Edit</Text>
            </Pressable> */}
            <Pressable onPress={() => deleteCategory(category.id)}>
              <Text>Delete</Text>
            </Pressable>
          </View>
        ))}
      </View>

      <Pressable
        style={styles.createJournalButton}
        onPress={() => {
          // checking to ensure all required fields have a value before creating the journal
          if (
            journalName !== "" &&
            location !== "" &&
            startDate !== null &&
            endDate !== null
          ) {
            createJournal();
          } else {
            alert("One or more required fields is empty");
          }
        }}
      >
        <Text>Create Journal</Text>
      </Pressable>
    </ScrollView>
  );
}
