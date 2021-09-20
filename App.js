import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs, TransitionPresets } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import RecommendationsScreen from './app/screens/RecommendationsScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import AddReviewScreen from './app/screens/AddReviewScreen';
import BuddyScreen from './app/screens/BuddyScreen';
import SearchScreen from './app/screens/SearchScreen';
import LoginScreen from './app/screens/auth/LoginScreen';
import RegisterScreen from './app/screens/auth/RegisterScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//const MOVIE_SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=2ba045feca37e46db2c792c05da251f5&query=";
/*
const tabScreenStyle = {
  headerStyle: { backgroundColor: "#900" }, // header colour
  headerTitleStyle: { color: "blue" }, // title will be blue
  headerTintColor: "white", // any icons will be white in header
};
*/
const headerOptions = {
  headerStyle: {
    backgroundColor: '#17BEBB',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName={"Recommendations"}>
      <Tab.Screen name="Recommendations" component={RecommendationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Add" component={AddReviewScreen} />
      <Tab.Screen name="Buddies" component={BuddyScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={"Login"} screenOptions={headerOptions}>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Register" component={RegisterScreen}/>
          <Stack.Screen name="MainTabNavigator" component={MyTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

