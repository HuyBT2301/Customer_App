import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,Image } from 'react-native';
import Logo from '../../assets/logo.svg';
import SongTren from '../../assets/song_tren.jpg';
export default function PasswordScreen({ navigation }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  return (
    <View style={styles.container}>
      {/* Sóng trên */}
      <View style={styles.topWave}>
        <Image source={SongTren} style={styles.waveImageTop} resizeMode="stretch" />
      </View>
      <View style={styles.card}>
        <Logo width={200} height={200} style={{ alignSelf: 'center' }} />
        <Text style={styles.title}>Tạo mật khẩu</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {/* Xử lý tiếp tục */}}
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
    margin: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, alignSelf: 'center' },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 24,
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
