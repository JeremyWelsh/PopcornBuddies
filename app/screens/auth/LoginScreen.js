import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';

//import colours from '../config/colours';

const LoginScreen = ({navigation}) => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const signIn = () => {

    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text>Popcorn Buddies LoginScreen</Text>
            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <Input
                    placeholder="Email"
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={(text)=>setEmail(text)}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChangeText={(text)=>setPassword(text)}
                />
            </View>
            <Button containerStyle={styles.button} title="Login" onPress={signIn} />
            <Button containerStyle={styles.button} title="Create Account" onPress={() => navigation.navigate("Register")}/>
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
        backgroundColor: '#C03221',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,

      },
      
})



export default LoginScreen;