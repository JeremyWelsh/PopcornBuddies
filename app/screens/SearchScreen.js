import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";

import colours from '../config/colours';


const Content_Search_Link = "https://api.themoviedb.org/3/search/movie?api_key=2ba045feca37e46db2c792c05da251f5&query=Transformers&Page=1";

//https://api.themoviedb.org/3/search/multi?api_key=2ba045feca37e46db2c792c05da251f5&language=en-US&query=Transformers
// for multi search


const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
      <Text style={[styles.extrainfo, textColor]}>{item.release_date}</Text>
      <Text style={[styles.extrainfo, textColor]}>{item.vote_average}</Text>
    </TouchableOpacity>
);


const SearchScreen = () => {

    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const getContent = async () => {
      try {
       const response = await fetch(Content_Search_Link);
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

    return (
        <View style={styles.container}>
            <Text>Popcorn Buddies SearchScreen</Text>
            <StatusBar style="auto" />
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
    /*container: {
        flex: 1,
        backgroundColor: '#990',
        alignItems: 'center',
        justifyContent: 'center',
      },
      */
      container: {
        backgroundColor: '#EEE0CB',
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
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
});
  


export default SearchScreen;