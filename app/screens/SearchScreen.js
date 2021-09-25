import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity, Keyboard} from "react-native";
import { Button, SearchBar, Rating, ThemeProvider} from "react-native-elements";
import { Image } from "react-native-elements/dist/image/Image";
import colours from "../config/colours";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

//all links for searches
const Movie_Search_Link ="https://api.themoviedb.org/3/search/movie?api_key=2ba045feca37e46db2c792c05da251f5&language=en-US&query=";
const TV_Search_Link ="https://api.themoviedb.org/3/search/tv?api_key=2ba045feca37e46db2c792c05da251f5&language=en-US&query=";
const Image_Link = "https://image.tmdb.org/t/p/w200";

// themes for the buttons at the top
const themeSelected = {colors: {primary: colours.orange}};
const themeNot = {colors: {primary: colours.jetGrey}};

// moved this outside of the search screen so it would not fully reaload on a re render
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <View style={{ alignItems: "flex-start", flex: 1, paddingRight: 15 }}>
      <Text style={[styles.title, textColor]}>{item.title || item.name}</Text>
      <Rating
        imageSize={20}
        type="custom"
        readonly
        //halved because ratings are out of 10
        startingValue={item.rating / 2}
        ratingColor="#fff"
        tintColor={colours.bgColor}
        ratingBackgroundColor="#000"
      />
      <Text style={[styles.extrainfo, textColor]}>
        Released:{" "}{(item.release_date || item.first_air_date) ? (item.release_date || item.first_air_date) : "No date provided"}
      </Text>
      <Text style={[styles.overview, textColor]}>
        {item.overview ? item.overview.substring(0, 120) + ".." : "No overview provided"}
      </Text>
    </View>
    <Image source={ item.poster_path ? { uri: `${Image_Link + item.poster_path}` } : null }
      style={{ width: 125, height: 180 }}
    />
  </TouchableOpacity>
);

const SearchScreen = ({ navigation }) => {
  // setting all the variables
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [content, setContent] = useState([]);
  const [search, setSearch] = useState("");
  const [stype, setSType] = useState("");

  // gets the content using the search link for tv shows
  const getContentTv = async () => {
    try {
      // set search type to show the useEffect which link content getter to use
      setSType("Tv");
      // get the content from the search added to the movie api link
      var response = await fetch(TV_Search_Link + search);
      // if the search is empty just show the trending tv shows from the past week
      if (search == "") {
        response = await fetch("https://api.themoviedb.org/3/trending/tv/week?api_key=2ba045feca37e46db2c792c05da251f5" );
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
      // use tv getter
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
    //removed for better performance
    const backgroundColor = /*item.id === selectedId ? "#7BAE7F" :*/ colours.itemColor;
    const color = /*item.id === selectedId ? 'white' :*/ "black";
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  //return the screen
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.searchBox}>
          <SearchBar
            placeholder="Popular in the last week"
            autoFocus
            value={search}
            onChangeText={(text) => setSearch(text)}
            lightTheme="true"
          />
          <View style={{ flexDirection: "row", backgroundColor: "#2393D9" }}>
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
            keyExtractor={(item) => `${item.id}`}
            initialNumToRender={3}
            maxToRenderPerBatch={3}
            windowSize={5}
            contentContainerStyle={{ paddingBottom: 250 }}
          />
        )}
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.bgColor,
    flex: 1,
    justifyContent: "flex-start",
  },
  item: {
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
  button: {
    flex: 1,
  },
  searchBox: {
    justifyContent: "center",
  },
  overview: {
    fontSize: 14,
  },
});

export default SearchScreen;
