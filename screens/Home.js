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
  TextInput, Pressable ,
  ActivityIndicator, Modal, _ScrollView
} from "react-native";
import filter from "lodash.filter";
import { COLORS, FONTS, SIZES } from "../constants";
import { useFonts } from "expo-font";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from "react-navigation";
import axios from "axios";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';





const Home = ({ navigation }) => {
  const Stack =  createBottomTabNavigator();
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [fullData, setFullData] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [error, setError] = useState(null);
  const Tab = createBottomTabNavigator();
  useEffect(() => {
   axios
      .get("http://10.0.2.2:3000/posts")
      .then((res) => {
        setPosts(res.data);
        setFullData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(fullData, (user) => {
      return contains(user, formattedQuery);
    });
    setPosts(filteredData);
    setQuery(text);
  };

  const contains = ({ Name, Department }, query) => {
    const first = Name;

    if (first.includes(query) || Department.includes(query)) {
      return true;
    }

    return false;
  };

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18 }}>
          Error fetching data... Check your network connection!
        </Text>
      </View>
    );
  }

  function renderHeader() {
    return (

      
      <View
        style={{
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 10,
          borderRadius: 20,
        }}
      >
        
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          onChangeText={(queryText) => handleSearch(queryText)}
          placeholder="Search"
          style={{ backgroundColor: "#fff", paddingHorizontal: 20 }}
        />



      </View>
    
  
      
    );
  }

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
    title: "Home",
  };

  return (
    
    
    // after installing all again the error gain and take care delete these line we will add later too
    //we will now run our app lets continue
    //we will try to install our react navigation again to slove this error

    
    
    <SafeAreaView style={{ flex: 1, backgroundColor: "21130d" }}>
      
 
      <View style={styles.container}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View><Text style={{...FONTS.h1}}>Job Description</Text></View>
            <View style={{marginTop:10 , marginBottom:40}}>
            <Text style={{...FONTS.h3}}>Headquartered in Helsinki with offices in Berlin</Text>
            <Text style={{...FONTS.h3}}>Toronto, Aiven provides managed open-source data</Text>
            <Text style={{...FONTS.h3}}> technologies, such as PostgreSQL , Kafka and M3</Text>
            <Text style={{...FONTS.h3}}> on all major clouds</Text>
            </View>

            <View><Text style={{...FONTS.h2}}>Requirements:</Text></View>
            <View style={{marginTop:10 , marginBottom:40}}>
            <Text style={{...FONTS.h3}}>Strong programming skills in JavaScript (React)</Text>
            <Text style={{...FONTS.h3}}>Understanding of static typing</Text>
            <Text style={{...FONTS.h3}}>Good knowledge of Linux</Text>
            <Text style={{...FONTS.h3}}>Fluency in English, verbal and written</Text>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Go Back</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={{marginTop:50}} ><Text style={{...FONTS.h1}}>Jobs</Text></View>
        <FlatList
          ListHeaderComponent={renderHeader}
          data={posts}
          keyExtractor={(item) => item.Name}
          renderItem={({ item }) => (
          
            <Pressable onPress={() => setModalVisible(true)}>
              
            <ScrollView style={styles.listItem}>

              <Text style={styles.listItemText}>Name:{item.Name}</Text>
              <Text style={styles.listItemText}>Department:{item.Department}</Text>
              <Text style={styles.listItemText}>Mobile:{item.Mobile}</Text>
              <Text style={styles.listItemText}>Number of Days:{item.Days}</Text>
              <Text style={styles.listItemText}>Start Date:{item.StartDate}</Text>
            </ScrollView>
            </Pressable>
          )}
        />
      </View>
  

    </SafeAreaView>
  );
};

//we will make our styles like css for our home page now

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  buttonContainer3: {
    width: 330,
    height: 55,
    backgroundColor: "#4167b2",
    marginLeft: -150,
    marginTop: 30,
    borderRadius: 4,
  },

  listItem: {
    marginTop: 10,
    padding: 20,
   
    backgroundColor: "#fff",
    width: "100%",
  },
  listItemText: {
    fontSize: 18,
  },

  content: {
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    width:750 ,
    height:750,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  } ,



});

export default Home;
