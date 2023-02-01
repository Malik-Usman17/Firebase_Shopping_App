import React, { useState } from 'react'
import { Image, Text, TextInput, ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native'
import { AppImages } from '../Constants/appImages';
import appConstants from '../Constants/appConstants.json'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

function Registeration({ navigation }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')



  const onFooterLinkPress = () => {
    navigation.navigate(appConstants.screen.Login)
  }


  const onRegisterPress = () => {

    if (password !== confirmPassword) {
      alert("Passwords don't match.")
      return
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const uid = response.user.uid
        console.log("UID:", uid)
        const data = {
          id: uid,
          email,
          fullName,
        };

        const usersRef = addDoc(collection(db, "users"))
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate(appConstants.screen.Home, { user: data })
          })
          .catch((error) => {
            alert(error)
          });
      })
      .catch((error) => {
        alert(error)
      });
  }


  //working successfully
  // const onRegisterPress = () => {

  //   // const auth = getAuth();

  //   if (password !== confirmPassword) {
  //     alert("Passwords don't match.")
  //     return
  //   }



  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((response) => {
  //       const uid = response.user
  //       console.log("UID:", uid)
  //     })
  //     .catch((error) => {
  //       alert(error)
  //     });
  // }


  // const onRegisterPress = () => {

  //   const auth = getAuth();

  //   if (password !== confirmPassword) {
  //     alert("Passwords don't match.")
  //     return
  //   }

  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((response) => {
  //       const uid = response.user.uid
  //       const data = {
  //         id: uid,
  //         email,
  //         fullName,
  //       };
  //       const usersRef = addDoc(collection(db, "users")) //firebase.firestore().collection('users')
  //       usersRef
  //         .doc(uid)
  //         .set(data)
  //         .then(() => {
  //           navigation.navigate(appConstants.screen.Home, { user: data })
  //         })
  //         .catch((error) => {
  //           alert(error)
  //         });
  //     })
  //     .catch((error) => {
  //       alert(error)
  //     });
  // }

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <Image
          style={styles.logo}
          source={AppImages.firebase}
        />
        <TextInput
          style={styles.input}
          placeholder='Full Name'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder='E-mail'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder='Confirm Password'
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}>
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
        </View>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {

  },
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d'
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16
  }
});


export default Registeration;