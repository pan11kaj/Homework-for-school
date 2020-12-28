import React, { Component } from 'react';
import {View,Text,Modal, TextInput,TouchableOpacity,StyleSheet, ScrollView,Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../MyHeader';
import { Header, Icon, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

export default class SeeAnswers extends Component{
    constructor(){
        super();
        this.state={
            getHW:[],email:firebase.auth().currentUser.email,feedback:"",recieveremail:[],subject:[],name:'',sname:''
        }
        this.requestRef = null;
    }
getteachersDetails=()=>{
    db.collection('teachers').where('email','==',this.state.email)
    .onSnapshot(snapshot=>{
        snapshot.docs.map(doc=>{
            this.setState({
                name:doc.data().teacher
            })
        })
    })
}

    getAnswers=()=>{
        this.requestRef = db.collection('submitted_homeworks').where('send_homeworkto','==',this.state.email)
         .onSnapshot(snapshot=>{
          var details   =     snapshot.docs.map(doc=> doc.data())
          var email     =     snapshot.docs.map(doc=>doc.data().email)
          var sname = snapshot.docs.map(doc=>doc.data().student_name)
          this.setState({
              getHW:details,
            recieveremail:email,
         sname:sname
          })
         })
       }
    
componentDidMount(){
    this.getAnswers()
    this.getteachersDetails()
    db.collection('all_homeworks').where('uploader_email','==',this.state.email)
    .onSnapshot(snapshot=>{
        var sb   = snapshot.docs.map(doc=>doc.data().subject)
        this.setState({
            subject:sb
        })
    })
}
sendfeedback=()=>{
  if(this.state.feedback === ''){
  Alert.alert('please give feedback')
  }else{

    db.collection('all_feedback').add({
        'feedback':this.state.feedback,
        'send_to':this.state.recieveremail,
        'teacher_email':this.state.email,
        'isread':'no'
    })

    this.setState({
        feedback:''
    })
    this.props.navigation.navigate('Drawer2')
 return Alert.alert('home-work checked !!')
  }
    
}
mycheck=()=>{
    db.collection('checked_homework').add({
        'email':this.state.email,
         'subject':this.state.subject,
         'student_email':this.state.recieveremail,
         'student_name':this.state.sname
    })
}
key=(item,index)=>index.toString()
renderItem=({item,index})=>{
    return(
        <ListItem
        key={index}
        title={"hear is the "+""+item.student_name+"'s answers"}
        subtitle={"answer1:-"+item.ans_1+"\nanswer2:-"+item.ans_2+"\nanswer3:-"+item.ans_3}
        titleStyle={{textAlign:'center',alignItems:'center',marginLeft:'20%',color:'#ccff99'}}
        subtitleStyle={{color:'violet',fontSize:23}}
        checkmark

        bottomDivider
        />
    )
}

    render(){
        return(
  <View>
      <View>
          <Header
          centerComponent={{
              text:"check answer"
              ,style:{fontSize:21}
          }}
          leftComponent={<Icon name="arrow-left" type="font-awesome" onPress={()=>{this.props.navigation.navigate('homes')}}/>}
          />
      </View>
      <View>
      <FlatList
keyExtractor={this.key}
data={this.state.getHW}
renderItem={this.renderItem}
/>
<TextInput
placeholder="send feedback"
multiline
onChangeText={text=>this.setState({feedback:text})}
style={{borderWidth:6,borderRadius:40,borderBottomColor:'red',marginTop:20,textAlign:'center',height:100,fontSize:15,borderTopColor:'green',borderLeftColor:'yellow',borderRightColor:'blue'}}
value={this.state.feedback}
/>
<TouchableOpacity style={{alignItems:'center',marginTop:30,backgroundColor:'red',borderRadius:30,borderWidth:3,borderRadius:40,borderBottomColor:'gray',marginTop:20,textAlign:'center',fontSize:15,borderTopColor:'green',borderLeftColor:'yellow',borderRightColor:'blue'}}
onPress={()=>{
    this.sendfeedback()
    this.mycheck()
}}

><Text style={{fontSize:19,color:'pink'}}>Home Work checked</Text></TouchableOpacity>
      </View>

</View>
        )
    }
}