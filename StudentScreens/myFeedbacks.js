import React, { Component } from 'react';
import {View,Text,Modal, TextInput,TouchableOpacity,StyleSheet, ScrollView,Alert,FlatList,} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../MyHeader';
import { Header, Icon, ListItem  } from 'react-native-elements';
import { Image } from 'react-native';
import SwipeableFlatlist from '../components/SwipeAbleFlatlist';

export default class MyFeedbacks extends Component{
constructor(props){
    super(props);
    this.state={
        email:[firebase.auth().currentUser.email],
        feedbackdetails:[]
    }
}
getfeedbacks=()=>{
    db.collection('all_feedback').where('send_to','==',this.state.email)
    .onSnapshot(snapshot=>{
       var fetch = snapshot.docs.map(doc=>doc.data())
        this.setState({
        feedbackdetails:fetch
        })
     
    })
}
componentDidMount(){
    this.getfeedbacks()
}
    render(){
        return(
            <View>
                <Header
               centerComponent={{
                   text:'feed backs'
                   ,style:{fontSize:20,color:'#ffff'}
                   
               }}
               leftComponent={<Icon name="arrow-left" type="font-awesome" onPress={()=>this.props.navigation.navigate('home')}/>}
               
               />
              <View>
                  {
                      this.state.feedbackdetails.length ===0?(
                         <Text>you have no feedbacks </Text>
                      ):(
                          <SwipeableFlatlist  />
                      )
                  }
              </View>
            </View>
        )
    }
}