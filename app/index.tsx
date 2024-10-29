import React from 'react';
import { Link, router, useRouter } from "expo-router";
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View,  Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function StartScreen() {
    
    const handlePress = () => {
        router.push('/list');
    };

    return (
            <ImageBackground
                source={require('../images/Pikachu-Pokemon-Anime-iphone-8.jpg')}
                style={styles.contenedor}>
                <View style={styles.topView}>
                    <Image
                        style={styles.logo}
                        source={require('../images/logo.png')}
                        resizeMode="contain"
                    />
                </View>
                 <View style={styles.overlay}>
                    <TouchableOpacity onPress={handlePress}>
                    <Link href={"/scanner"}>
                    Scan Pokemon
                    </Link>
                    <Image
                        style={styles.logo2}
                        source={require('../images/ingresar.png')}
                        resizeMode="contain"
                    />
                    </TouchableOpacity>
                </View> 
            </ImageBackground>
    );
};


const styles = StyleSheet.create({
    contenedor: {
        flex: 1, 
        resizeMode: 'cover', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        justifyContent: 'center',
        flex: 1, 
        marginBottom:350
    },
    container: {
        flex: 1,
      },
    button: {
        backgroundColor: '#286e4c', 
        paddingVertical: 10, 
        paddingHorizontal: 128, 
        borderRadius: 50, 
        borderWidth: 1, 
        borderColor: '#286e4c', 
      },
      logo: {
        width: 300,
        height: 220,
      },
      logo2: {
        width: 200,
        height: 100,
        marginLeft:50
      },
      topView: {
        flex:1,
      }
});

