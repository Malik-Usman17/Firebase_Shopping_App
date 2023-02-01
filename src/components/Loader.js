import React from "react";
import { Modal, StyleSheet, Text, View, ActivityIndicator } from "react-native";



const Loader = ({ visible, text }) => {
  return (
    <Modal visible={visible} transparent={true}>

      <View style={styles.container}>

        <View style={styles.contentContainer}>

          <ActivityIndicator
            size={"large"}
            color="#FFFFFF"
          />

          <Text style={styles.text}>{text}</Text>

        </View>

      </View>

    </Modal>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `rgba(0, 0, 0, 0.3)`,
    alignItems: "center",
    justifyContent: "center"
  },
  contentContainer: {
    backgroundColor: `rgba(0, 0, 0, 1)`,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    width: "80%"
  },
  text: {
    color: "#FFFFFF",
    marginTop: 10,
    fontSize: 18,
    fontWeight: "600"
  }
})

export default Loader;