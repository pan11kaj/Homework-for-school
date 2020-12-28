import React, { Component } from 'react';
import {View,Text,Modal, TextInput,TouchableOpacity,StyleSheet, ScrollView,Alert,Image } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import CheckHomeWork from '../TeachersScreen/CheckHomeWork';
import UploadHomeWork from '../TeachersScreen/UploadHomeWork';

export const TeacherNavigator = createBottomTabNavigator({
    checkaHomeWork:{screen:CheckHomeWork
    ,
    navigationOptions:{
        tabBarIcon:<Image source={require('../assets/check.jpg')} style={{width:50,height:50}} />
       
    }
    },
    UploadHomeWork:{screen:UploadHomeWork
        ,
        navigationOptions:{
            tabBarIcon:<Image source={require('../assets/upload.jpg')} style={{width:50,height:50}} />
            
        }}
})
export default TeacherNavigator;