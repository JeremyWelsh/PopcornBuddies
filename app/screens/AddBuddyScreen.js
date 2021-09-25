import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from "react-native";
import {auth, db} from '../../firebase'
import { ActivityIndicator } from 'react-native';
import colours from '../config/colours';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';


const AddBuddyScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(true); 
    const [buddies, setBuddies] = useState([]); 

    const addBuddy = async (buddyid, name) => {
      try {
        await db.collection("users")
        .doc(auth.currentUser.uid)
        .collection("buddies")
        .doc(buddyid)
        .set({
          bId : buddyid,
          bName : name
        })
        alert("Added "+name+" as a Buddy");
      }catch (error) {
        console.error(error);
       } 

    };

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

      //<Text style={styles.email}>{item.email}</Text>
      //style={{alignItems:"column"}}
      const renderItem = ({ item }) => {
          return(
            <View style={styles.item}>
              <View >
                <Text style={styles.name}>{item.buddyName}</Text>
                <Text>{item.email}</Text>
            </View>
            <Button containerStyle={styles.button} title="Add Buddy" onPress={()=>{addBuddy(item.key, item.buddyName)}} />
            </View>
          );
      };
    return (
        <View style={styles.container}>
            <Text>Popcorn Buddies AddBuddyScreen</Text>
            <StatusBar style="auto" />
            {isLoading ? <ActivityIndicator ActivityIndicator animating size='large' color="#000" /> : (
            <FlatList
                data={buddies}
                renderItem={renderItem}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
                windowSize={5}
            />
            )}
        </View>

        );
  } 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#066',
        justifyContent: 'center',
      },
      item: {
        backgroundColor:'#46f21e',
        alignItems:'flex-start', 
        justifyContent: 'space-between',
        flex:1, 
        padding: 15,
        marginVertical: 7,
        marginHorizontal: 10,
        flexDirection: 'row',
      },
      name: {
        fontWeight: 'bold',
        fontSize: 18,
      },
      email: {
        fontWeight: 'normal',
        fontSize: 15,
      },
      button: {
        alignSelf:'flex-end',
        color:'#000'
      }
      
})



export default AddBuddyScreen;