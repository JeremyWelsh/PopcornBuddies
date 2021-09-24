import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity, Keyboard } from "react-native";
import { Button, SearchBar, Rating, ThemeProvider  } from 'react-native-elements';
import { Image } from 'react-native-elements/dist/image/Image';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const Movie_Search_Link = "https://api.themoviedb.org/3/search/movie?api_key=2ba045feca37e46db2c792c05da251f5&language=en-US&query=";
const TV_Search_Link = "https://api.themoviedb.org/3/search/tv?api_key=2ba045feca37e46db2c792c05da251f5&language=en-US&query=";

const Image_Link = "https://image.tmdb.org/t/p/w200";
const Genre_Movies_Link = "https://api.themoviedb.org/3/genre/movie/list?api_key=2ba045feca37e46db2c792c05da251f5&language=en-US";
const Genre_TV_Link = "https://api.themoviedb.org/3/genre/tv/list?api_key=2ba045feca37e46db2c792c05da251f5&language=en-US";
//https://api.themoviedb.org/3/search/movie?api_key=2ba045feca37e46db2c792c05da251f5&query=";

//https://api.themoviedb.org/3/search/multi?api_key=2ba045feca37e46db2c792c05da251f5&language=en-US&query=Transformers
// for multi search

const themeSelected = {
  colors: {
    primary: '#e3337d',
  }
}
const themeNot = {
  colors: {
    primary: '#000',
  }
}

// moved this outside of the search screen so it would not fully reaload on a re render
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <View style={{alignItems:'flex-start', flex:1, paddingRight:15}}>
      
    <Text style={[styles.title, textColor]}>{item.title || item.name}</Text>
      <Rating imageSize={20}
        type= "custom"
        readonly 
        startingValue={item.vote_average/2}
        ratingColor="#fff"
        tintColor="#95D7AE"
        ratingBackgroundColor= "#000"/>
      <Text style={[styles.extrainfo, textColor]}>Released: {(item.release_date||item.first_air_date)? item.release_date||item.first_air_date:"No date provided"}</Text>
      <Text style={[styles.overview, textColor]}>{item.overview? item.overview.substring(0, 120)+".." :"No overview provided"}</Text>
    </View>
    <Image source={item.poster_path?{ uri: `${Image_Link+item.poster_path}`}:null} style={{width:125, height: 180,}}/>   
  </TouchableOpacity>
);
/*
  item.id === selectedId ? "#7BAE7F" : "#95D7AE"
  <Text style={[styles.extrainfo, textColor]}>Genres: {item.genre_ids?mgenres[item.genre_ids[0]]: "" || item.genre_ids?tvgenres[item.genre_ids[0]]: ""} </Text>
  */

const SearchScreen = ({navigation}) => {

    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [content, setContent] = useState([]);
    //const [mgenres, setMGenres] = useState([]);
    //const [tvgenres, setTVGenres] = useState([]);
    const [search, setSearch] = useState("");
    const[stype, setSType] = useState("");


    const getContentTv = async () => {
      try {
        setSType("Tv");
        var response = await fetch(TV_Search_Link+search);
        if(search==""){response = await fetch('https://api.themoviedb.org/3/trending/tv/week?api_key=2ba045feca37e46db2c792c05da251f5');}
        const json = await response.json();
        setContent(json.results);
      } catch (error) {
       console.error(error);
      } finally {
       setLoading(false);
      }
    }
    const getContentMovie = async () => {
      try {
        setSType("Movie");
        var response = await fetch(Movie_Search_Link+search); 
        if(search==""){response = await fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=2ba045feca37e46db2c792c05da251f5');}
        const json = await response.json();
        setContent(json.results);
      } catch (error) {
       console.error(error);
      } finally {
       setLoading(false);
      }
    }

    useEffect(() => {
      getContentTv();
    }, [search]);
    useEffect(() => {
      setSearch("");
      setLoading(true);
    }, []);
    // not working yet
    /*useEffect(() => {
      setSearch("");
      setRating(0);
      setContentID("");
      setContentName("");
      setComment("");
    },[{navigation}]);
    */
    
    const renderItem = ({ item }) => {
      //removed for better performance
      const backgroundColor = /*item.id === selectedId ? "#7BAE7F" :*/ "#95D7AE";
      const color = /*item.id === selectedId ? 'white' :*/ 'black';
      return (
        <Item
          item={item}
          onPress={() => setSelectedId(item.id)}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      );
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.searchBox}>
              <SearchBar
                    placeholder="Popular in the last week"
                    autoFocus
                    value={search}
                    onChangeText={(text)=>setSearch(text)}
                    lightTheme="true"
              />
              <View style={{flexDirection:"row", backgroundColor:'#2393D9'}}>
              <ThemeProvider theme={stype=="Tv"?themeSelected:themeNot} >
                <Button containerStyle={styles.button} title="Search TV" onPress={getContentTv} />
              </ThemeProvider>
              <ThemeProvider theme={stype=="Movie"?themeSelected:themeNot} >
                <Button containerStyle={styles.button} title="Search Movies" onPress={getContentMovie} />
              </ThemeProvider>
              </View>
            </View>
            {isLoading ? <ActivityIndicator ActivityIndicator animating size='large' color="#000" /> : (
            <FlatList
                data={content}
                renderItem={renderItem}
                keyExtractor={item => `${item.id}`}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
                windowSize={5}
                contentContainerStyle={{ paddingBottom: 250 }}
            />
            )}
             </TouchableWithoutFeedback>
        </View>

    );
  } 




const styles = StyleSheet.create({
      container: {
        backgroundColor: '#EEE0CB',
        flex: 1,
        //marginTop: StatusBar.currentHeight || 0,
        justifyContent: 'flex-start',
      },
      item: {
        padding: 20,
        marginVertical: 7,
        marginHorizontal: 12,
        alignItems: 'flex-start',
        flexDirection: 'row',
      },
      title: {
        fontWeight: 'bold',
        fontSize: 27,

      },
      extrainfo: {
        fontSize: 15,
      },
      button: {
        //marginTop: 5,
        flex:1,
      },
      searchBox: {
        //padding: 5,
        //alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: '#029420'
      },
      overview: {
        fontSize: 14,

      },
    
});
  


export default SearchScreen;


/*
const getGenres = async () => {
  try {
    var response = await fetch(Genre_Link);
    //console.log(Content_Search_Link+search); //for testing
    const json = await response.json();
    setGenres(json.genres);
  } catch (error) {
   console.error(error);
  } finally {
   setLoading(false);
  }
  
  // tried forever to try get this to work the same as the movie method but it never did so i followed the advice from this 
  // stack overflow on how to turn the json array into this sort of array
  //https://stackoverflow.com/questions/61615574/translate-gendre-ids-from-tmdb-api-in-react-native-application
  // fetch for movie genres
  fetch(Genre_Movies_Link)
    .then(genre => genre.json())
    .then(result => {
        const genres = result.genres.reduce((genres,gObj) => {
            const { id, name } = gObj
            genres[id] = name
            return genres
        },[])
        console.log(genres);
        setMGenres(genres)
    })
    
    //fetch for tv genres
    fetch(Genre_TV_Link)
    .then(genre => genre.json())
    .then(result => {
        const tvgenres = result.genres.reduce((tvgenres,gObj) => {
            const { id, name } = gObj
            tvgenres[id] = name
            return tvgenres
        },[])
        console.log(tvgenres);
        setTVGenres(tvgenres)
    })
    
  }
  */