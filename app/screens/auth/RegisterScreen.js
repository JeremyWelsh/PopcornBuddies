import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from "react-native";

//import colours from '../config/colours';

const RegisterScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Popcorn Buddies RegisterScreen</Text>
            <StatusBar style="auto" />
        </View>

    );
  } 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2D0A4',
        alignItems: 'center',
        justifyContent: 'center',
      },
})



export default RegisterScreen;