import React from 'react';
import {View,StyleSheet,Text} from 'react-native'
import SplashScreen from './src/screens/splash';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SiginInScreen from './src/screens/signin';
import SignUp from './src/screens/SignUp';
import LoginScreen from './src/screens/Login';
const Stack = createNativeStackNavigator()

const App = () =>  {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name = "Splash" 
        component ={SplashScreen} 
        options ={{headerShown: false}}
        />
        <Stack.Screen 
        name = "SiginIn" 
        component ={SiginInScreen} 
        options ={{headerShown: false}}
        />
        <Stack.Screen 
        name = "Login" 
        component ={LoginScreen} 
        options ={{headerShown: false}}
        />
        <Stack.Screen 
        name = "SignUp" 
        component ={SignUp} 
        options ={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
