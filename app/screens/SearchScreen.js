import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { Button, SearchBar, Rating  } from 'react-native-elements';

import colours from '../config/colours';


const Content_Search_Link = "https://api.themoviedb.org/3/search/movie?api_key=2ba045feca37e46db2c792c05da251f5&query=";

//https://api.themoviedb.org/3/search/multi?api_key=2ba045feca37e46db2c792c05da251f5&language=en-US&query=Transformers
// for multi search





const SearchScreen = ({navigation}) => {

    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    const getContent = async () => {
      try {
       const response = await fetch(Content_Search_Link+search);
       console.log(Content_Search_Link+search);
       const json = await response.json();
       setData(json.results);
      } catch (error) {
       console.error(error);
      } finally {
       setLoading(false);
      }
    }

    useEffect(() => {
      getContent();
    }, []);

    const renderItem = ({ item }) => {
      const backgroundColor = item.id === selectedId ? "#7BAE7F" : "#95D7AE";
      const color = item.id === selectedId ? 'white' : 'black';
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
        <Text style={[styles.title, textColor]}>{item.title}</Text>
        <Text style={[styles.extrainfo, textColor]}>Released: {item.release_date}</Text>
        <Text style={[styles.extrainfo, textColor]}>Overall Rating: {item.vote_average}</Text>
        <Rating imageSize={15}
          type= "custom"
          readonly 
          startingValue={item.vote_average/2}
          ratingColor="#fff"
          tintColor={item.id === selectedId ? "#7BAE7F" : "#95D7AE"}
          ratingBackgroundColor= "#000"/>
      </TouchableOpacity>
  );

    return (
        <View style={styles.container}>
            <Text>Popcorn Buddies SearchScreen</Text>
            <StatusBar style="auto" />
            <View style={styles.searchBox}>
              <SearchBar
                    placeholder="Search"
                    autoFocus
                    value={search}
                    onChangeText={(text)=>setSearch(text)}
                    lightTheme="true"
              />
              <Button containerStyle={styles.button} title="Search" onPress={getContent} />
            </View>
            {isLoading ? <ActivityIndicator/> : (
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
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
        justifyContent: 'center',
      },
      item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontWeight: 'bold',
        fontSize: 20,

      },
      extrainfo: {
        fontSize: 15,
      },
      button: {
        marginTop: 5,
        backgroundColor: '#19323C',
    },
    searchBox: {
      width: 400,
      padding: 5,
      //alignItems: 'center',
      justifyContent: 'center',
    },
    ratingSearch: {
    },
    
});
  


export default SearchScreen;