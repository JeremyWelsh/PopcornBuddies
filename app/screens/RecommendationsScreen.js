import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, RefreshControlBase, StyleSheet, Text, View } from "react-native";
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
    const [refresh, setRefresh] = useState(""); 
    const [buddies, setBuddies] = useState([]); 

    function compareRating( a, b ) {
        if ( a.rating > b.rating ){return -1;}
        if ( a.rating < b.rating ){return 1;}
        return 0;
      }
    


      /*
      const loadReviews = () => {
        db.collection('users').doc(auth.currentUser.uid).collection('buddies').onSnapshot(snapshot => {
          snapshot.forEach(doc => {
            //-----------------
            const buddyName = db.collection('users').doc(doc.id).get();
            if (!doc.exists) {
              //console.log('No such document!');
            } else {
              //console.log('Document data:', doc.data());
            }
            //----------------
            db.collection('users').doc(doc.id).collection('reviews').onSnapshot(snapshotRev => {
              snapshotRev.forEach(docRev => {
                console.log(docRev.data())
                reviews.push({
                  ...docRev.data(),
                  key: docRev.id,
                });  
              });
            });

          });
        });
        setLoading(false);
      }
*/
/*
setReviews([])
          console.log("WHYYYY")
          loadReviews();
          reviews.sort(compareRating);*/

          const getReviews = async () => {
            //console.log(userId)
            const querySnapshot = await db.collectionGroup('reviews').get();
            querySnapshot.forEach((doc) => {
              console.log(doc.id, ' =>  ', doc.data());
              reviews.push({
                ...doc.data(),
                key: doc.id,
              })
            });
            setLoading(false)
          }
/*
      const getReviews = async (userId) => {
        console.log(userId)
        const querySnapshot = await db.collectionGroup('reviews').where('reviewerId','==', userId).get();
        querySnapshot.forEach((doc) => {
          console.log("AJSHFIJADIOUJGFOIUDBNFGIOSDAUJBNGF")
          console.log(doc.id, ' =>      ', doc.data());
          reviews.push({
            ...doc.data(),
            key: doc.id,
          })
        });
      }
      const getBuddies = async () => {
        const querySnapshot = await db.collection('users').doc(auth.currentUser.uid).collection('buddies').get();
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
          getReviews(doc.id.toString())
        });
        setLoading(false)
      }


      */
      useEffect(() => {
        if(isLoading){  
          getReviews();
        }
      }, []);





      /* Safe but only shows own reviews like on profile
      useEffect(() => {
        const subscriber = db.collection('users').doc(auth.currentUser.uid).collection('reviews').onSnapshot(snapshot => {
            const reviews = [];
            snapshot.forEach(doc => {
              reviews.push({
                ...doc.data(),
                key: doc.id,
              });
            });
            reviews.sort(compareRating);
            setReviews(reviews);
            setLoading(false);
          });
        return () => subscriber();
      }, []);

      */

      


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
            <Button containerStyle={styles.button} title="refresh" onPress={()=>{setRefresh(" ")}} />
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