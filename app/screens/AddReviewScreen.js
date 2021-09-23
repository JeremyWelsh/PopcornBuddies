import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity, Keyboard  } from "react-native";
import { auth, db } from "../../firebase.js";
import { Button, SearchBar, Input, Rating } from 'react-native-elements';
import colours from '../config/colours';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Movie_Search_Link = "https://api.themoviedb.org/3/search/movie?api_key=2ba045feca37e46db2c792c05da251f5&language=en-US&query=";
const TV_Search_Link = "https://api.themoviedb.org/3/search/tv?api_key=2ba045feca37e46db2c792c05da251f5&language=en-US&query=";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>  
      <Text style={[styles.title, textColor]}>{item.title || item.name} </Text>
      <Text style={[styles.extrainfo, textColor]}>{(item.release_date||item.first_air_date)? (item.release_date||item.first_air_date).substring(0,4):"Null"}</Text>
  </TouchableOpacity>
);

const AddReviewScreen = ({navigation}) => {

    const[contentId, setContentID] = useState("");
    const[contentName, setContentName] = useState("");
    const[starRating, setRating] = useState(0);
    const[comment, setComment] = useState("");
    const[search, setSearch] = useState("");
    const[isLoading, setLoading] = useState(true);
    const[content, setContent] = useState([]);
    const[type, setType] = useState("");

    const addReview = () => {
        db.collection("users")
        .doc(auth.currentUser.uid)
        .collection("reviews")
        .set(contentId,rating,comment)
    };

    const getContentTv = async () => {
      try {
        var response = await fetch(TV_Search_Link+search);
        if(search==""){response = await fetch('https://api.themoviedb.org/3/trending/all/week?api_key=2ba045feca37e46db2c792c05da251f5');}
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
        var response = await fetch(Movie_Search_Link+search); 
        if(search==""){response = await fetch('https://api.themoviedb.org/3/trending/all/week?api_key=2ba045feca37e46db2c792c05da251f5');}
        const json = await response.json();
        setContent(json.results);
      } catch (error) {
       console.error(error);
      } finally {
       setLoading(false);
      }
    }

    useEffect(() => {
      getContentMovie();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setRating(0);
            setContentID("");
            setContentName("");
            setComment("");
            setSearch("");
            getContentMovie();
        });
        return unsubscribe;
    }, [navigation]);

    const renderItem = ({ item }) => {
        //removed for better performance
        const backgroundColor = item.id === contentId ? "#7BAE7F" : "#95D7AE";
        const color = item.id === contentId ? 'white' : 'black';
        return (
          <Item
            item={item}
            onPress={() => {setContentID(item.id), setContentName(item.title || item.name), setType(item.title?"Movie":"TV")}}
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
                    placeholder="Search"
                    autoFocus
                    value={search}
                    onChangeText={(text)=>setSearch(text)}
                    lightTheme="true"
              />
              <View style={{flexDirection:"row", backgroundColor:'#2393D9'}}>
                <Button containerStyle={styles.button} title="Search TV" onPress={getContentTv} />
                <Button containerStyle={styles.button} title="Search Movies" onPress={getContentMovie} />
              </View>
            </View>
            <View style={{height:185}}>
            {isLoading ? <ActivityIndicator ActivityIndicator animating size='large' color="#000" /> : (
            <FlatList
                data={content}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
                windowSize={5}
            />
            )}
            </View>
            <View style={styles.inputView}>
            <Text>Selected Content: {contentName} {contentId} {type} {starRating}</Text>
            <Rating
              ratingCount={5}
              imageSize={60}
              //onFinalRating={useEffect(()=>{setRating(Rating*2)},[])}
            />
            <Input
                    placeholder="comment"
                    autoFocus
                    type="comment"
                    value={comment}
                    onChangeText={(text)=>setComment(text)}
                />
               
            </View>
            </TouchableWithoutFeedback>
        </View>

    );
  } 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ee3",
        justifyContent: 'flex-start',
      },
      item: {
        paddingHorizontal: 17,
        paddingVertical: 10,
        marginVertical: 1,
        marginHorizontal: 0,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
      },
      title: {
        fontWeight: 'bold',
        fontSize: 15,
      },
      extrainfo: {
        fontSize: 15,
        alignSelf:'flex-end',
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
})



export default AddReviewScreen;