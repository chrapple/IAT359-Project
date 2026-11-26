import { Text, View, TextInput, Pressable, TouchableOpacity, FlatList } from "react-native";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function AddLocationScreen({ navigation, route }) {
    // route params
    const { journalID, categories } = route.params;

    // variables to hold user input
    const [location, setLocation] = useState("");
    const [suggestedLocation, setSuggestedLocation] = useState([]);
    const [rating, setRating] = useState(0);
    const [notes, setNotes] = useState("");
    // TO DO:
    // const [photos, setPhotos] = useState(null);

    const [isDropdownVisible, setDropDownVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    // callback function to change the visibility of the dropdown
    const toggleDropdown = () => setDropDownVisible(!isDropdownVisible);

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

    // TODO: Add to Firebase

    return (
        <View>
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
                    setLocation(location.formatted);
                    setSuggestedLocation([]);
                    }}
                >
                    <Text>{location.formatted}</Text>
                </Pressable>
                ))}
            </View>
            
            {/* TODO: Styling for Category Selection */}
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
            <View>

            </View>

            {/* TODO: Styling for Rating Input*/}
            <View>
                
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

            <Pressable>
                <Text>Add Location</Text>
            </Pressable>
        </View>
    )
}