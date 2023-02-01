import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import appConstants from './src/Constants/appConstants.json';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Registeration from './src/screens/Registeration';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from './src/firebase/config';





const Stack = createNativeStackNavigator()

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [isLogedIn, setIsLogedIn] = useState(false); 

  useEffect(() => {

    auth.onAuthStateChanged(x => {
      if(x){
        setIsLogedIn(true)
      }
      else{
        setIsLogedIn(false)
      }
    })
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          isLogedIn ?
          <Stack.Screen name={appConstants.screen.Home} component={Home}/>
          :
          <>
          <Stack.Screen name={appConstants.screen.Login} component={Login} options={{headerShown: false}}/>
        
        <Stack.Screen name={appConstants.screen.Registeration} component={Registeration} options={{headerShown: false}}/>
        </>
        }
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
