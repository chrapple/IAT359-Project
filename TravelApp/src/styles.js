import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginTop: 50,
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
    backgroundColor: "#fff",
  },
});

export default styles;
