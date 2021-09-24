import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from "react-native";
import {auth, db} from '../../firebase'
import { ActivityIndicator } from 'react-native';
import colours from '../config/colours';
import { Button } from 'react-native-elements/dist/buttons/Button';

// screen where a user sees all of their buddies
const BuddyScreen = ({navigation}) => {
    const [loading, setLoading] = useState(true); 
    const [buddies, setBuddies] = useState([]); 

    /*
    const getBuddies = async () => {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }  

        snapshot.forEach(doc => {   
            console.log(doc.data().buddyName, '=>', doc.data().email);
        });
    }
*/
    useEffect(() => {
        const subscriber = db.collection('users').onSnapshot(snapshot => {
            const buddies = [];
            snapshot.forEach(doc => {
              buddies.push({
                ...doc.data(),
                key: doc.id,
              });
            });
      
            setBuddies(buddies);
            setLoading(false);
          });
        return () => subscriber();
      }, []);

      const renderItem = ({ item }) => {
          return(
            <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>User ID: {item.id}</Text>
            <Text>User Name: {item.buddyName}</Text>
            </View>
          );
      };
    return (
        <View style={styles.container}>
            <Text>Popcorn Buddies BuddyScreen</Text>
            <StatusBar style="auto" />
            
            <FlatList
                data={buddies}
                renderItem={renderItem}
            />

            <Button containerStyle={styles.button} title="Add Buddy" onPress={()=>{console.log("lol")}} />
        </View>

        );
    } 
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#909',
        alignItems: 'center',
        justifyContent: 'center',
      },
})



export default BuddyScreen;