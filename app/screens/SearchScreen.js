import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View } from "react-native";

import colours from '../config/colours';

const SearchScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Popcorn Buddies SearchScreen</Text>
            <StatusBar style="auto" />
        </View>

    );
  } 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#990',
        alignItems: 'center',
        justifyContent: 'center',
      },
})



export default SearchScreen;