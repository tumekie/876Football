import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  ImageBackground,
} from 'react-native';

export default function Home({navigation}) {
  return (
    
    <SafeAreaView style={styles.container}>
        <View style={styles.cont}>
            <ImageBackground source={require('../assets/foot.jpeg')} resizeMode="cover" style={styles.image}>
                <Text style={styles.title}>
                    Welcome to FutMob press continue to explore!
                </Text>
                <Button
                title="Continue"
                onPress={() => navigation.navigate('HomeScreen')}
                />
            </ImageBackground>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    paddingTop: 400,
    textAlign: 'center',
    marginVertical: 8,
    color: 'white',
    fontSize: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 10,
  },
  cont:{
    flex:1
  },
});