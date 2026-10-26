import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
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
  signincontainer: {
    display: "flex",
  },
  signinButton: {
    backgroundColor: "grey",
  },
});

export default styles;
