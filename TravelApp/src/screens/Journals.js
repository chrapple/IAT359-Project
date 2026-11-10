import { Text, View, FlatList, Pressable } from "react-native";
import styles from "../styles";
import { useEffect, useState } from "react";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { db } from "../firebaseConfig";

export default function Journal() {
  //array to hold all of the journals we get from firebase
  const [allJournals, setAllJournals] = useState([]);
  const navigation = useNavigation();

  async function getJournals() {
    try {
      // this only listens "once" so it gets the journals from the database when called
      // const querySnapshot = await getDocs(collection(db, "journals"));
      
      // instead we're going to use onSnapshot which allows for our real time updates to be reflected: https://firebase.google.com/docs/firestore/query-data/listen#web
      const unsub = onSnapshot(collection(db, "journals"), (querySnapshot) => {
        let journals = [];

        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          journals.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setAllJournals(journals);
      });

      // return unsub to stop listening for changes when not on the page (saving phone resources)
      return unsub;

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
              style={styles.journalList}
              onPress={() => {
                navigation.navigate("Entry", { item: item });
              }}
            >
              <Text>{item.journalName}</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
