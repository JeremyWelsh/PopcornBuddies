import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { auth } from "../../../firebase.js";
import colours from '../../config/colours';

//followed the start of this tutorial to help code the login and create account screens
//https://www.youtube.com/watch?v=MJzmZ9qmdaE

const LoginScreen = ({ navigation }) => {

  // email and password setters and values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // if the user is signed in then take them to the tab screens
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authenticated) => {
      if (authenticated) {
        navigation.replace("MainTabNavigator");
      }
    });
    return unsubscribe;
  }, []);

  // login method called when the signin button is pressed
  const LogIn = () => {
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };
  
  //screen to be returned with email, password, login and register buttons
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.logo}>Popcorn</Text>
        <Text style={styles.logoB}>Buddies</Text>
      </View>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button containerStyle={styles.button} title="Login" onPress={LogIn} />
      <Button
        containerStyle={styles.buttonCA}
        title="Create Account"
        onPress={() => navigation.navigate("CreateAccount")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    width: 350,
  },
  button: {
    width: 350,
    marginTop: 5,
    backgroundColor: colours.theBlue,
  },
  buttonCA: {
    width: 350,
    marginTop: 5,
    backgroundColor: colours.orange,
  },
  container: {
    flex: 1,
    backgroundColor: colours.bgColor,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    paddingTop:0,
  },
  topView:  {
    justifyContent: "center",
    flexDirection: "column",
    paddingHorizontal:20,
    paddingTop:7,
    paddingBottom:7,
    backgroundColor:colours.bgColor,
    marginTop:0,
    marginBottom:60,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 60,
    color: colours.theBlue,
  },
  logoB: {
    fontWeight: "bold",
    fontSize: 60,
    color: colours.orange,
  },
});

export default LoginScreen;
