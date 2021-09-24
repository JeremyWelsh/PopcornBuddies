import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from "react-native";
import {auth, db} from '../../firebase'
import { ActivityIndicator } from 'react-native';
import colours from '../config/colours';
import { Button } from 'react-native-elements/dist/buttons/Button';

// user viewing their own profile
const ProfileScreen = ({navigation}) => {
    
    const [isLoading, setLoading] = useState(true); 
    const [reviews, setReviews] = useState([]); 


    const LogOut = () => {
        auth.signOut().then(()=>{
            navigation.replace("Login");
        })
    }

    /*
    .add({
          cID: contentId,
          cName: contentName,
          cYear: year,
          type: type,
          rating: starRating,
          comment: comment,
          poster: ppath
        })
        */
    useEffect(() => {
        const subscriber = db.collection('users').doc(auth.currentUser.uid).collection('reviews').onSnapshot(snapshot => {
            const reviews = [];
            snapshot.forEach(doc => {
              reviews.push({
                ...doc.data(),
                key: doc.id,
              });
            });
            setReviews(reviews);
            setLoading(false);
            console.log(reviews)
          });
        return () => subscriber();
      }, []);

      const renderItem = ({ item }) => {
        return(
          <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>User ID: {item.rating*2}</Text>
          <Text>User Name: {item.cName}</Text>
          </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text>Popcorn Buddies ProfileScreen</Text>
            <StatusBar style="auto" />
            {isLoading ? <ActivityIndicator ActivityIndicator animating size='large' color="#000" /> : (
            <FlatList
            data={reviews}
            renderItem={renderItem}
        />
            )}
            <Button containerStyle={styles.button} title="Log out" onPress={LogOut} />
        </View>

    );
  } 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#353',
        justifyContent: 'center',
      },
      button: {
        width: 350,
        marginTop: 5,
        backgroundColor: '#19323C',

    },
})



export default ProfileScreen;