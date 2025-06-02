import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { API_BASE_URL } from '../../config';

const PasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { phoneNumber } = route.params;
  const auth = getAuth();

  const handleRegister = async () => {
    try {
      if (!password || !confirmPassword) {
        Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ mật khẩu');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Lỗi', 'Mật khẩu không khớp');
        return;
      }

      if (password.length < 6) {
        Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự');
        return;
      }

      setLoading(true);

      // Tạo email tạm thời từ số điện thoại
      const email = `${phoneNumber.replace('+', '')}@temporary.com`;

      // Tạo tài khoản với Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Cập nhật thông tin người dùng
      await updateProfile(userCredential.user, {
        displayName: phoneNumber
      });

      // Gọi API backend để tạo tài khoản
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await userCredential.user.getIdToken()}`
        },
        body: JSON.stringify({
          phoneNumber,
          firebaseUid: userCredential.user.uid
        }),
      });

      if (!response.ok) {
        throw new Error('Không thể tạo tài khoản');
      }

      Alert.alert('Thành công', 'Đăng ký thành công!', [
        {
          text: 'OK',
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          }),
        },
      ]);
    } catch (error) {
      console.error('Error registering:', error);
      Alert.alert('Lỗi', 'Không thể tạo tài khoản. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tạo mật khẩu</Text>
      <Text style={styles.subtitle}>
        Vui lòng tạo mật khẩu để bảo vệ tài khoản của bạn
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Đang xử lý...' : 'Hoàn tất'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
    marginBottom: 15,
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
});

export default PasswordScreen;
