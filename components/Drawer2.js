import React, { Component } from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import firebase from 'firebase';
import {Avatar,Icon} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import db from '../config';
export default class Drawer2 extends Component{
constructor(){
    super();
    this.state={
        userid:firebase.auth().currentUser.email,image:'',docId:'',name:'',studentdetails:[],details:[]
    }
}
getdetails=()=>{
  db.collection('teachers').where('email','==',this.state.userid)
  .onSnapshot(snapshot=>{
   var details= snapshot.docs.map(doc=>doc.data())
   this.setState({
     details:details
   })
  })
}
componentDidMount(){
  this.getdetails()
}
    render(){
        return(
            <View style={styles.container}>
            <View style={{backgroundColor:'blue'}}>
                <Text style={{marginTop:30,fontSize:20,color:'#ffff',textAlign:'center'}}>your details</Text>
              {
                this.state.details.map((item,index)=>{
                  return(
                    <View key={index} style={{borderBottomWidth:2}}>
                    <Text style={{fontSize:18,color:'red'}}>{"your name:-"+item.teacher}</Text>
                    <Text style={{fontSize:18,color:'red'}}>{"your id:-"+item.teacher_id}</Text>
                    <Text style={{fontSize:18,color:'red'}}>{"your email:-"+item.email}</Text>
                    </View>
                  )
                })
              }
              </View>
          <DrawerItems
          {...this.props}/>
         
         <View>
         <TouchableOpacity
            style={{alignItems:'center'}}
            onPress={() => {
              this.props.navigation.navigate("Welcome");
              firebase.auth().signOut();
            }}
          >
            <Icon
             name="logout"
             type="antdesign"
          
            />
            <Text>Log Out</Text>
          </TouchableOpacity>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          
         </View>
            </View>
        )
    }
    }
 const styles = StyleSheet.create({
     container:{flex:1,marginTop:20,backgroundColor:'orange'},buton:{width:60,backgroundColor:'yellow',marginTop:300,borderRadius:20,alignItems:'center'}
    
 })
