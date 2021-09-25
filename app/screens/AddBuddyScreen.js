import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { auth, db } from "../../firebase";
import { ActivityIndicator } from "react-native";
import colours from "../config/colours";
import { Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

const AddBuddyScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [buddies, setBuddies] = useState([]);
  const [allbuddies, setAllBuddies] = useState([]);
  const [addedbuddies, setAddedBuddies] = useState([]);

  const addBuddy = async (buddyid, buddyName, email) => {
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
      alert("Added " + buddyName + " as a Buddy");
    } catch (error) {
      console.error(error);
    }
  };


  const getBuddies = async () => {
    const buddies = [];
    const querySnapshot = await db.collection("users").get();
    querySnapshot.forEach((doc) => {
      if((doc.id != auth.currentUser.uid) && (addedbuddies.filter(e => e.key === doc.id.toString())).length <1){
        buddies.push({
          ...doc.data(),
          key: doc.id,
        });
      }
    });
    setBuddies(buddies);
    setLoading(false);
  };
  const getAddedBuddies = async () => {
    const addedbuddies = [];
    const querySnapshot = await db.collection("users").doc(auth.currentUser.uid).collection("buddies").get();
    querySnapshot.forEach((doc) => {
      
      console.log(doc.id + "jfhasoijngfoiungosd        gjsdgo jnbsdogn buiosdnbgoi u    sguih du gsioudb giousdh")
      console.log("----------------------------")
      console.log(doc.id + "                  gfsadgsfdgfsd")
      addedbuddies.push({
        ...doc.data(),
        key: doc.id,
      });
    });
    console.log("------------already adddeeeddd----------------")
    console.log(addedbuddies)
    console.log("----------------------------")
    setAddedBuddies(addedbuddies);
    setLoading(false);
  };
/*
  const getBuddies = async () => {
    const buddies = allbuddies.filter(item => (!addedbuddies.includes(item.id)));
    console.log("---------buddies-------------------")
    console.log(buddies)
    console.log("----------------------------")
    setBuddies(buddies);
    setLoading(false);
  };
*/
  useEffect(() => {
    console.log("-----------NEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW-----------------")
    console.log("-----------NEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW-----------------")
    console.log("-----------NEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW-----------------")
    console.log("-----------NEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW-----------------")
    //getAllBuddies();
    getAddedBuddies();
    
    getBuddies();
    console.log("---------Final collection of not added-----------------")
    console.log(buddies)
    console.log("----------------------------")
  }, []);









  //<Text style={styles.email}>{item.email}</Text>
  //style={{alignItems:"column"}}
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
      <Text>Popcorn Buddies AddBuddyScreen</Text>
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
    backgroundColor: "#066",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#46f21e",
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
