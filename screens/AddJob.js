import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Modal , Pressable
} from "react-native";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import { useFormik } from "formik";
import { Picker } from "@react-native-community/picker";
import * as yup from "yup";
import { useFonts } from "expo-font";

import { GenralStyles } from "../styles/GenralStyles";
import { FONTS } from "../constants";

const reviewSchema = yup.object({
  Name: yup.string().required().min(4),
  
  Days: yup
    .string()
    .required()
    .test("is-num-0-9", "Number must be number from 0-9", (val) => {
      return parseInt(val) < 10 && parseInt(val) > 0;
    }),
});
const AddJob = ({ navigation }) => {
  const Item = Picker.Item;
  const [modalVisible, setModalVisible] = useState(false);
  const Department = [
    { name: "a", id: 1 },
    { name: "ab", id: 2 },
    { name: "abc", id: 3 },
  ];

  const formik = useFormik({
    initialValues: { Department: "" },
  });
  

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

    
    <View style={GenralStyles.container}>
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
            <Text style={{...FONTS.h3}}> New Job Has beedn Added Successfully</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Formik
        initialValues={{ Name: "", Department: "", Mobile: "", Days: "" }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {

        axios.post('http://10.0.2.2:3000/posts/',
        {
          'Name':values.Name ,
          'Department':values.Department ,
          'Mobile':values.Mobile ,
          'Days':parseInt(values.Days) ,
         
        }
        
        )
            .then(function (response) {
             console.log('done');
             setModalVisible(true);
            }).catch(err => {
              Alert.alert('An error occurred!', err.message,
            [{ text: 'Okay' }]);})

          console.log(values);
          actions.resetForm();
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={GenralStyles.input}
              placeholder="Name"
              onChangeText={props.handleChange("Name")}
              value={props.values.Name}
              onBlur={props.handleBlur('Name')}
            />
            <Text style={GenralStyles.errorText}>{ props.touched.Name &&props.errors.Name}</Text>

            <Text style={GenralStyles.input2}>Department</Text>
            <Picker
              style={{ height: 50, width: 100 }} // <-----
              testID="basic-picker"
              selectedValue={props.values.Department}
              onValueChange={props.handleChange("Department")}
            >
              <Item label="a" value="a" />
              <Item label="ab" value="ab" />
              <Item label="abc" value="abc" />
            </Picker>

            <TextInput
              style={GenralStyles.input}
              placeholder="Mobile"
              onChangeText={props.handleChange("Mobile")}
              value={props.values.Mobile}
            />
            <TextInput
              style={GenralStyles.input}
              placeholder="Days"
              onChangeText={props.handleChange("Days")}
              value={props.values.Days}
              
              onBlur={props.handleBlur('Days')}
            />
             <Text style={GenralStyles.errorText}>{props.touched.Days && props.errors.Days}</Text>
            <Button
              title="submit"
              color="blue"
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

//we will make our styles like css for our home page now

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 100,
    height: 100,
    marginLeft: 140,
    marginTop: 320,
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
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
});

export default AddJob;
