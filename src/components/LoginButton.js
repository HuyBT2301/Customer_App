import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function LoginButton({ navigation }) {
  return (
    <TouchableOpacity 
    style={styles.button} 
    onPress={() => navigation.navigate('Login') }
    activeOpacity={0.8}>
      <Text style={styles.text}>Đăng nhập</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#8AC0C3',
    paddingVertical: 12,
    borderRadius: 18,
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
    marginBottom: 16,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
