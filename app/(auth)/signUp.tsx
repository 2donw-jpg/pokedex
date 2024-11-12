// SignUp.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router, Link } from 'expo-router';
import { signUp } from '@/services/authService';
import { fetchTrainerData } from '@/services/sessionProfile';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    signUp(username.concat("@pokedex.com"), password, username);
    fetchTrainerData();
    router.push('/list');
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/pokeball.png')} style={styles.image} />
      <Text style={styles.title}>Registrate</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Crea una Cuenta</Text>
      </TouchableOpacity>

      <Link href="/signIn" style={styles.linkText}>
        Ya tienes una cuenta? Inicia Sesión
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#34495e',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: '#2c3e50',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default SignUp;
