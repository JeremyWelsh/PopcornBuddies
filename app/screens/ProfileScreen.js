import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { auth, db } from "../../firebase";
import { ActivityIndicator } from "react-native";
import { Image } from "react-native-elements/dist/image/Image";
import colours from "../config/colours";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Rating } from "react-native-elements";

// image link prefix
const Image_Link = "https://image.tmdb.org/t/p/w200";

// user viewing their own profile
const ProfileScreen = ({ navigation }) => {
  // set the variables
  const [isLoading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  //log out button 
  const LogOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  // order the reviews by rating
  function compareRating(a, b) {
    if (a.rating > b.rating) {
      return -1;
    }
    if (a.rating < b.rating) {
      return 1;
    }
    return 0;
  }

  //use effect on first opening of screen
  useEffect(() => {
    // get a snapshot of all of the reviews the current user has
    const subscriber = db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("reviews")
      .onSnapshot((snapshot) => {
        const reviews = [];
        // for each doc get the data
        snapshot.forEach((doc) => {
          reviews.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        // set the array and finish the query
        reviews.sort(compareRating);
        setReviews(reviews);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  // render the reviews in the flat list
  const renderItem = ({ item }) => {
    return (
      <View style={[styles.item]}>
        <View style={{ alignItems: "flex-start", flex: 1, paddingRight: 15 }}>
          <Text style={styles.title}>Title: {item.cName}</Text>
          <Rating
            imageSize={20}
            type="custom"
            readonly
            //halved because ratings are out of 10
            startingValue={item.rating / 2}
            ratingColor="#fff"
            tintColor={colours.itemColor}
            ratingBackgroundColor="#000"
          />
          <Text style={styles.extrainfo}>Year: {item.cYear}</Text>
          <Text style={styles.extrainfo}>Content Type: {item.type}</Text>
          <Text style={styles.extrainfo}>Comment: {item.comment}</Text>
        </View>
        <Image
          source={item.poster ? { uri: `${Image_Link + item.poster}` } : null}
          style={{ width: 125, height: 180 }}
        />
      </View>
    );
  };

  //return the screen 
  return (
    <View style={styles.container}>
      <Text>Popcorn Buddies ProfileScreen</Text>
      <StatusBar style="auto" />
      {isLoading ? (
        <ActivityIndicator
          ActivityIndicator
          animating
          size="large"
          color="#000"
        />
      ) : (
        <FlatList data={reviews} renderItem={renderItem} />
      )}
      <Button containerStyle={styles.button} title="Log out" onPress={LogOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.bgColor,
    justifyContent: "center",
  },
  button: {
    width: 350,
    marginTop: 5,
    backgroundColor: colours.theBlue,
  },
  item: {
    backgroundColor: colours.itemColor,
    padding: 20,
    marginVertical: 7,
    marginHorizontal: 12,
    alignItems: "flex-start",
    flexDirection: "row",
  },
  title: {
    fontWeight: "bold",
    fontSize: 27,
  },
  extrainfo: {
    fontSize: 15,
  },
});

export default ProfileScreen;
