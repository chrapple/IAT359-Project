import { Text, View, FlatList, Pressable } from "react-native";
import styles from "../styles";

export default function Entry({ navigation, route }) {
    const { item } = route.params;

    return (
        <View style={styles.journalContainer}>
            <Pressable style={styles.journalBackButton} onPress={() => navigation.goBack()}><Text>Back</Text></Pressable>

            <Text style={styles.journalTitle}>{item.journalName}</Text>

            {/* converting from a firebase timestamp into a js date object: https://firebase.google.com/docs/reference/js/v8/firebase.firestore.Timestamp */}
            {/* converting from a js date object into a readable string to display in text: https://www.freecodecamp.org/news/how-to-format-a-date-with-javascript-date-formatting-in-js/ */}
            <Text>{item.startDate?.toDate().toLocaleDateString()} to {item.endDate?.toDate().toLocaleDateString()}</Text>
            <Text></Text>
        </View>
    )
}