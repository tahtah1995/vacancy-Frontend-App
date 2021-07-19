import React  from 'react';
import{ View , Text , SafeAreaView,TouchableOpacity , Image , ScrollView,FlatList,StyleSheet} from 'react-native';
import {useFonts} from 'expo-font';
import { NavigationContainer , DefaultTheme} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer} from 'react-navigation'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import DeleteJob from './screens/DeleteJob'
import Home from './screens/Home';
import  AddJob from './screens/AddJob';



import {COLORS,FONTS,SIZES} from './constants'
//we will now begin setting our theme

const theme ={

  ...DefaultTheme ,
  colors:{
    ...DefaultTheme.colors,
    border:"transparent"
  }
}


const Tab = createBottomTabNavigator();

function App({navigation}){

 const [loaded] = useFonts({
  "Roboto-Black" : require('./assets/fonts/Roboto-Black.ttf'),
  "Roboto-Bold" : require('./assets/fonts/Roboto-Bold.ttf'),
  "Roboto-Regular" : require('./assets/fonts/Roboto-Regular.ttf'),
"Uninsta-ExtraBold" : require('./assets/fonts/Uninsta-ExtraBold.ttf'),
"Nutmeg-Bold" : require('./assets/fonts/Nutmeg-Bold.ttf') ,
"Uninsta-Bold" : require('./assets/fonts/Uninsta-Bold.ttf')

 } )

 if(!loaded){
   return null;
 }
 return(
<NavigationContainer>
  <Tab.Navigator
  tabBarOptions={{
    showLabel:false ,
    style:{
position:'absolute',
bottom:25 ,
left:20 ,
right:20 ,
elevation:0 ,
backgroundColor:'#ffffff' ,
borderRadius:15 ,
height:90 ,
...styles.shadow
    }
  }}
  
  >
  <Tab.Screen name="Home" component={Home} options={{
    tabBarIcon: ({focused}) =>(
      <View style={{
        alignItems:'center' ,
        justifyContent:'center' ,
        top:10
      }}>
        <Image source = {require('./assets/icons/Home.png')} 
        resizeMode='contain'
        style={{
          width:25 ,
          height:25 ,
          tintColor: focused ? '#e32f45' : '#748c94'
        }}
        />
        <Text style={{color:focused  ? '#e32f45' : '#748c94' , fontSize:12}}>Home</Text>
      </View>
    )
  }} />
  <Tab.Screen name="AddJob" component={AddJob} options={{
    tabBarIcon: ({focused}) =>(
      <View style={{
        alignItems:'center' ,
        justifyContent:'center' ,
        top:10
      }}>
        <Image source = {require('./assets/icons/Add.png')} 
        resizeMode='contain'
        style={{
          width:25 ,
          height:25 ,
          tintColor: focused ? '#e32f45' : '#748c94'
        }}
        />
        <Text style={{color:focused  ? '#e32f45' : '#748c94' , fontSize:12}}>Add JOB</Text>
      </View>
    )
  }}/>
  <Tab.Screen name="DeleteJob" component={DeleteJob}  


options={{
  tabBarIcon: ({focused}) =>(
    <View style={{
      alignItems:'center' ,
      justifyContent:'center' ,
      top:10
    }}>
      <Image source = {require('./assets/icons/Delete.png')} 
      resizeMode='contain'
      style={{
        width:25 ,
        height:25 ,
        tintColor: focused ? '#e32f45' : '#748c94'
      }}
      />
      <Text style={{color:focused  ? '#e32f45' : '#748c94' , fontSize:12}}>Delete JOB</Text>
    </View>
  )
}}
  />
</Tab.Navigator>
</NavigationContainer>
 

 );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow:{
shadowColor:'#7F5DF0' ,
shadowOffset:{
width:0 ,
height:10 ,
} ,
shadowOpacity:0.25 ,
shadowRadius:3.5 ,
elevation:5 
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

export default App;




