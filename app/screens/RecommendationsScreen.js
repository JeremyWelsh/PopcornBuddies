import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View } from "react-native";

import colours from '../config/colours';

const RecommendationsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Popcorn Buddies RecommendationsScreen</Text>
            <StatusBar style="auto" flex="1" />
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



export default RecommendationsScreen;