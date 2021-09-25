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
      style={styles.item}
        onPress={()=> {navigation.navigate('Buddy Profile',{key: item.key, name: item.buddyName})}}
      >
        <Text style={styles.name}>{item.buddyName}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </TouchableOpacity>
    );
  };
  // return the rest of the screen
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isLoading ? (
        <ActivityIndicator
          ActivityIndicator
          animating
          size="large"
          color="#000"
        />
      ) : (
        <FlatList style={styles.FlatList}data={buddies} renderItem={renderItem} />
      )}
      <Button
        containerStyle={styles.button}
        title="Add Buddy"
        onPress={() => {
          navigation.navigate("Add Buddy");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.bgColor,
    justifyContent: "flex-start",
    flexDirection:'column',
  },
  button: {
    flex: 0.18,
    marginHorizontal:30,
  },
  item: {
    backgroundColor: colours.itemColor,
    alignItems: "flex-start",
    justifyContent: "space-between",
    flex: 1,
    padding: 15,
    marginVertical: 7,
    marginHorizontal: 10,
    flexDirection: "row",
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  email: {
    fontWeight: "normal",
    fontSize: 15,
  },
  FlatList:{
    flex: 1,
  }
});

export default BuddyScreen;
