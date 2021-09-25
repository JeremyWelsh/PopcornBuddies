import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { auth, db } from "../../firebase";
import { ActivityIndicator } from "react-native";
import colours from "../config/colours";
import { Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

// screen where a user sees all of their buddies
const BuddyScreen = ({ navigation }) => {
  // set the variables
  const [isLoading, setLoading] = useState(true);
  const [buddies, setBuddies] = useState([]);

  //use effect on first opening of screen
  useEffect(() => {
    // get a snapshot of all of the buddies the current user has added
    const subscriber = db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("buddies")
      .onSnapshot((snapshot) => {
        const buddies = [];
        // for each doc get the data
        snapshot.forEach((doc) => {
          buddies.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        // set the array and finish the query
        setBuddies(buddies);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  // render the other buddies
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          height: 50,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={()=> {navigation.navigate('BuddyProfile',{key: item.key, name: item.buddyName})}}
      >
        <Text>Buddy Name: {item.buddyName}</Text>
        <Text>Buddy Email: {item.email}</Text>
      </TouchableOpacity>
    );
  };
  // return the rest of the screen
  return (
    <View style={styles.container}>
      <Text>Popcorn Buddies BuddyScreen</Text>
      <StatusBar style="auto" />
      {isLoading ? (
        <ActivityIndicator
          ActivityIndicator
          animating
          size="large"
          color="#000"
        />
      ) : (
        <FlatList data={buddies} renderItem={renderItem} />
      )}
      <Button
        containerStyle={styles.button}
        title="Add Buddy"
        onPress={() => {
          navigation.navigate("AddBuddy");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.bgColor,
    justifyContent: "center",
  },
});

export default BuddyScreen;
