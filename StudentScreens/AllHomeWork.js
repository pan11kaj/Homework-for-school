import React, { Component } from 'react';
import {View,Text,Modal, TextInput,TouchableOpacity,StyleSheet, ScrollView,Alert,FlatList} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../MyHeader';
import { Icon, ListItem,Header,Badge  } from 'react-native-elements';
export default class HomeWorks extends Component{
    constructor(props){
        super(props);
        this.state={
        allDetails:[],gd:'',section:'',studentName:'',email:firebase.auth().currentUser.email,value:'',
        mainemail:[firebase.auth().currentUser.email]
        }
        this.requestRef = null
    }
    getStudentDetails(){
        db.collection('students').where('email','==',this.state.email)
        .onSnapshot((snapshot)=>{
      snapshot.docs.map(doc=>{
        this.setState({
            gd:doc.data().grade
            
            })
      })})

         
    }
getHW =()=>{
    this.requestRef = db.collection("all_homeworks")
    .onSnapshot((snapshot)=>{
      var requestedBooksList = snapshot.docs.map((doc) => doc.data())
      this.setState({
        allDetails :requestedBooksList
      });
      
    })  
  }
componentDidMount(){
this.getHW()
this.getStudentDetails()
this.getNumberOfUnreadNotifications()
}
getNumberOfUnreadNotifications(){
  db.collection('all_feedback')
 .where('isread','==','no')
 .where('send_to','==',this.state.mainemail)
  .onSnapshot((snapshot)=>{
    var unreadNotifications = snapshot.docs.map((doc) => doc.data())
    this.setState({
      value: unreadNotifications.length
    })
  })
}
 BellIconWithBadge=()=>{
    return(
      <View>
        <Icon name='bell' type='font-awesome' color='#696969' size={25}
          onPress={() =>this.props.navigation.navigate('feedback')}/>
         <Badge
          value={this.state.value}
         containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
      </View>
    )
  }

keyExtractor=(item,index)=>index.toString()
renderItem=({item,index})=>{
    return(
        <ListItem
        key={index}
        title={item.class}
        subtitle={item.subject}
        titleStyle={{color:'red',fontSize:20,marginTop:20}}
        leftAvatar={<Icon name="book" type="font-awesome" />}
        rightElement={<TouchableOpacity style={{borderWidth:2,borderColor:'red'}}onPress={()=>this.props.navigation.navigate('homework')}><Text>do homework</Text></TouchableOpacity>}
        bottomDivider
    
        />
    )
}


    render(){
        return(
   
    <View style={{flex:1,marginTop:20}}>
        <View>
     <Header 
     centerComponent={{text:"all homeworks",style:{color:'red',backgroundColor:'yellow',fontSize:19}}}
     leftComponent={<Icon name="bars" type="font-awesome" onPress={()=>this.props.navigation.toggleDrawer()}  />}
     rightComponent={<this.BellIconWithBadge {...this.props}/>}
     />
        
        </View>
      
        <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allDetails}
                renderItem={this.renderItem}
              />
        </View>
    
        )
    }
}