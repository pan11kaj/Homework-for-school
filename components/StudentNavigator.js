import React, { Component } from 'react';
import {View,Text,Modal, TextInput,TouchableOpacity,StyleSheet, ScrollView,Alert,Image } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import AllChat from '../StudentScreens/Chat';
import HomeWorks from '../StudentScreens/AllHomeWork';

export const StudentNavigator = createBottomTabNavigator({
    homeWork:{screen:HomeWorks
    ,
    navigationOptions:{
        tabBarIcon:<Image source={require('../assets/homework.png')} style={{width:50,height:50}} />
       
    }
    },
    chatWithEveryone:{screen:AllChat
        ,
        navigationOptions:{
            tabBarIcon:<Image source={require('../assets/chats.jpg')} style={{width:50,height:50}} />
            
        }}
})
