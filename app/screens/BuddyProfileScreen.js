import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { db } from "../../firebase";
import { ActivityIndicator } from "react-native";
import { Image } from "react-native-elements/dist/image/Image";
import colours from "../config/colours";
import { Rating } from "react-native-elements";

// link to use the image path
const Image_Link = "https://image.tmdb.org/t/p/w200";

// route used to path through the user item from buddyscreen
const BuddyProfileScreen = ({route }) => {
  //get route params for the buddy
  const uid = route.params?.key;
  const uname = route.params?.name;
  //set variables
  const [isLoading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  // sort(compareRating) to order the content highest rating to lowest
  function compareRating(a, b) {
    if (a.rating > b.rating) {
      return -1;
    }
    if (a.rating < b.rating) {
      return 1;
    }
    return 0;
  }

  // use effect on opening the screen
  useEffect(() => {
    // get the snapshot of the buddy's reviews from the firestore database
    const subscriber = db
      .collection("users")
      .doc(uid)
      .collection("reviews")
      .onSnapshot((snapshot) => {
        const reviews = [];
        snapshot.forEach((doc) => {
          reviews.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        // sort the reviews by ratings then set the reviews
        reviews.sort(compareRating);
        setReviews(reviews);
        // query has been finished
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  //render the movies/tvshows from the flat list
  const renderItem = ({ item }) => {
    return (
      <View style={[styles.item]}>
        <View style={{ alignItems: "flex-start", flex: 1, paddingRight: 15 }}>
          <Text style={styles.title}>Title: {item.cName}</Text>
          <Rating
            imageSize={20}
            type="custom"
            readonly
            // rating is out of ten and there are 5 stars so the rating is halved
            startingValue={item.rating / 2}
            ratingColor={colours.stars}
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

  // return the screen
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.userInfo}>
          <Text style={styles.userText}>{uname}</Text>
        </View>
      </View>
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
    justifyContent: "center",
    flex: 0.35,
    backgroundColor: colours.theBlue,
    width:100,
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
  topView:  {
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal:15,
    paddingVertical:7,
  },
  userInfo: {
    flex:1,
  },
  userText: {
    fontWeight: "bold",
    fontSize: 30,
  },
});

export default BuddyProfileScreen;
