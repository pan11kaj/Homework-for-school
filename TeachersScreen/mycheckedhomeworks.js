import React, { Component } from 'react';
import {View,Text,Modal, TextInput,TouchableOpacity,StyleSheet, ScrollView,Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../MyHeader';
import { Header, Icon, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

export default class CheckedHomeworks extends Component{
constructor(){
    super();
    this.state={
        email:firebase.auth().currentUser.email,allData:[]
    }
}
getchecked=()=>{
    db.collection('checked_homework').where('email','==',this.state.email)
    .onSnapshot(snapsot=>{
      var data =   snapsot.docs.map(doc=>doc.data())
      this.setState({
           allData:data
      }) 
    })
}
componentDidMount(){
    this.getchecked()
}
key=(item,i)=>i.toString()
renderItem=({item,i})=>{

    return(
        <ListItem
        key={i}
        title={"subject:-"+item.subject}
        subtitle={"student name:-"+item.student_name+'\nstudent-email:-'+item.student_email}
      
        bottomDivider
        />
       
    )
}

    render(){
        return(
            <View>
            <Header
            centerComponent={{text:'checkedhomeworks',style:{fontSize:21}}}
            leftComponent={<Icon name="arrow-left" type="font-awesome" onPress={()=>this.props.navigation.navigate('homes')} />}
            />
            <View style={{marginTop:20}}>
              <FlatList
              keyExtractor={this.key}
              data={this.state.allData}
              renderItem={this.renderItem}
              
              />
            </View>
            </View>
        )
    }
}