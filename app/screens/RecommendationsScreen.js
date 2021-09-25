import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { db } from "../../firebase";
import { ActivityIndicator } from "react-native";
import { Image } from "react-native-elements/dist/image/Image";
import colours from "../config/colours";
import { Rating } from "react-native-elements";

//image link prefix
const Image_Link = "https://image.tmdb.org/t/p/w200";


const RecommendationsScreen = ({ navigation }) => {
  // set the variables
  const [isLoading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  var [refresh, setRefresh] = useState(false);

  // sort reviews by rating
  function compareRating(a, b) {
    if (a.rating > b.rating) {
      return -1;
    }
    if (a.rating < b.rating) {
      return 1;
    }
    return 0;
  }

  // get all reviews from all users in the database
  const getReviews = async () => {
    const reviews = [];
    // collection group gets every collection with the name "reviews"
    const querySnapshot = await db.collectionGroup("reviews").get();
    querySnapshot.forEach((doc) => {
      // for each document review get the data and set the key to doc.id and 
      // reviewer name in case more than one user reviews a piece of content
      reviews.push({
        ...doc.data(),
        key: doc.id + doc.reviewerName,
      });
    });
    // sort the reviews, set them, and finish the query
    reviews.sort(compareRating);
    setReviews(reviews);
    setLoading(false);
    refresh = false;
  };

  // on the first opening of te page get the reviews
  useEffect(() => {
    if (isLoading) {
      getReviews();
    }
  }, []);

  // when the flatlist is pulled down refresh the reviews
  const handleRefresh = () => {
    refresh = true;
    getReviews();
  };

  // render the items in the flat list
  const renderItem = ({ item }) => {
    return (
      <View style={[styles.item]}>
        <View style={{ alignItems: "flex-start", flex: 1, paddingRight: 15 }}>
          <Text style={styles.title}>{item.cName}</Text>
          <Rating
            imageSize={20}
            type="custom"
            readonly
            //halved because ratings are out of 10
            startingValue={item.rating / 2}
            ratingColor={colours.stars}
            tintColor={colours.itemColor}
            ratingBackgroundColor="#000"
          />
          <Text style={styles.extrainfo}>Year: {item.cYear}</Text>
          <Text style={styles.extrainfo}>Content Type: {item.type}</Text>
          <Text style={styles.extrainfo}>Comment: {item.comment}</Text>
          <Text style={styles.extrainfo}>User ID: {item.reviewerName}</Text>
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
      <Text>Popcorn Buddies RecommendationsScreen</Text>
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
          data={reviews}
          renderItem={renderItem}
          refreshing={refresh}
          onRefresh={handleRefresh}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
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

export default RecommendationsScreen;