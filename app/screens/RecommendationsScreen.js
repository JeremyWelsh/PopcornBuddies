import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from "react-native";
import {auth, db} from '../../firebase'
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements/dist/image/Image';
import colours from '../config/colours';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Rating } from 'react-native-elements';

const Image_Link = "https://image.tmdb.org/t/p/w200";

const RecommendationsScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(true); 
    const [reviews, setReviews] = useState([]); 

    function compareRating( a, b ) {
        if ( a.rating > b.rating ){return -1;}
        if ( a.rating < b.rating ){return 1;}
        return 0;
      }
      useEffect(() => {
        const subscriber = db.collection('users').doc(auth.currentUser.uid).collection('buddies').onSnapshot(snapshot => {
            const reviews = [];
            snapshot.forEach(doc => {
                console.log(doc.id + "USER");
                const reviewSub = db.collection('users').doc(doc.id).collection('reviews').onSnapshot(snapshotRev => {
                    snapshotRev.forEach(docRev => {
                        reviews.push({
                            ...docRev.data(),
                            key: docRev.id,
                        });
                        console.log(reviews)
                    });
                });
            }); 
            return () => reviewSub();
            setReviews(reviews);
            setLoading(false);
        });
        return () => subscriber();
      }, []);


      const renderItem = ({ item }) => {
        return(
            <View style={[styles.item]}>
                <View style={{alignItems:'flex-start', flex:1, paddingRight:15}}>
                    <Text style={styles.title}>{item.cName}</Text>
                    <Rating imageSize={20}
                        type= "custom"
                        readonly 
                        startingValue={item.rating/2}
                        ratingColor="#fff"
                        tintColor="#95D7AE"
                        ratingBackgroundColor= "#000"/>
                    <Text style={styles.extrainfo}>Year: {item.cYear}</Text>
                    <Text style={styles.extrainfo}>Content Type: {item.type}</Text>
                    <Text style={styles.extrainfo}>Comment: {item.comment}</Text>
                </View>
                <Image source={item.poster?{ uri: `${Image_Link+item.poster}`}:null} style={{width:125, height: 180,}}/>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text>Popcorn Buddies RecommendationsScreen</Text>
            <StatusBar style="auto" />
            {isLoading ? <ActivityIndicator ActivityIndicator animating size='large' color="#000" /> : (
            <FlatList
            data={reviews}
            renderItem={renderItem}
        />
            )}
        </View>

    );
  } 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colours.primary,
        justifyContent: 'center',
      },
      button: {
        width: 350,
        marginTop: 5,
        backgroundColor: '#19323C',
    },item: {
        backgroundColor: '#67eec5',
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
})



export default RecommendationsScreen;