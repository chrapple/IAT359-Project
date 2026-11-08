import { Text, View, FlatList, Button } from "react-native";
import styles from "../styles";

export default function Entry({ navigation, route }) {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <Button title="Back" onPress={() => navigation.goBack()}> </Button>

            <Text>{item.journalName}</Text>
            <Text>{item.startDate?.toDate().toLocaleDateString()}</Text>
            <Text>{item.endDate?.toDate().toLocaleDateString()}</Text>
        </View>
    )
}