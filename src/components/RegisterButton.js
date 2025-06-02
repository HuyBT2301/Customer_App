import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function RegisterButton({ navigation }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('SignUp')}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>Đăng ký</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: '#8AC0C3',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 18,
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  text: {
    color: '#8AC0C3',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
