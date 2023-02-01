import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, SafeAreaView, Pressable, FlatList, ActivityIndicator } from "react-native";
import ShoppingItem from "../components/ShoppingItem";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import Loader from "../components/Loader";

const Home = () => {

  const [title, setTitle] = useState("");
  const [loader, setLoader] = useState(false);
  const [shoppingList, setShoppingList] = useState([]);

  // console.log("SHOPPING LIST:", shoppingList)

  const addShoppingItem = async () => {
    setLoader(true)
    try {
      const docRef = await addDoc(collection(db, "shopping"), {
        shoppingItem: title,
        isChecked: false
      })
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    finally {
      getShoppingList();
      setLoader(false);
      setTitle('')
    }
  }

  const getShoppingList = async () => {
    setLoader(true)
    const querySnapshot = await getDocs(collection(db, "shopping"));
    let newArr = []
    querySnapshot.forEach((doc) => {
      newArr.push({ ...doc.data(), id: doc.id })
    });
    setShoppingList(newArr)
    setLoader(false)
  }

  const deleteAll = async () => {
    const querySnapshot = await getDocs(collection(db, "shopping"));

    querySnapshot.docs.map((val) => deleteDoc(doc(db, "shopping", val.id)))
    getShoppingList();
  }

  useEffect(() => {
    getShoppingList()
  }, [])

  return (
    <SafeAreaView style={styles.container}>

      <Loader
        visible={loader}
        text="Loading"
      />

      <View style={styles.header}>

        <Text style={styles.heading}>Shopping List</Text>

        <Text style={styles.number}>{shoppingList.length}</Text>

        <Pressable onPress={() => deleteAll()}>
          <MaterialIcons
            name="delete"
            size={30}
            color="black"
          />
        </Pressable>

      </View>

      <FlatList
        data={shoppingList}
        style={{ marginBottom: 10 }}
        renderItem={({ item }) => (
          <ShoppingItem
            title={item.shoppingItem}
            isChecked={item.isChecked}
            id={item.id}
            getShoppingList={getShoppingList}
          />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      />

      <TextInput
        placeholder='Enter shopping items'
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={() => {
          addShoppingItem()
        }}
      />

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 12
  },
  header: {
    flexDirection: "row",
    // width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
    // padding: 10,
    alignItems: "center",
    marginBottom: 10
  },
  heading: {
    fontSize: 30,
    fontWeight: "500",
    flex: 1
  },
  number: {
    fontSize: 30,
    fontWeight: "500",
    marginRight: 20
  },
  input: {
    backgroundColor: "lightgray",
    padding: 8,
    alignSelf: "center",
    width: "100%",
    fontSize: 17,
    borderRadius: 10,
    marginTop: "auto"
  }
})

export default Home;