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
  const [location, setLocation] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  const [addedNewJournal, setaddedNewJournal] = useState("False");

  // function for the user to pick an image from their camera roll
  async function pickImage() {
    // getting the image the user picked
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    // setting the image picked as the one that will be used
    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
      quality: 1,
    });

    // sets the image taken as the image they will use
    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
    setLocation(null);
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
        allCategories: allCategories,
      });
      console.log("Document written with ID: ", docRef.Id);
      clearFields();
      Alert.alert(`Your "${journalName}" journal has been created!`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* same tutorial as hiding bottom nav: https://www.youtube.com/watch?v=oqPrCiZyUEs */}
      {/* going back to last page (doesn't work tho...): https://reactnavigation.org/docs/navigating/ */}
      <Button title="Back" onPress={() => navigation.goBack()}>
        {" "}
      </Button>

      {/* travel journal name input */}
      <View style={styles.createInputContainer}>
        <Text style={styles.createInputHeader}>Travel Journal Name</Text>
        <TextInput
          style={styles.createInput}
          value={journalName}
          onChangeText={setJournalName}
          placeholder="e.g., Rome 2025"
        />
      </View>

      {/* select location input */}
      {/* probably use an api so its like an autocomplete when users are typing, makes sure its a real place + extra api! */}
      <View style={styles.createInputContainer}>
        <Text style={styles.createInputHeader}>Select Your Location</Text>
        <TextInput
          style={styles.createInput}
          value={location}
          onChangeText={setLocation}
          placeholder="Rome, Italy"
        />
      </View>

      {/* date input */}
      {/* rough looking, will fix later just seeing functionality */}
      {/* react native calendar so we can have data range pick for users: https://withfra.me/react-native-tutorials/how-to-use-date-picker-in-react-native, https://github.com/farhoudshapouran/react-native-ui-datepicker? */}
      <View style={styles.createInputContainer}>
        <Text style={styles.createInputHeader}>Dates</Text>
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
      <Pressable style={styles.createJournalButton} onPress={createJournal}>
        <Text>Create Journal</Text>
      </Pressable>
    </ScrollView>
  );
}
