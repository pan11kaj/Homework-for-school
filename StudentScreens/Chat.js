import React, { Component } from 'react';
import {View,Text,Modal, TextInput,TouchableOpacity,StyleSheet, ScrollView,Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../MyHeader';
import { Header ,Icon} from 'react-native-elements';
export default class AllChat extends Component{
constructor(){
    super();
    this.state={
        email:firebase.auth().currentUser.email,teacher_email:''
        ,subject:'',doubt:'',studentname:''
    }
}
getstudentDetails=()=>{
db.collection('students').where('email','==',this.state.email).get()
.then(snapshot=>{
    snapshot.forEach(doc=>{
        this.setState({
          studentname:doc.data().name
        })
    })
})
}

addDoubt=()=>{
    if(this.state.teacher_email === ''){
        Alert.alert('please enter your teachers email')
    }
    if(this.state.doubt === ''){
        Alert.alert('please enter your doubt')
    }    
    if(this.state.subject === ''){
        Alert.alert('please enter Subject')
    }
    if(this.state.teacher_email !== '' && this.state.subject!== '' && this.state.doubt !== ''){
        db.collection('all_doubts').add({
            'doubt':this.state.doubt,
            'student_name':this.state.studentname,
            'student_email':this.state.email,
            'subject':this.state.subject,
            'teacher_email':this.state.teacher_email,
            'date':firebase.firestore.FieldValue.serverTimestamp(),
            'solution':'no'
        })
        this.setState({
            teacher_email:''
            ,subject:'',doubt:''
        })
        return Alert.alert('doubt added succesfully!! your teacher replied in 2 hour')
    }else{
        Alert.alert('please enter your query')
    }
  
}
componentDidMount(){
this.getstudentDetails()
}
    render(){
        return(
            <View style={{backgroundColor:'cyan',flex:1}}>
            <View>
            <Header
           centerComponent={{
               text:"Query with teacher"
               ,style:{fontSize:23,color:'#ffffff'}
           }}
            />
            </View>
            <View style={{alignItems:'center',justifyContent:'center'}}>
             <TextInput
             placeholder="enter Subject"
            onChangeText={text=>{this.setState({subject:text})}}
            style={{textAlign:'center',fontSize:17,height:40,width:200,justifyContent:'center',borderWidth:3,borderColor:'red',marginTop:20,backgroundColor:'orange'}}
           value={this.state.subject}
           />
               <TextInput
             placeholder="enter teacher-email"
             keyboardType={'email-address'}
            onChangeText={text=>{this.setState({teacher_email:text})}}
            style={{textAlign:'center',width:200,fontSize:17,height:40,justifyContent:'center',borderWidth:3,borderColor:'red',marginTop:20,backgroundColor:'orange'}}
            value={this.state.teacher_email}
             />
                <TextInput
             placeholder="enter your doubt"
             multiline
            onChangeText={text=>{this.setState({doubt:text})}}
            style={{textAlign:'center',width:200,borderRadius:100,fontSize:17,height:80,justifyContent:'center',borderWidth:3,borderColor:'red',marginTop:20,backgroundColor:'orange'}}
            value={this.state.doubt}
            />
             <TouchableOpacity style={{borderRadius:50,width:140,borderColor:'orange',borderWidth:3,backgroundColor:'red',marginTop:30}}
             onPress={()=>{this.addDoubt()}}>
                 <Text style={{fontSize:20,color:'yellow'}}>
                     ok ask doubt!
                 </Text>
             </TouchableOpacity>
            </View>
            </View>
        )
    }
}