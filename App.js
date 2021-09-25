import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import RecommendationsScreen from "./app/screens/RecommendationsScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import AddReviewScreen from "./app/screens/AddReviewScreen";
import BuddyScreen from "./app/screens/BuddyScreen";
import AddBuddyScreen from "./app/screens/AddBuddyScreen";
import BuddyProfileScreen from "./app/screens/BuddyProfileScreen";
import SearchScreen from "./app/screens/SearchScreen";
import LoginScreen from "./app/screens/auth/LoginScreen";
import CreateAccountScreen from "./app/screens/auth/CreateAccountScreen";
import colours from "./app/config/colours";
const Buddy = createStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//const MOVIE_SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=2ba045feca37e46db2c792c05da251f5&query=";

// header colours and font
const headerOptions = {
  headerStyle: {
    backgroundColor: colours.jetGrey,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

// all of the screens that are tied to the buddy screen in the tab navigator
function BuddyScreens() {
  return (
    <Buddy.Navigator initialRouteName={"Buddies"} screenOptions={headerOptions}>
      <Buddy.Screen name="Buddies" component={BuddyScreen} />
      <Buddy.Screen name="Add Buddy" component={AddBuddyScreen} />
      <Buddy.Screen name="Buddy Profile" component={BuddyProfileScreen} />
    </Buddy.Navigator>
  );
}
// all the tabs to be shown in the tab navigator
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName={"PopcornBuddies"}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          {
            display: "flex",
            backgroundColor: colours.jetGrey ,

          },
          null,
        ],
        headerStyle: {
          backgroundColor: colours.jetGrey,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen name="Popcorn Buddies" component={RecommendationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Add" component={AddReviewScreen} />
      <Tab.Screen
        name="Buddy"
        component={BuddyScreens}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}

// all the screens in the navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Login"} screenOptions={headerOptions}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen
          name="MainTabNavigator"
          component={MyTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
