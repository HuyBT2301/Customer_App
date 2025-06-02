import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export default function OtpScreen({ navigation }) {
  const [otp, setOtp] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Nhập mã OTP</Text>
        <Text style={styles.desc}>Mã OTP được gửi tới số điện thoại 0983xxxxxx</Text>
        <View style={styles.otpRow}>
          {[...Array(6)].map((_, i) => (
            <TextInput
              key={i}
              style={styles.otpInput}
              maxLength={1}
              keyboardType="number-pad"
              value={otp[i] || ''}
              onChangeText={text => {
                let newOtp = otp.split('');
                newOtp[i] = text;
                setOtp(newOtp.join(''));
              }}
            />
          ))}
        </View>
        <Text style={styles.timer}>Gửi lại mã 00:30</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PasswordScreen')}
        >
          <Text style={styles.buttonText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center' },
  card: {
    margin: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: 'center',
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  desc: { color: '#888', marginBottom: 16 },
  otpRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
  otpInput: {
    width: 40, height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    textAlign: 'center', fontSize: 18, marginHorizontal: 4,
  },
  timer: { color: '#888', marginBottom: 16 },
  button: {
    backgroundColor: '#8AC0C3',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
