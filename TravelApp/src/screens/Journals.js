import { Text, View, FlatList, Pressable } from "react-native";
import styles from "../styles";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { db } from "../firebaseConfig";


export default function Journal() {
  //array to hold all of the journals we get from firebase
  const [allJournals, setAllJournals] = useState([]);
  const navigation = useNavigation();

  async function getJournals() {
    try {
      const querySnapshot = await getDocs(collection(db, "journals"));

      let journals = [];

      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        journals.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setAllJournals(journals);
    } catch (e) {
      console.error("Error retrieveing journals: ", e);
    }
  }

  //using useEffect to call the getJournals to display the journals when the page first loads (hence -> [])
  useEffect(() => {
    getJournals();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text>Existing Journals</Text> */}
      <FlatList
        data={allJournals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>

            {/* Encased list items onto pressable buttons */}
            <Pressable
              style={styles.createJournalButton}
              onPress={() => { navigation.navigate("Entry", { item: item }) }}>
              <Text>{item.journalName}</Text>
              {/* converting from a firebase timestamp into a js date object: https://firebase.google.com/docs/reference/js/v8/firebase.firestore.Timestamp */}
              {/* converting from a js date object into a readable string to display in text: https://www.freecodecamp.org/news/how-to-format-a-date-with-javascript-date-formatting-in-js/ */}
              <Text>{item.startDate?.toDate().toLocaleDateString()}</Text>
              <Text>{item.endDate?.toDate().toLocaleDateString()}</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
