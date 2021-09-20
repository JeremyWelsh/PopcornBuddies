import React, { useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { auth } from "../../../firebase.js";
//import colours from '../config/colours';

const RegisterScreen = ({navigation}) => {
    // setters for the registration variables
    const[buddyName, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    
    const register = () => {
        // requires an email and password to log in
        auth.createUserWithEmailAndPassword(email,password)
        .then(authUser =>{ 
            // if the requirements are met then update the email with the buddyName
            authUser.user.updateEmail({
                displayName: buddyName,
            })
        } )
        //if the requirements were not met then alert the user on the screen with the error
        .catch(error => alert(error.message));
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text>Popcorn Buddies RegisterScreen</Text>
            <StatusBar style="auto" />
            <View style={styles.inputView}>
            <Input
                    placeholder="Name"
                    autoFocus
                    type="name"
                    value={name}
                    onChangeText={(text)=>setName(text)}
                />
                <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChangeText={(text)=>setEmail(text)}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text)=>setPassword(text)}
                />
            </View>
            <Button containerStyle={styles.button} title="Create Account" onPress={register} />
        </KeyboardAvoidingView>

    );
  } 
const styles = StyleSheet.create({
    inputView: {
        width: 350,

    },
    button: {
        width: 350,
        marginTop: 5,
        backgroundColor: '#19323C',

    },
    container: {
        flex: 1,
        backgroundColor: '#F2D0A4',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
      },
})



export default RegisterScreen;