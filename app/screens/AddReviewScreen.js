import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity, Keyboard } from "react-native";
import { auth, db } from "../../firebase.js";
import { Button, SearchBar, Input, Rating, ThemeProvider} from "react-native-elements";
import colours from "../config/colours";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Movie_Search_Link = "https://api.themoviedb.org/3/search/movie?api_key=2ba045feca37e46db2c792c05da251f5&language=en-US&query=";
const TV_Search_Link = "https://api.themoviedb.org/3/search/tv?api_key=2ba045feca37e46db2c792c05da251f5&language=en-US&query=";


// this is how the movies/tvshows are rendered in the flatlist
// this is outside of the screen method so it doesnt get rerendered too often
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title || item.name} </Text>
    <Text style={[styles.extrainfo, textColor]}>
      {item.release_date || item.first_air_date
        ? (item.release_date || item.first_air_date).substring(0, 4)
        : "Null"}
    </Text>
  </TouchableOpacity>
);

// themes for the buttons at the top
const themeSelected = {colors: {primary: colours.stars, secondary: '#000'}};
const themeNot = {colors: {primary: colours.jetGrey, secondary: '#fff'}};

const AddReviewScreen = ({ navigation }) => {
  // setters for all the variables
  const [contentId, setContentID] = useState("");
  const [contentName, setContentName] = useState("");
  const [starRating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [content, setContent] = useState([]);
  const [type, setType] = useState("");
  const [stype, setSType] = useState("");
  const [year, setYear] = useState("");
  const [ppath, setPosterPath] = useState("");

  // sets up the data to be added in a doc in the current users reviews collection.
  const addReview = async () => {
    try {
      // if theres not content id then a movie/tv show is not selected and it alerts the user
      if (contentId != "") {
        await db
          .collection("users")
          .doc(auth.currentUser.uid)
          .collection("reviews")
          .add({
            cID: contentId,
            cName: contentName,
            cYear: year,
            type: type,
            rating: starRating,
            comment: comment,
            poster: ppath,
            reviewerName: auth.currentUser.displayName.toString(),
          });
        alert("Review Recorded!");
      } else {
        alert("Please select a TV show or Movie");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // gets the content using the search link for tv shows
  const getContentTv = async () => {
    try {
      // set search type to show the useEffect which link content getter to use
      setSType("Tv");
      // get the content from the search added to the movie api link
      var response = await fetch(TV_Search_Link + search);
      // if the search is empty just show the trending tv shows from the past week
      if (search == "") {
        response = await fetch("https://api.themoviedb.org/3/trending/tv/week?api_key=2ba045feca37e46db2c792c05da251f5");
      }
      const json = await response.json();
      // set the content array to the results taken from the json array
      setContent(json.results);
    } catch (error) {
      console.error(error);
    } finally {
      // show that the query has finished
      setLoading(false);
    }
  };

  // gets the content using the search link for movies
  const getContentMovie = async () => {
    try {
      // set search type to show the useEffect which link content getter to use
      setSType("Movie");
      // get the content from the search added to the movie api link
      var response = await fetch(Movie_Search_Link + search);
      // if the search is empty just show the trending movies from the past week
      if (search == "") {
        response = await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=2ba045feca37e46db2c792c05da251f5");
      }
      const json = await response.json();
      // set the content array to the results taken from the json array
      setContent(json.results);
    } catch (error) {
      console.error(error);
    } finally {
      // show that the query has finished
      setLoading(false);
    }
  };

  //use effect which will be called whenever the search bar is updated
  useEffect(() => {
    // if the search type is a movie
    if (stype == "Movie") {
      // use movie getter
      getContentMovie();
    } else {
      //use tv getter
      getContentTv();
    }
  }, [search]);

  // when the page is opened for the first time
  useEffect(() => {
    // set search bar to null
    setSearch("");
    //set loading to true so it loads content into the flat list
    setLoading(true);
  }, []);

  // render the flatlist movies/tvshows
  const renderItem = ({ item }) => {
    // background colour and text colour set depending if the content is selected
    const backgroundColor = item.id === contentId ? colours.theBlue : colours.itemColor;
    const color = item.id === contentId ? "white" : "black";
    return (
      <Item
        item={item}
        onPress={() => {
          // set all the variables
          setContentID(item.id),
          // movie title, tv name
          setContentName(item.title || item.name),
          // depending on whether or not its a tv show or movie the dates change
          setYear((item.release_date || item.first_air_date) ? (item.release_date || item.first_air_date) : "No date"),
          // set the type depending on the title
          setType(item.title ? "Movie" : "TV"),
          // get the image path
          setPosterPath(item.poster_path);
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  // refresh the variables when the user presses the submit button
  const refresh = () => {
    setRating(0);
    setSearch("");
    setContentID("");
    setContentName("");
    setComment("");
    setContent([]);
    getContentTv();
  };

  //return the screen
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.searchBox}>
          <SearchBar
            placeholder="Search"
            autoFocus
            value={search}
            onChangeText={(text) => {
              setSearch(text);
            }}
            lightTheme="true"
          />
          <View style={{ flexDirection: "row", backgroundColor: colours.jetGrey }}>
            <ThemeProvider theme={stype == "Tv" ? themeSelected : themeNot}>
              <Button
                containerStyle={styles.button}
                title="Search TV"
                onPress={getContentTv}
              />
            </ThemeProvider>
            <ThemeProvider theme={stype == "Movie" ? themeSelected : themeNot}>
              <Button
                containerStyle={styles.button}
                title="Search Movies"
                onPress={getContentMovie}
              />
            </ThemeProvider>
          </View>
        </View>
        <View style={{ height: 185 }}>
          {isLoading ? (
            <ActivityIndicator
              ActivityIndicator
              animating
              size="large"
              color="#000"
            />
          ) : (
            <FlatList
              data={content}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              initialNumToRender={5}
              maxToRenderPerBatch={5}
              windowSize={5}
            />
          )}
        </View>
        <View>
          <Text style={styles.forum}> Selected Content: {contentName} </Text>
          <View>
            <Text style={styles.forum}>Your Rating :</Text>
            <Rating
              startingValue={starRating/2}
              type="custom"
              fractions={2}
              ratingCount={5}
              imageSize={40}
              // jump value is 0.25 so each step will be 0.5 out of ten
              jumpValue={0.25}
              // rating is out of ten and there are 5 stars so the rating is doubled
              onFinishRating={(rating) => setRating(rating * 2)}
              ratingColor={colours.stars}
              tintColor={colours.bgColor}
              ratingBackgroundColor="#000"
            />
          </View>
          <Input
            placeholder="Comment"
            autoFocus
            type="comment"
            value={comment}
            onChangeText={(text) => setComment(text)}
          />
          <Button
            title="submit"
            onPress={() => {
              addReview(), refresh();
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.bgColor,
    justifyContent: "flex-start",
  },
  item: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    marginVertical: 1,
    marginHorizontal: 0,
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
  },
  extrainfo: {
    fontSize: 15,
    alignSelf: "flex-end",
  },
  button: {
    flex: 1,
  },
  searchBox: {
    justifyContent: "center",
  },
  forum: {
    fontSize: 20,
  }
});

export default AddReviewScreen;
