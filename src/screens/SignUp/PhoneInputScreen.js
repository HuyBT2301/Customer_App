import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,Image } from 'react-native';
import Logo from '../../assets/logo.svg';
import SongTren from '../../assets/song_tren.jpg';

export default function PhoneInputScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  return (
    <View style={styles.container}>
      {/* Sóng trên */}
      <View style={styles.topWave}>
        <Image source={SongTren} style={styles.waveImageTop} resizeMode="stretch" />
      </View>
      <View style={styles.card}>
        <Logo width={200} height={200} style={{ alignSelf: 'center' }} />
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('OtpScreen')}
        >
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center' },
  topWave: { position: 'absolute', top: 0, left: 0, right: 0 },
  card: {
    margin: 40,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    zIndex:2,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginTop: 50,
    marginBottom: 32,
    fontSize: 16,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: '#8AC0C3',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  waveImageTop: {
    width: '100%',
    height: 500,
  },
});
