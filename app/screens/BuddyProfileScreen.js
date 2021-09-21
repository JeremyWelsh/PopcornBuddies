import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from "react-native";
import colours from '../config/colours';

// where a user views a specific buddy
const BuddyProfileScreen = () => {

    return (
        <View style={styles.container}>
            <Text>Popcorn Buddies BuddyProfileScreen</Text>
            <StatusBar style="auto" />
        </View>

    );
  } 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colours.primary,
        alignItems: 'center',
        justifyContent: 'center',
      },
})



export default BuddyProfileScreen;