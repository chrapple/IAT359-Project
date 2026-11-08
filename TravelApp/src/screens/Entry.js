import { Text, View, FlatList, Button } from "react-native";
import styles from "../styles";

export default function Entry({ navigation, route }) {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <Button title="Back" onPress={() => navigation.goBack()}> </Button>

            <Text>{item.journalName}</Text>

            {/* converting from a firebase timestamp into a js date object: https://firebase.google.com/docs/reference/js/v8/firebase.firestore.Timestamp */}
            {/* converting from a js date object into a readable string to display in text: https://www.freecodecamp.org/news/how-to-format-a-date-with-javascript-date-formatting-in-js/ */}
            <Text>{item.startDate?.toDate().toLocaleDateString()}</Text>
            <Text>{item.endDate?.toDate().toLocaleDateString()}</Text>
        </View>
    )
}