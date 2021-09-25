import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import { Image } from "react-native-elements/dist/image/Image";
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

// source i used to help with the tab navigator icons
// https://www.youtube.com/watch?v=gPaBicMaib4

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
      screenOptions={({ route }) => ({
        
        tabBarShowLabel: false,
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
      })}
    >
      <Tab.Screen name="Popcorn Buddies" component={RecommendationsScreen} options={{
        tabBarIcon: ({focused}) =>(
          <View style={{alignItems:'center', justifyContent:'center'}}>
            <Image source={require('./app/assets/icons/outline_view_headline_black_24dp.png')}
                  resizeMode='contain'
                  style={{width:25, height:25, tintColor: focused? colours.orange: colours.theBlue}}/>
            <Text style={{fontSize:12, color: focused? colours.orange: colours.theBlue}} >Feed</Text>
          </View>
        )
      }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: ({focused}) =>(
          <View style={{alignItems:'center', justifyContent:'center'}}>
            <Image source={require('./app/assets/icons/outline_account_circle_black_24dp.png')}
                  resizeMode='contain'
                  style={{width:25, height:25, tintColor: focused? colours.orange: colours.theBlue}}/>
            <Text style={{fontSize:12, color: focused? colours.orange: colours.theBlue}} >Profile</Text>
          </View>
        )
      }}/>
      <Tab.Screen name="Add" component={AddReviewScreen} options={{
        tabBarIcon: ({focused}) =>(
          <View style={{alignItems:'center', justifyContent:'center'}}>
            <Image source={require('./app/assets/icons/outline_rate_review_black_24dp.png')}
                  resizeMode='contain'
                  style={{width:25, height:25, tintColor: focused? colours.orange: colours.theBlue}}/>
            <Text style={{fontSize:12, color: focused? colours.orange: colours.theBlue}} >Review</Text>
          </View>
        )
      }}/>
      <Tab.Screen
        name="Buddy"
        component={BuddyScreens}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>(
            <View style={{alignItems:'center', justifyContent:'center'}}>
              <Image source={require('./app/assets/icons/outline_group_add_black_24dp.png')}
                    resizeMode='contain'
                    style={{width:25, height:25, tintColor: focused? colours.orange: colours.theBlue}}/>
              <Text style={{fontSize:12, color: focused? colours.orange: colours.theBlue}} >Buddies</Text>
            </View>
          )
        }}
      />
      <Tab.Screen name="Search" component={SearchScreen} options={{
        tabBarIcon: ({focused}) =>(
          <View style={{alignItems:'center', justifyContent:'center'}}>
            <Image source={require('./app/assets/icons/outline_live_tv_black_24dp.png')}
                  resizeMode='contain'
                  style={{width:25, height:25, tintColor: focused? colours.orange: colours.theBlue}}/>
            <Text style={{fontSize:12, color: focused? colours.orange: colours.theBlue}} >Search</Text>
          </View>
        )
      }}/>
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
