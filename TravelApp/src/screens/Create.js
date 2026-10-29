import { Text, TextInput, View, ScrollView } from "react-native";
import { useState } from "react";
import DatePicker, { useDefaultStyles } from "react-native-ui-datepicker";
import styles from "../styles";

export default function Create() {

  //variables
  const [journalName, setJournalName] = useState("");
  const [location, setLocation] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <ScrollView>
      {/* travel journal name input */}
      <View style = {styles.createInputContainer}>
        <Text style = {styles.createInputHeader}>Travel Journal Name</Text>
          <TextInput 
            style = {styles.createInput}
            value = {journalName}
            onChangeText = {setJournalName}
            placeholder = "e.g., Rome 2025"
          />
      </View>

      {/* select location input */}
      {/* probably use an api so its like an autocomplete when users are typing, makes sure its a real place + extra api! */}
      <View style = {styles.createInputContainer}>
        <Text style = {styles.createInputHeader}>Select Your Location</Text>
          <TextInput 
            style = {styles.createInput}
            value = {location}
            onChangeText = {setLocation}
            placeholder = "Rome, Italy"
          />
      </View>

      {/* date input */}
      {/* react native calendar so we can have data range pick for users: https://withfra.me/react-native-tutorials/how-to-use-date-picker-in-react-native, https://github.com/farhoudshapouran/react-native-ui-datepicker? */}
      <View style = {styles.createInputContainer}>
        <Text style = {styles.createInputHeader}>Dates</Text>
        <DatePicker 
          mode = "range"
          startDate = {startDate}
          endDate = {endDate}
          onChange = {({startDate, endDate}) => {
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
        <Text>Start: {String(startDate)}</Text>
        <Text>End: {String(endDate)}</Text>
      </View>

    </ScrollView>
  );
}
