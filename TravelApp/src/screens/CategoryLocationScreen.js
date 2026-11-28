import { Text, View, TextInput, Pressable, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import styles from "../styles";
import { Feather } from "@react-native-vector-icons/feather";

export default function AddLocationScreen({ navigation, route }) {
    // route params
    const { journalID, category } = route.params;

    const [locations, setLocations] = useState([]);

    // function to query the firebase database for locations that have the same category id as the given category 
    async function getLocations() {
        try {
            // searching the firebase database (journals collection -> locations subcollection) for locations whose category id is the same as the selected category
            const q = query (collection(db, "journals", journalID, "locations"), where("categoryID", "==", category.id));
            const querySnapshot = await getDocs(q);

            let categoryLocations = [];

            // checking if there are no locations in the category, otherwise it will put the locations into the categoryLocations array
            if (querySnapshot.empty) {
                console.log("No locations")
            } else {
                querySnapshot.forEach((doc) => {
                    categoryLocations.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                setLocations(categoryLocations); 
            }
        } catch (e) {
            console.log("Error fetching locations: ", e);
        }
    }

    // calling function once when the page loads
    useEffect(() => {
        getLocations();
    }, [])

    return (
        <View>
            <Pressable
                style={styles.journalBackButton}
                onPress={() => navigation.goBack()}
            >
                {/* using feather icons: https://www.npmjs.com/package/@react-native-vector-icons/common#available-icon-sets, https://feathericons.com/*/}
                <Feather name="arrow-left" size={32} color={"#000"}/>
            </Pressable>

            <Text>{category.name}</Text>

            {/* checks if there are locations, if not then text will appear, if there are then it will display all of the associated locations */}
            {locations.length === 0 ? (
                <Text>No locations have been added.</Text>
            ) : (
                <FlatList
                    data={locations}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View>
                            <Pressable
                            // style={styles.STYLE}
                            // onPress={() => {
                            //     navigation.navigate("LOCATION", { item: item });
                            // }}
                            >
                            <Text>{item.locationName}</Text>
                            <Text>{item.location}</Text>
                            </Pressable>
                        </View>
                    )}
                />
            )}
        </View>
    )
}