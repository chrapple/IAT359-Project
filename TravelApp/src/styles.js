import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginTop: 200,
  },
  input: {
    height: 40,
    width: "70%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: "white",
  },
  signinContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: 10,
    marginVertical: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  signinButtonsContainer: {
    display: "flex",
    padding: 10,
    gap: 20,
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "#fff",
  },
  signinButton: {
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 50,
    backgroundColor: "#d3e7c0",
  },
  createInputContainer: {
    width: "80%",
    backgroundColor: "#D9D9D9",
    padding: 20,
    borderRadius: 25,
    gap: 10,
    marginBottom: 25,
  },
  createInputHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  createInput: {
    color: "#949494",
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
    paddingLeft: 12,
  },
  datePickerToday: {
    backgroundColor: "transparent"
  },
  datePickerSelected: {
    backgroundColor: "#77a171",
    borderRadius: 10,
  },
  datePickerSelectedLabel: {
    color: "white"
  },
  datePickerRangeFill: {
    backgroundColor: "#9dc29856"
  },
  datePickerRangeFillStart: {
    borderTopLeftRadius: 10, 
    borderBottomLeftRadius: 10,
    backgroundColor: "#9dc29856"
  },
  datePickerRangeFillEnd: {
    borderTopRightRadius: 10, 
    borderBottomRightRadius: 10,
    backgroundColor: "#9dc29856"
  },
  createUploadImageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

  },
  testingButton: {
    backgroundColor: "white",
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    alignItems: "center"
  },
  createUploadButtons: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 15
  },
  createUploadPreviewImage: {
    backgroundColor: "#EFEFEF",
    justifyContent: "center",
    padding: 10,
    height: 150,
    borderRadius: 10
  },
});

export default styles;
