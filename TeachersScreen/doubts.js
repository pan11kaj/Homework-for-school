import React, { Component } from 'react';
import {View,Text,Modal, TextInput,TouchableOpacity,StyleSheet, ScrollView,Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../MyHeader';
import { Header, Icon, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { block } from 'react-native-reanimated';

export default class DoubtScreen extends React.Component{
constructor(){
    super();
    this.state={
        email:firebase.auth().currentUser.email,
      doubt:[],givef:'',student_email:'',subject:'',docid:''
    }
    this.ref=  null;
    console.log(this.state.docid)
}
getDoubts=()=>{
    db.collection("all_doubts").where('teacher_email','==',this.state.email)
    .onSnapshot(snap=>{
        var data = snap.docs.map(doc=>doc.data())
        var em = snap.docs.map(doc=>doc.data().student_email)
        var sub = snap.docs.map(doc=>doc.data().subject)
        console.log(data)
        this.setState({
            doubt:data,
            student_email:em,
            subject:sub
        })
    })
}
sendSolution=()=>{
   if(this.state.givef ===''){
       Alert.alert('please enter solution')
   }else{
       db.collection('solutions').add({
           'teacher_email':this.state.email,
            'respone':this.state.givef,
           'date':firebase.firestore.FieldValue.serverTimestamp(),
           'student_email':this.state.student_email,
        'subject':this.state.subject
       })
       db.collection('all_doubts').doc(this.state.docid).update({
           "isread":'yes',
           "solution":'yes'
       })
    
    //    Alert.alert('feedback provided')
   }
}
key =(item,i)=>i.toString()
renderItem=({item,i})=>{
    return(
        <ListItem
        key={i}
        title={"student:-"+item.student_name}
        subtitle={"doubtis:-"+item.doubt}
        titleStyle={{fontSize:20,fontWeight:'bold'}}
        rightElement={
            <TextInput placeholder="enter feedback" 
            onChangeText={text=>{this.setState({givef:text})}} 
            style={{borderWidth:2,borderColor:'red',width:100,marginLeft:-70}}
            value={this.state.givef} />}
            leftElement={  <TouchableOpacity style={{backgroundColor:'red'}} onPress={()=>{this.sendSolution()}}><Text style={{color:'#ffff'}}>give feedback</Text></TouchableOpacity>}
        bottomDivider
        
        />
    )
}
componentDidMount(){
    this.getDoubts()
    db.collection('all_doubts').where('teacher_email','==',this.state.email).get()
    .then(doc=>{
        doc.docs.map(doc=>{
            this.setState({
                docid:doc.id
            })
        })
    })
}
    render(){
        return(
            <View>
                <MyHeader
                title="students Doubts"
                />
                <View>
                
                {
                    this.state.doubt.length === 0?(
                    <View style={{alignItems:'center'}}>
                        <Text style={{fontSize:21,color:'pink'}}>
                            no any queryies
                        </Text>
           </View>
                    ):(
                        <FlatList
                        keyExtractor={this.key}
                        data={this.state.doubt}
                        renderItem={this.renderItem}
                        />
                    )
                }
                </View>
            </View>
        )
    }
}