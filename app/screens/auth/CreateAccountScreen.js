import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { auth, db } from "../../../firebase.js";
import colours from "../../config/colours";

//followed the start of this tutorial to help code the login and create account screens
//https://www.youtube.com/watch?v=MJzmZ9qmdaE

const CreateAccountScreen = ({ navigation }) => {
  // buddyname, email, and password setters and variables
  const [buddyName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // sign up method called when the user presses the create account button
  const CreateAccount = () => {
    // requires an email and password to log in
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        // if the requirements are met then update the email with the buddyName
        authUser.user.updateProfile({
          displayName: buddyName,
        });
        db.collection("users")
          .doc(auth.currentUser.uid)
          .set({ buddyName: buddyName, email: email });
      })
      //if the requirements were not met then alert the user on the screen with the error
      .catch((error) => alert(error.message));
  };
  
  // return the screen
  return (
    <View style={styles.container}>
      <Text>Popcorn Buddies RegisterScreen</Text>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <Input
          placeholder="Name"
          autoFocus
          type="buddyName"
          value={buddyName}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
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
      <Button
        containerStyle={styles.button}
        title="Create Account"
        onPress={CreateAccount}
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
  container: {
    flex: 1,
    backgroundColor: colours.bgColor,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
});

export default CreateAccountScreen;
