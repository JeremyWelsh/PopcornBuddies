import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity  } from "react-native";
import { auth, db } from "../../firebase.js";
import { Button, SearchBar, Input } from 'react-native-elements';
import colours from '../config/colours';

const Content_Search_Link = "https://api.themoviedb.org/3/search/multi?api_key=2ba045feca37e46db2c792c05da251f5&language=en-US&query=";



const AddReviewScreen = ({navigation}) => {

    const[contentId, setContentID] = useState("");
    const[rating, setRating] = useState("");
    const[comment, setComment] = useState("");
    const[search, setSearch] = useState("");
    const[isLoading, setLoading] = useState(true);
    const[content, setContent] = useState([]);

    const addReview = () => {
        db.collection("users")
        .doc(auth.currentUser.uid)
        .collection("reviews")
        .set(contentId,rating,comment)
    };

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
      const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>  
            <Text style={[styles.title, textColor]}>{item.title || item.name}</Text>
            <Text style={[styles.extrainfo, textColor]}>Released: {(item.release_date||item.first_air_date)? item.release_date||item.first_air_date:"No date provided"}</Text>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            <Text>Popcorn Buddies AddReviewScreen</Text>
            <StatusBar style="auto" />
            <SearchBar
                    placeholder="Search"
                    autoFocus
                    value={search}
                    onChangeText={(text)=>setSearch(text)}
                    lightTheme="true"
              />
            <Button containerStyle={styles.button} title="Search" onPress={getContent} />


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
            <View style={styles.inputView}>
            <Input
                    placeholder="comment"
                    autoFocus
                    type="comment"
                    value={comment}
                    onChangeText={(text)=>setComment(text)}
                />
               
            </View>
        </View>

    );
  } 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#606",
        justifyContent: 'center',
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
        backgroundColor: '#19323C',
      },
      searchBox: {
        //padding: 5,
        //alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: '#029420'
      },
})



export default AddReviewScreen;