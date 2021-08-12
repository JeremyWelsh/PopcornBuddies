import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View } from "react-native";

import colours from '../config/colours';

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Popcorn Buddies ProfileScreen</Text>
            <StatusBar style="auto" />
        </View>

    );
  } 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#353',
        alignItems: 'center',
        justifyContent: 'center',
      },
})



export default ProfileScreen;