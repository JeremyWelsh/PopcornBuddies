import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";

import colours from '../config/colours';


const CONTENT = [
    {"adult":false,"backdrop_path":"/nNmJRkg8wWnRmzQDe2FwKbPIsJV.jpg","genre_ids":[878,28,12],"id":24428,"original_language":"en","original_title":"The Avengers","overview":"When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!","popularity":160.818,"poster_path":"/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg","release_date":"2012-04-25","title":"The Avengers","video":false,"vote_average":7.7,"vote_count":25286},{"adult":false,"backdrop_path":"/fryen9fnjlm0YibKTDNGzWNBOSo.jpg","genre_ids":[53,878],"id":9320,"original_language":"en","original_title":"The Avengers","overview":"British Ministry agent John Steed, under direction from \"Mother\", investigates a diabolical plot by arch-villain Sir August de Wynter to rule the world with his weather control machine. Steed investigates the beautiful Doctor Mrs. Emma Peel, the only suspect, but simultaneously falls for her and joins forces with her to combat Sir August.","popularity":25.044,"poster_path":"/1p5thyQ4pCy876HpdvFARqJ62N9.jpg","release_date":"1998-08-13","title":"The Avengers","video":false,"vote_average":4.4,"vote_count":506},{"adult":false,"backdrop_path":null,"genre_ids":[],"id":448368,"original_language":"en","original_title":"The Avengers: A Visual Journey","overview":"Joss Whedon and others in interviews discussing the aims for this new franchise.","popularity":15.02,"poster_path":"/2kBT7KONKQTIhkMc2ZtPU11E8Ky.jpg","release_date":"2012-09-25","title":"The Avengers: A Visual Journey","video":true,"vote_average":8.2,"vote_count":10},{"adult":false,"backdrop_path":"/6zXs4OyZM6U4reYvddsJWeByxMX.jpg","genre_ids":[99],"id":448366,"original_language":"en","original_title":"Building the Dream: Assembling the Avengers","overview":"Witness Marvel's epic journey, from its comic book origins to its blockbuster film franchises, through seven exclusive featurettes. Get the inside story, with exclusive behind-the-scenes footage and cast interviews, and discover the history behind its legendary characters and films -- Iron Man, The Incredible Hulk, Iron Man 2, Thor, Captain America: The First Avenger, and Marvel's The Avengers! With over 90 minutes of original footage, this is your all-access pass to Marvel and Phase One of the Marvel Cinematic Universe!","popularity":18.403,"poster_path":"/coS6rIaucxDzq20kiJozTgQ0Nmk.jpg","release_date":"2012-09-25","title":"Building the Dream: Assembling the Avengers","video":true,"vote_average":8.6,"vote_count":20},{"adult":false,"backdrop_path":null,"genre_ids":[12],"id":432413,"original_language":"en","original_title":"The Avengers","overview":"The attractive Argentine Don Careless is an adventurer and an excellent swordsman. Don is in love with Maria Moreno, since he had to emerge her jewels and had thereby to kill a shark. Don tries to prevent the forced marriage of Mary with the ruthless revolutionary Colonel Luis Corral. An armed clash between Don and Luis seems inevitable.","popularity":1.96,"poster_path":null,"release_date":"1950-06-10","title":"The Avengers","video":false,"vote_average":10,"vote_count":1},{"adult":false,"backdrop_path":null,"genre_ids":[16,28],"id":487555,"original_language":"en","original_title":"The Avengers: Earth's Mightiest Heroes - Prelude","overview":"A 110 minute prelude to the 2010 animated series, consisting of five-and-a-half-minute chapters created from footage from season-one episodes, premiered online and on Disney XD on September 22, 2010. Series supervising producer Josh Fine said the goal was to \"let us explore the individual members of the team in their own ongoing adventures ... do a lot of character development and set the stage for the rest of the season\".","popularity":3.203,"poster_path":"/3o7MpOaDkeAcvxqEjgbIcXrcepB.jpg","release_date":"2010-09-22","title":"The Avengers: Earth's Mightiest Heroes - Prelude","video":false,"vote_average":7.5,"vote_count":2},{"adult":false,"backdrop_path":"/9tjIgkkbajG2zMI4Yk21hpttXv0.jpg","genre_ids":[28,16,10751,12,878],"id":14609,"original_language":"en","original_title":"Ultimate Avengers: The Movie","overview":"When a nuclear missile was fired at Washington in 1945, Captain America managed to detonate it in the upper atmosphere. But then he fell miles into the icy depths of the North Atlantic, where he remained lost for over sixty years. But now, with the world facing the very same evil, Captain America must rise again as our last hope for survival.","popularity":24.492,"poster_path":"/iMCkGHVrYRdqKROPRPmVaJVSlg3.jpg","release_date":"2006-02-21","title":"Ultimate Avengers: The Movie","video":false,"vote_average":6.8,"vote_count":251},{"adult":false,"backdrop_path":null,"genre_ids":[],"id":696913,"original_language":"en","original_title":"The Avengers : A Retrospective","overview":"With Patrick Macnee, Diana Rigg, Linda Thorson.","popularity":1.21,"poster_path":"/8oszZLoP1FP26HlGnuJ6kQYwfJt.jpg","release_date":"","title":"The Avengers : A Retrospective","video":true,"vote_average":0,"vote_count":0},{"adult":false,"backdrop_path":null,"genre_ids":[99],"id":448364,"original_language":"en","original_title":"The Avengers: Assembling the Ultimate Team","overview":"Joss Whedon and others in interviews discussing the aims for this new franchise.","popularity":0.731,"poster_path":null,"release_date":"2012-09-25","title":"The Avengers: Assembling the Ultimate Team","video":true,"vote_average":6.8,"vote_count":4},{"adult":false,"backdrop_path":null,"genre_ids":[10402],"id":731020,"original_language":"en","original_title":"The Avengers: Live at Target Video","overview":"Rare, live footage of The Avengers filmed in San Francisco at the Temple and the Mabuhay Gardens, 1978","popularity":0.6,"poster_path":"/rZAjKYIcFw2aXZ2Wtzyc4L5cjx6.jpg","release_date":"1978-01-01","title":"The Avengers: Live at Target Video","video":false,"vote_average":0,"vote_count":0},{"adult":false,"backdrop_path":"/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg","genre_ids":[12,878,28],"id":299534,"original_language":"en","original_title":"Avengers: Endgame","overview":"After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.","popularity":300.027,"poster_path":"/or06FN3Dka5tukK1e9sl16pB3iy.jpg","release_date":"2019-04-24","title":"Avengers: Endgame","video":false,"vote_average":8.3,"vote_count":18945},{"adult":false,"backdrop_path":"/xnqust9Li4oxfhXD5kcPi3UC8i4.jpg","genre_ids":[28,12,878],"id":99861,"original_language":"en","original_title":"Avengers: Age of Ultron","overview":"When Tony Stark tries to jumpstart a dormant peacekeeping program, things go awry and Earth’s Mightiest Heroes are put to the ultimate test as the fate of the planet hangs in the balance. As the villainous Ultron emerges, it is up to The Avengers to stop him from enacting his terrible plans, and soon uneasy alliances and unexpected action pave the way for an epic and unique global adventure.","popularity":123.674,"poster_path":"/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg","release_date":"2015-04-22","title":"Avengers: Age of Ultron","video":false,"vote_average":7.3,"vote_count":18435},{"adult":false,"backdrop_path":"/lmZFxXgJE3vgrciwuDib0N8CfQo.jpg","genre_ids":[12,28,878],"id":299536,"original_language":"en","original_title":"Avengers: Infinity War","overview":"As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.","popularity":366.566,"poster_path":"/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg","release_date":"2018-04-25","title":"Avengers: Infinity War","video":false,"vote_average":8.3,"vote_count":22561},{"adult":false,"backdrop_path":"/2lQ4jaCeIyNe03XNN2waqIOrlLS.jpg","genre_ids":[18,10752],"id":64128,"original_language":"en","original_title":"The Day Will Dawn","overview":"Horse race tipster and journalist Metcalfe is picked for the job of foreign correspondent in Norway when Hitler invades Poland. On the way to Norway his boat is attacked by a German U-Boat, however when he tells the navy about it they disbelief him and, to make matters worse, he is removed from his job. When German forces invade Norway, Metcalfe returns determined to uncover what is going on and stop the Germans in their tracks.","popularity":2.15,"poster_path":null,"release_date":"1942-06-08","title":"The Day Will Dawn","video":false,"vote_average":5.5,"vote_count":4},{"adult":false,"backdrop_path":null,"genre_ids":[28,12,35],"id":296491,"original_language":"it","original_title":"Gli invincibili tre","overview":"Ursus and his sword-wielding companions run head-on against a usurper of a throne.","popularity":1.457,"poster_path":"/bf9y5XKhYiqpUvBrGROIGrAfBRB.jpg","release_date":"1964-11-26","title":"The Three Avengers","video":false,"vote_average":0,"vote_count":0}
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
      <Text style={[styles.extrainfo, textColor]}>{item.release_date}</Text>
      <Text style={[styles.extrainfo, textColor]}>{item.vote_average}</Text>
    </TouchableOpacity>
);

const SearchScreen = () => {
    const [selectedId, setSelectedId] = useState(null);
    const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
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
            <FlatList
                data={CONTENT}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
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