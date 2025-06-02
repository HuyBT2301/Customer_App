import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhoneInputScreen from './PhoneInputScreen';
import OtpScreen from './OtpScreen';
import PasswordScreen from './PasswordScreen';

const Stack = createNativeStackNavigator();

export default function SignUpStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PhoneInputScreen" component={PhoneInputScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
    </Stack.Navigator>
  );
}