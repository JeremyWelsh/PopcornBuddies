import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { Button, SearchBar, Rating  } from 'react-native-elements';

import colours from '../config/colours';
import { Image } from 'react-native-elements/dist/image/Image';


const Content_Search_Link = "https://api.themoviedb.org/3/search/multi?api_key=2ba045feca37e46db2c792c05da251f5&language=en-US&query=";
const Image_Link = "https://image.tmdb.org/t/p/w200";
const Genre_Link = "https://api.themoviedb.org/3/genre/movie/list?api_key=2ba045feca37e46db2c792c05da251f5&language=en-US";
//https://api.themoviedb.org/3/search/movie?api_key=2ba045feca37e46db2c792c05da251f5&query=";

//https://api.themoviedb.org/3/search/multi?api_key=2ba045feca37e46db2c792c05da251f5&language=en-US&query=Transformers
// for multi search





const SearchScreen = ({navigation}) => {

    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [content, setContent] = useState([]);
    const [genres, setGenres] = useState([]);
    const [search, setSearch] = useState("");

    const getContent = async () => {
      try {
        var response = await fetch(Content_Search_Link+search);;
        if(search==""){
          response = await fetch('https://api.themoviedb.org/3/trending/all/week?api_key=2ba045feca37e46db2c792c05da251f5');
        }
        //console.log(Content_Search_Link+search); //for testing
        const json = await response.json();
        setContent(json.results);
      } catch (error) {
       console.error(error);
      } finally {
       setLoading(false);
      }
    }

    const getGenres = async () => {
      /*try {
        var response = await fetch(Genre_Link);
        //console.log(Content_Search_Link+search); //for testing
        const json = await response.json();
        setGenres(json.genres);
      } catch (error) {
       console.error(error);
      } finally {
       setLoading(false);
      }*/
      // tried forever to try get the other list to work but it never did so i followed the advice from this 
      // stack overflow on how to turn the json array into this type of array
      //https://stackoverflow.com/questions/61615574/translate-gendre-ids-from-tmdb-api-in-react-native-application
      fetch(Genre_Link)
        .then(genre => genre.json())
        .then(result => {
            const genres = result.genres.reduce((genres,gObj) => {
                const { id, name } = gObj
                genres[id] = name
                return genres
            },[])
            setGenres(genres)
        })
    }

    useEffect(() => {
      getContent();
      getGenres();
    }, []);

    const renderItem = ({ item }) => {
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

  

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
      <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <View style={{alignItems:'flex-start', flex:1}}>
        <Text style={[styles.title, textColor]}>{item.title || item.name}</Text>
        <Rating imageSize={20}
            type= "custom"
            readonly 
            startingValue={item.vote_average/2}
            ratingColor="#fff"
            tintColor={"#95D7AE"}
            ratingBackgroundColor= "#000"/>
        <Text style={[styles.extrainfo, textColor]}>Director: {item.vote_average}</Text>
        <Text style={[styles.extrainfo, textColor]}>Released: {item.release_date || item.first_air_date}</Text>
        <Text style={[styles.extrainfo, textColor]}>Overall Rating: {item.vote_average}</Text>
        <Text style={[styles.extrainfo, textColor]}>Genres: {genres[item.genre_ids[0]]}, {genres[item.genre_ids[1]]}</Text>
        
      

        </View>
        <Image source={{ uri: `${Image_Link+item.poster_path}`}} style={{width:100, height: 160,}}/>   
      </TouchableOpacity>
  );
  //item.id === selectedId ? "#7BAE7F" : "#95D7AE"
//<Text style={[styles.extrainfo, textColor]}>Overall Rating: {item.vote_average}</Text>
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.searchBox}>
              <SearchBar
                    placeholder="Popular in the last week"
                    autoFocus
                    value={search}
                    onChangeText={(text)=>setSearch(text)}
                    lightTheme="true"
              />
              <Button containerStyle={styles.button} title="Search" onPress={getContent} />
            </View>
            {isLoading ? <ActivityIndicator ActivityIndicator animating size='large' /> : (
            <FlatList
                data={content}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
            />
            )}
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
        fontSize: 24,

      },
      extrainfo: {
        fontSize: 15,
      },
      button: {
        //marginTop: 5,
        backgroundColor: '#19323C',
      },
      searchBox: {
        //padding: 5,
        //alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: '#029420'
      },
    
});
  


export default SearchScreen;