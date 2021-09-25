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
import SearchScreen from "./app/screens/SearchScreen";
import LoginScreen from "./app/screens/auth/LoginScreen";
import CreateAccountScreen from "./app/screens/auth/CreateAccountScreen";

const Buddy = createStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//const MOVIE_SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=2ba045feca37e46db2c792c05da251f5&query=";

const headerOptions = {
  headerStyle: {
    backgroundColor: "#17BEBB",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

function BuddyScreens() {
  return (
    <Buddy.Navigator initialRouteName={"Buddy"}>
      <Buddy.Screen name="Buddy" component={BuddyScreen} />
      <Buddy.Screen name="AddBuddy" component={AddBuddyScreen} />
    </Buddy.Navigator>
  );
}
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName={"Recommendations"}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      }}
    >
      <Tab.Screen name="Recommendations" component={RecommendationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Add" component={AddReviewScreen} />
      <Tab.Screen
        name="Buddies"
        component={BuddyScreens}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}

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
