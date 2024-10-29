import React from 'react';
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const StartScreen = ({navigation}) => {
    
    const handlePress = () => {
        navigation.navigate('Home');
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
                    <Image
                        style={styles.logo}
                        source={require('../images/1eeb8fcfdbbbae6b392779718f5d7701.png')}
                        resizeMode="contain"
                    />
                    <Image
                        style={styles.logo2}
                        source={require('../images/657264ab4560ab04a1746afe28c6192e.png')}
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

export default StartScreen;
