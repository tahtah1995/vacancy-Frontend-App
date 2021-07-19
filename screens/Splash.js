import React, { useState, useEffect } from "react";
import Button from "react-native-flat-button";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import { useFonts } from "expo-font";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from "react-navigation";
import Home from '../screens/Home';
import { NavigationActions } from "react-navigation";

const Splash = ({navigation}) => {
  useEffect(()=>{
    setTimeout( () => {
      navigation.navigate('Home');
    }, 3000 );

}, []);


  const [loaded] = useFonts({
    "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Uninsta-ExtraBold": require("../assets/fonts/Uninsta-ExtraBold.ttf"),
    "Nutmeg-Bold": require("../assets/fonts/Nutmeg-Bold.ttf"),
    "Uninsta-Bold": require("../assets/fonts/Uninsta-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  navigationOptions = {
    title: "Splash",
  };
 

  return (
    // after installing all again the error gain and take care delete these line we will add later too
    //we will now run our app lets continue
    //we will try to install our react navigation again to slove this error
    <SafeAreaView style={{ flex: 1, backgroundColor: "#00aef3" }}>
     
     <Image source={require('../assets/images/link.png')}  style={styles.image} />
 
    </SafeAreaView>
  );

    
  
};

//we will make our styles like css for our home page now

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  image:{
width:100 ,
height:100 , 
marginLeft:140 ,
marginTop:320

  },
  buttonContainer: {
    width: 330,
    height: 55,
    backgroundColor: "#03CF64",
    marginLeft: 30,
    marginTop: 90,
    borderRadius: 4,
  },

  buttonContainer2: {
    width: 330,
    height: 55,
    backgroundColor: "#ffffff",
    marginLeft: -150,
    marginTop: 20,
    borderRadius: 4,
  },

  buttonContainer3: {
    width: 330,
    height: 55,
    backgroundColor: "#4167b2",
    marginLeft: -150,
    marginTop: 30,
    borderRadius: 4,
  },

  content: {
    fontSize: 18,
  },
});

export default Splash;
