import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { db } from "../firebase/config";
import Loader from "./Loader";


const ShoppingItem = (props) => {

  const [isChecked, setIsChecked] = useState(props.isChecked)
  const [loader, setLoader] = useState(false)

  const updateIsChecked = async () => {
    const shoppingRef = doc(db, "shopping", props.id)

    await updateDoc(shoppingRef, {
      isChecked: isChecked
    })
  }

  const deleteItem = async () => {
    setLoader(true)
    await deleteDoc(doc(db, "shopping", props.id))
    props.getShoppingList()
  }

  useEffect(() => {
    updateIsChecked()
  }, [isChecked])

  return (
    <View style={styles.container}>

      <Loader
        visible={loader}
        text="Please wait"
      />

      <Pressable onPress={() => setIsChecked(!isChecked)}>
        <AntDesign
          name={isChecked ? "checkcircle" : "checkcircleo"}
          size={24}
          color="black"
        />
      </Pressable>

      <Text style={styles.title}>{props.title}</Text>

      <Pressable onPress={() => deleteItem()}>
        <MaterialIcons
          name="delete"
          size={24}
          color="black"
        />
      </Pressable>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 10,
    // width: "90%",
    alignSelf: "center"
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
    fontWeight: "500"
  }
})


export default ShoppingItem;