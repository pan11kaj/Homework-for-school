import React, { Component } from 'react';
import {View,Text,Modal,TextInput , TouchableOpacity ,Alert} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../MyHeader';
import { ListItem } from 'react-native-elements';

export default class UploadHomeWork extends Component{
constructor(){
    super();
    this.state={
        class:'',subject:'',que1:'',que2:'',que3:'',email:firebase.auth().currentUser.email
    }
}
UploadHW=()=>{
  
    if(this.state.class ==='' || this.state.subject ===''){
       Alert.alert('please fill the basic information')
    }else{
        Alert.alert('Home Work Uploaded')
        db.collection('all_homeworks').add({
            'class':this.state.class,
            'subject':this.state.subject,
            'question_1':this.state.que1,
            'question_2':this.state.que2,
            'question_3':this.state.que3,
             'uploader_email':this.state.email
        })
        this.setState({class:'',subject:'',que1:'',que2:'',que3:''})
    }

}


    render(){
        return(
            <View>
            <View>
                <MyHeader 
                title="upload Home-work"/>
            </View>
            <View style={{flex:1,alignItems:'center',marginTop:40}}>
            <Text style={{backgroundColor:'cyan',justifyContent:'center',alignItems:'center'}}>Upload by Writting </Text>
            <TextInput
            placeholder="class"
            keyboardType={'numeric'}
            maxLength={5}
            onChangeText={text=>{this.setState({class:text})}}
            style={{width:200,borderColor:'red',borderWidth:2,borderRadius:40,height:40,marginTop:20,textAlign:'center'}}
           value={this.state.class}
           />
               <TextInput
            placeholder="subject"
            maxLength={10}
            onChangeText={text=>{this.setState({subject:text})}}
            style={{width:200,borderColor:'red',borderWidth:2,borderRadius:40,height:40,marginTop:20,textAlign:'center'}}
            value={this.state.subject}
           />
            <Text>type Questions here maximum 3:--</Text>
            
            <TextInput
            placeholder="Question 1:-"
           multiline
            onChangeText={text=>{this.setState({que1:text})}}
            style={{width:200,borderColor:'red',borderWidth:2,height:60,marginTop:20,textAlign:'center'}}
            value={this.state.que1}
           />  
             <TextInput
            placeholder="Question 2:-"
           multiline
            onChangeText={text=>{this.setState({que2:text})}}
            style={{width:200,borderColor:'red',borderWidth:2,height:60,marginTop:20,textAlign:'center'}}
            value={this.state.que2}
           />
               <TextInput
            placeholder="Question 3:-"
           multiline
            onChangeText={text=>{this.setState({que3:text})}}
            style={{width:200,borderColor:'red',borderWidth:2,height:60,marginTop:20,textAlign:'center'}}
            value={this.state.que3}
            />
            <TouchableOpacity style={{justifyContent:'center',borderRadius:40,borderWidth:2,backgroundColor:'green',marginTop:20,height:40}}
            onPress={()=>{this.UploadHW()}}
            >
           <Text style={{color:'cyan'}}>
               Upload Home Work
           </Text>
            </TouchableOpacity>
            </View>
            </View>
        )
    }
}