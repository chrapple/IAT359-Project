import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    marginTop: 200,
  },
  // authentication screens styles
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
  signOutButton: {
    marginTop: 50,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 50,
    backgroundColor: "#ff0800",
  },
  // home screen unique styles
  homeScreenTitle: {
    marginTop: 70,
    fontSize: 30,
    fontWeight: "bold",
  },
  recentlyViewedList: {
    backgroundColor: "#d3e7c0",
    paddingVertical: 50,
    paddingHorizontal: 100,
    alignItems: "center",
    borderRadius: 20,
    marginTop: 30,
    boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.04)",
  },
  // create journal styles
  createInputContainer: {
    width: "80%",
    backgroundColor: "#D9D9D9",
    padding: 20,
    borderRadius: 25,
    gap: 10,
    marginBottom: 25,
  },
  createBackButton: {
    backgroundColor: "#D9D9D9",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginLeft: 40,
    marginBottom: 50,
  },
  createInputHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  createInput: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
    paddingLeft: 12,
    paddingVertical: 15,
  },
  datePickerToday: {
    backgroundColor: "transparent",
  },
  datePickerSelected: {
    backgroundColor: "#77a171",
    borderRadius: 10,
  },
  datePickerSelectedLabel: {
    color: "white",
  },
  datePickerRangeFill: {
    backgroundColor: "#9dc29856",
  },
  datePickerRangeFillStart: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "#9dc29856",
  },
  datePickerRangeFillEnd: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#9dc29856",
  },
  createUploadImageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  testingButton: {
    backgroundColor: "white",
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  createUploadButtons: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 15,
  },
  createUploadPreviewImage: {
    backgroundColor: "#EFEFEF",
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    width: 130,
    borderRadius: 10,
  },
  previewImage: {
    height: "100%",
    width: "100%",
  },
  createCategoriesInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    // marginBottom: 10
  },
  createCategoriesDisplay: {
    flexDirection: "row",
    backgroundColor: "#EFEFEF",
    padding: 10,
    borderRadius: 10,
    // will fix spacing later
    justifyContent: "space-between",
  },
  createJournalButton: {
    backgroundColor: "#d3e7c0",
    paddingHorizontal: "20%",
    paddingVertical: 20,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 100,
  },
  // journals display page
  journalList: {
    backgroundColor: "#d3e7c0",
    paddingVertical: 50,
    paddingHorizontal: 100,
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 30,
    boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.04)",
  },
  journalListTitles: {
    fontSize: 15,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  // Journal Entry pages
  journalContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 25,
    padding: 10,
  },
  journalBackButton: {
    backgroundColor: "#D9D9D9",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  journalTitle: {
    fontSize: 33,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 25,
    marginTop: 50,
  },
  journalSubtitle: {
    fontSize: 24,
    marginBottom: 0,
  },
  journalCategories: {
    marginBottom: 25,
    fontStyle: 'italic',
  },
  journalMap: {
    width: "85%",
    height: 300,
    marginVertical: 40,
    borderRadius: 40,
  },
  entryButtons: {
    flexDirection: "row",
    gap: 25
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20
  },
  categoryFolder: {
    width: 180,
    backgroundColor: "#D9D9D9",
    padding: 50,
    borderRadius: 10,
    alignItems: "center",
  },
  flagImage: {
    width: 50,
    height: 30,
  }
});

export default styles;
