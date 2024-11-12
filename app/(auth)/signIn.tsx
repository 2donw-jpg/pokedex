// Login.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { BlurView } from "expo-blur";
import { signIn } from '@/services/authService';
import { fetchTrainerData } from '@/services/sessionProfile';

import background from '@/assets/images/backGround.jpg';
import trainnerRamdon from '@/assets/images/trainnerPic.jpg';
import logoLogin from '@/assets/images/logo.png';


const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signIn(username.concat("@pokedex.com"), password);
    fetchTrainerData();
    router.push('/list');
  };

  return (
    <View style={styles.container}>
      <Image source={background} style={[styles.image, StyleSheet.absoluteFill]} />

      <View style={styles.logoContainer}>
        <Image source={logoLogin} style={styles.logo} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BlurView intensity={100}>
          <View style={styles.login}>

            <View>
              <Text style={styles.label}>E-mail</Text>
              <TextInput style={styles.input} placeholder="ejemplo@gmail.com" />
            </View>
            <View>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput style={styles.input} placeholder="contraseña" secureTextEntry={true} />
            </View>

            <TouchableOpacity style={[styles.button, { backgroundColor: '#00CFE9' }]}>
              <Text style={styles.buttonText} onPress={handleLogin}>Iniciar Sesión</Text>
            </TouchableOpacity>

{/*             <TouchableOpacity style={[styles.button, { backgroundColor: '#4CAF50' }]} onPress={handleAnonymousLogin}>
              <Text style={styles.buttonText}>Iniciar Sesión Anónima</Text>
            </TouchableOpacity> */}


          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logoContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 250,
    resizeMode: 'contain',
  },
  scrollContainer: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  login: {
    width: 350,
    height: 500,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  trainner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20,
  },
  label: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
  },
  userInfoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  userInfoText: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
    marginVertical: 5,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
});


export default SignIn;
