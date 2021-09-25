import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { auth, db } from "../../firebase";
import { ActivityIndicator } from "react-native";
import colours from "../config/colours";
import { Button } from "react-native-elements";

const AddBuddyScreen = ({ navigation }) => {

  // setting up all of the variables
  const [isLoading, setLoading] = useState(true);
  const [buddies, setBuddies] = useState([]);
  const [addedbuddies, setAddedBuddies] = useState([]);

  // add buddy method takes the details of a buddy
  const addBuddy = async (buddyid, buddyName, email) => {
    // tries to set the variables in the collection "buddies" of the signed in user
    try {
      await db
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("buddies")
        .doc(buddyid)
        .set({
          buddyName: buddyName,
          email: email,
          key: buddyid
        });
        // alerts the user the buddy has been added
      alert("Added " + buddyName + " as a Buddy");
      // reloads the page
      setLoading(true)
    } catch (error) {
      console.error(error);
    }
  };

  // get buddies gets all buddies from the database except for the current user,
  // and the ones they have already added
  const getBuddies = async () => {
    const buddies = [];
    const querySnapshot = await db.collection("users").get();
    // for each document in the snapshot
    querySnapshot.forEach((doc) => {
      if((doc.id != auth.currentUser.uid) && (addedbuddies.filter(e => e.key === doc.id.toString())).length <1){
        //add the document data and id to the buddies array
        buddies.push({
          ...doc.data(),
          key: doc.id,
        });
      }
    });
    setBuddies(buddies);
    // show that the query has finished
    setLoading(false)
  };


  // get the buddies that the current user already has added
  const getAddedBuddies = async () => {
    const addedbuddies = [];
    const querySnapshot = await db.collection("users").doc(auth.currentUser.uid).collection("buddies").get();
    // for each document in the current users buddies collection
    querySnapshot.forEach((doc) => {
      // add the data
      addedbuddies.push({
        ...doc.data(),
        key: doc.id,
      });
    });
    setAddedBuddies(addedbuddies);
  };


  // whenever the screen is loading, get the buddies that they have not added yet
  useEffect(() => {
    getAddedBuddies();
    getBuddies()
  }, [isLoading]);


  // render the screen
  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <View>
          <Text style={styles.name}>{item.buddyName}</Text>
          <Text>{item.email}</Text>
        </View>
        <Button
          containerStyle={styles.button}
          title="Add Buddy"
          onPress={() => {
            addBuddy(item.key, item.buddyName, item.email);
          }}
        />
      </View>
    );
  };
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
        <FlatList
          data={buddies}
          renderItem={renderItem}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.bgColor,
    justifyContent: "center",
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
  button: {
    alignSelf: "flex-end",
    color: "#000",
  },
});

export default AddBuddyScreen;
