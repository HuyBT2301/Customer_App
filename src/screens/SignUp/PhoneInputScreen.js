import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import Logo from '../../assets/logo.svg';
import SongTren from '../../assets/song_tren.jpg';
import { Image } from 'react-native';
import app from '../../config/firebase.config';

const auth = getAuth(app);

const PhoneInputScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Khởi tạo reCAPTCHA verifier
    const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      },
    });
    setRecaptchaVerifier(verifier);

    return () => {
      // Cleanup
      if (verifier) {
        verifier.clear();
      }
    };
  }, []);

  const formatPhoneNumber = (number) => {
    // Bỏ các ký tự không phải số
    const numbersOnly = number.replace(/\D/g, '');
    
    // Nếu số điện thoại bắt đầu bằng 0, thay thế bằng +84
    if (numbersOnly.startsWith('0')) {
      return '+84' + numbersOnly.substring(1);
    }
    // Nếu số điện thoại bắt đầu bằng 84, thêm dấu +
    else if (numbersOnly.startsWith('84')) {
      return '+' + numbersOnly;
    }
    // Nếu không có prefix, thêm +84
    else {
      return '+84' + numbersOnly;
    }
  };

  const handleRegister = async () => {
    try {
      if (!phoneNumber) {
        Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại');
        return;
      }

      if (!recaptchaVerifier) {
        Alert.alert('Lỗi', 'reCAPTCHA chưa sẵn sàng. Vui lòng thử lại sau.');
        return;
      }

      setLoading(true);
      const formattedPhone = formatPhoneNumber(phoneNumber);
      
      // Gửi OTP qua Firebase với reCAPTCHA
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier);
      
      // Lưu confirmation vào state để sử dụng ở màn hình OTP
      navigation.navigate('OtpScreen', {
        phoneNumber: formattedPhone,
        confirmation: confirmation
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Lỗi', 'Không thể gửi mã OTP. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Sóng trên */}
      <View style={styles.topWave}>
        <Image source={SongTren} style={styles.waveImageTop} resizeMode="stretch" />
      </View>
      <View style={styles.card}>
        <Logo width={200} height={200} style={{ alignSelf: 'center' }} />
        <Text style={styles.title}>Nhập số điện thoại</Text>
        <Text style={styles.subtitle}>
          Chúng tôi sẽ gửi mã xác thực đến số điện thoại của bạn
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập số điện thoại"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={10}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Đang gửi...' : 'Tiếp tục'}
          </Text>
        </TouchableOpacity>

        {/* Container cho reCAPTCHA */}
        <View id="recaptcha-container" style={styles.recaptchaContainer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
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
    zIndex: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  waveImageTop: {
    width: '100%',
    height: 500,
  },
  recaptchaContainer: {
    height: 1,
    width: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
  },
});

export default PhoneInputScreen;
