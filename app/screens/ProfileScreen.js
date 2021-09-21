import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from "react-native";
import { Button } from 'react-native-elements/dist/buttons/Button';
import { auth } from "../../firebase.js";
import colours from '../config/colours';

// user viewing their own profile
const ProfileScreen = ({navigation}) => {
    const LogOut = () => {
        auth.signOut().then(()=>{
            navigation.replace("Login");
        })
    }
    return (
        <View style={styles.container}>
            <Text>Popcorn Buddies ProfileScreen</Text>
            <StatusBar style="auto" />
            <Button containerStyle={styles.button} title="Log out" onPress={LogOut} />
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
      button: {
        width: 350,
        marginTop: 5,
        backgroundColor: '#19323C',

    },
})



export default ProfileScreen;