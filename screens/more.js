import React from "react";
import {
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Alert,
    ImageBackground,
  } from 'react-native';

export default function More() {
    return (
        <ImageBackground source={require('../assets/purple.png')} resizeMode="cover" style={styles.image}>
            <Text style={styles.container}>This Screen will display more options</Text>
        </ImageBackground>
            
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: 300,
      textAlign: 'center',
      marginHorizontal: 16,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        borderWidth: 5,
      },
});