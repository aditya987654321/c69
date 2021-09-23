import React from 'react';
import { View } from "react-native";
import TransactionScreen from './screens/TransactionScreen';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';



export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  } 
}

const TabNavigator=createBottomTabNavigator({
  Barcode:{screen:TransactionScreen},

})


const AppContainer = createAppContainer(TabNavigator)
