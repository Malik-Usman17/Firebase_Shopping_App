import React, { useState } from 'react'
import { Image, Text, TextInput, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import appConstants from '../Constants/appConstants.json'
import { AppImages } from '../Constants/appImages';
import { auth, firebase } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { CommonActions } from '@react-navigation/native';
import Loader from '../components/Loader';


function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loader, setLoader] = useState(false);

  const onFooterLinkPress = () => {
    navigation.navigate(appConstants.screen.Registeration)
  }


  const onLoginPress = () => {
    setLoader(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((x) => {
        const user = x.user
        navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: appConstants.screen.Home }] }))
        setLoader(false)
      })
      .catch((e) => {
        alert(e)
        setLoader(false)
      })
  }

  // const onLoginPress = () => {
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then((response) => {
  //       const uid = response.user.uid
  //       const usersRef = firebase.firestore().collection('users')
  //       usersRef
  //         .doc(uid)
  //         .get()
  //         .then(firestoreDocument => {
  //           if (!firestoreDocument.exists) {
  //             alert("User does not exist anymore.")
  //             return;
  //           }
  //           const user = firestoreDocument.data()
  //           navigation.navigate(appConstants.screen.Home, { user })
  //         })
  //         .catch(error => {
  //           alert(error)
  //         });
  //     })
  //     .catch(error => {
  //       alert(error)
  //     })
  // }

  return (
    <View style={styles.container}>

      <Loader
        visible={loader}
        text="Loading"
      />

      <ScrollView
        style={{ flex: 1, width: '100%' }}
        contentContainerStyle={{ justifyContent: "center" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={AppImages.firebase}
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.footerView}>
          <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
        </View>

      </ScrollView>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "pink",
    // alignItems: 'center',
    // justifyContent: "center"
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
})


export default Login;