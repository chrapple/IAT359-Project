import { Text, View, TextInput, Pressable, TouchableOpacity, FlatList, Alert } from "react-native";
import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import StarRating from "react-native-star-rating-widget";
import DatePicker from "react-native-ui-datepicker";
import styles from "../styles";

export default function AddLocationScreen({ navigation, route }) {
    // route params
    const { journalID, categories } = route.params;

    // variables to hold user input
    const [location, setLocation] = useState("");
    const [locationName, setLocationName] = useState("");
    const [suggestedLocation, setSuggestedLocation] = useState([]);
    // would've set to null but that caused an error, resolved by following the last comment saying to set to undefined: https://github.com/farhoudshapouran/react-native-ui-datepicker/issues/60?
    const [date, setDate] = useState(undefined);
    const [rating, setRating] = useState(0);
    const [notes, setNotes] = useState("");
    // TO DO:
    // const [photos, setPhotos] = useState(null);

    // variables to control the categories dropdown: https://builtin.com/articles/react-native-dropdown
    const [isDropdownVisible, setDropDownVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    // callback function to change the visibility of the dropdown
    const toggleDropdown = () => setDropDownVisible(!isDropdownVisible);

    // function that handles the user selecting the category of the location, sets the category and "closes" the dropdown
    function handleSelect(item) {
        setSelectedCategory(item);
        setDropDownVisible(false);
    }

    // function that allows for autocomplete search of users locations to ensure that their location is valid: https://www.geoapify.com/address-autocomplete/
    async function searchLocation(address) {
        try {
            // fetching the information
            const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&limit=5&format=json&apiKey=0575ebf5a0774802b8811d98b59a84d2`);
            
            const data = await response.json();
            // settings the data as the suggested locations the api returns back to then show users later
            setSuggestedLocation(data.results || []);
        } catch (e) {
        console.log("An error occured searching for locations: ", e);
            setSuggestedLocation([]);
        }
    }

    function clearFields() {
        setLocation("");
        setLocationName("");
        setSelectedCategory(null);
        setDate(undefined);
        setRating(0)
        setNotes("")
    }

    // TODO: Add to Firebase
    // creating a subcollection within the journals collection (only creates if it's the first location added)
    // adds new locations into the subcollection with category id to reference back to when displaying locations of a specific category (since we are using a filtering system it's important to keep the category id to match)
    async function addLocation() {
        try {
            const docRef = await addDoc(collection(db, "journals", journalID, "locations"), {
                location: location,
                locationName: locationName,
                categoryID: selectedCategory.id,
                categoryName: selectedCategory.name,
                dateVisited: date,
                rating: rating,
                notes: notes
                // TODO: photos
            });
            clearFields();
            Alert.alert(`${location} has been added!`);
        } catch (e) {
            console.error("Error adding location: ", e);
        }
    }

    return (
        <View>
            <Pressable
                style={styles.journalBackButton}
                onPress={() => navigation.goBack()}
            >
                <Text>Back</Text>
            </Pressable>
            {/* TODO: Styling for Location input*/}
            <View>
                <Text>Location</Text>
                <TextInput
                    // style={styles.createInput}
                    value = {location}
                    onChangeText = {(text) => {
                        setLocation(text);
                        searchLocation(text);
                    }}
                    placeholder="e.x. 123 Main Street"
                />
                {/* displaying the suggested locations from the api call */}
                {suggestedLocation.map((location, index) => (
                // creating pressable elements for user to select their location from the suggested ones, once selected it clears the suggested array and sets the location as the selected location
                <Pressable
                    key = {index}
                    onPress = {() => {
                    // .formatted is part of the api response and returns the formatted version of the location selected rather than the full object
                    setLocation(location.address_line2);
                    setLocationName(location.name);
                    setSuggestedLocation([]);
                    }}
                >
                    {/* <Text>{location.name}</Text> */}
                    <Text>{location.formatted}</Text>
                </Pressable>
                ))}
            </View>
            
            {/* TODO: Styling for Category Selection */}
            {/* followed this to create the dropdown selection: https://builtin.com/articles/react-native-dropdown */}
            <View>
                <TouchableOpacity onPress = {toggleDropdown}>
                    <Text>
                        {selectedCategory ? selectedCategory.name : "Select a Category"}
                    </Text>
                </TouchableOpacity>
                {isDropdownVisible && (
                    <View>
                        <FlatList
                            data = {categories}
                            keyExtractor={(item) => item.id}
                            renderItem = {({item}) => (
                                <TouchableOpacity onPress = {() => handleSelect(item)}>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </View>

            {/* TODO: Styling for Date Visited */}
            {/* using react-native-ui-datepicker to allow user to pick their date visited on a calendar: https://github.com/farhoudshapouran/react-native-ui-datepicker? */}
            <View>
                <Text>Date Visited</Text>
                <DatePicker
                    mode="single"
                    date={date}
                    onChange={({date}) => setDate(date)}
                    styles={{
                        today: styles.datePickerToday,
                        selected: styles.datePickerSelected,
                        selected_label: styles.datePickerSelectedLabel
                    }}
                />
            </View>
            
            {/* TODO: Styling for Rating Input*/}
            {/* Using react-native-star-rating-widget to allow for user input in rating: https://www.npmjs.com/package/react-native-star-rating-widget */}
            <View>
                <StarRating
                    rating={rating}
                    onChange={setRating}
                    step={"full"}
                    animationConfig={{scale: 1}}
                />
            </View>
            
            {/* TODO: Styling for Notes */}
            <View>
                <Text>Notes</Text>
                <TextInput
                    value = {notes}
                    onChangeText = {setNotes}
                    placeholder = "e.g., The food was delicious!"
                />
            </View>

            {/* TODO: Styling for Photos */}
            <View>
                <Text>Photo Gallery</Text>
            </View>

            <Pressable onPress={() => addLocation()}>
                <Text>Add Location</Text>
            </Pressable>
        </View>
    )
}