import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import Logo from '../../assets/logo.svg';
import SongTren from '../../assets/song_tren.jpg';
import SongDuoi from '../../assets/song_duoi.jpg';
import LoginButton from '../../components/LoginButton';
import RegisterButton from '../../components/RegisterButton';
const { width } = Dimensions.get('window');

export default function SiginInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Sóng trên */}
      <View style={styles.topWave}>
        <Image source={SongTren} style={styles.waveImageTop} resizeMode="stretch" />
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        {/* Thay bằng hình ảnh logo nếu có */}
        <Logo width={300} height={300} />
      </View>

      {/* Sóng dưới */}
      <View style={styles.bottomWave}>
        <Image source={SongDuoi} style={styles.waveImageBottom} resizeMode="stretch" />
      </View>


      <View style={styles.buttonContainer}>
        <LoginButton navigation={navigation} />
        <RegisterButton navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'flex-end' },
  topWave: { position: 'absolute', top: 0, left: 0, right: 0 },
  bottomWave: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  logoText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#8AC0C3',
  },
  buttonContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  waveImageTop: {
    width: '100%',
    height: 300,
  },
  waveImageBottom: {
    width: '100%',
    height: 370,
  },
});