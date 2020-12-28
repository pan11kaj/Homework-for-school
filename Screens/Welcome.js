import React, { Component } from 'react';
import {View,Text,Modal, TextInput,TouchableOpacity,StyleSheet, ScrollView,Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../MyHeader'
import { ToastAndroid } from 'react-native';
import { Image } from 'react-native';
export default class WelcomeScreen extends Component{
constructor(props){
    super(props);
    this.state={
        email:'',password:'',id:'',visibility:false,studentid:'',teacherid:'',name:''
    }
}
getLoginDetails=()=>{
    db.collection('students').get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            this.setState({
                studentid:doc.data().student_id
            })
        })
    })
    db.collection('teachers').get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            this.setState({
            teacherid:doc.data().teacher_id
            })
        })
    })
}
componentDidMount(){
    this.getLoginDetails()
}
Login=(e,p)=>{
  if(this.state.id === this.state.studentid){
   firebase.auth().signInWithEmailAndPassword(e,p)
   .then((respones)=>{
 this.props.navigation.navigate('Drawer')
   })
   .catch((error)=>{
    var errormessage = error.message;
    Alert.alert(errormessage)
   })
  }
  if(this.state.id === this.state.teacherid){
    firebase.auth().signInWithEmailAndPassword(e,p)
    .then((sf)=>{
   this.props.navigation.navigate('Drawer2')
    })
    .catch((error)=>{
     var errormessage = error.message;
     Alert.alert(errormessage)
    })
   }
                                           


}
signup =(e,p)=>{
    if(this.state.email === '' ||this.state.password === '' ||this.state.name === '' || this.state.id === ''  ){
        Alert.alert('please fill information')
    }else{
        db.collection('students').where('student_id','==',this.state.id).where('name','==',this.state.name).get()
.then(snapshot=>{
    snapshot.forEach(doc=>{
        firebase.auth().createUserWithEmailAndPassword(e,p)
        .then(()=>{
            db.collection('students').doc(doc.id).update({
                email:e,
                password:p
            })
        }).catch(error=>{
            var msg = error.message;
            Alert.alert(msg)
        })
        
    })
})


db.collection('teachers').where('teacher_id','==',this.state.id).where('name','==',this.state.name).get()
.then(snapshot=>{
    snapshot.forEach(doc=>{
        firebase.auth().createUserWithEmailAndPassword(e,p)
        .then(()=>{
            db.collection('teachers').doc(doc.id).update({
                email:e,
                password:p
            })
        })
        }).catch(error=>{
    var msg = error.message;
    Alert.alert(msg)
})
       
  
})

}

    }



showSignUp = ()=>{
    return(
        <Modal  animationType="fade" transparent={true}  visible={this.state.visibility}>
            
            <View style={styles.modalContainer}>
                <Text style={{fontSize:30,color:'blue'}}>SignUp to DB</Text>
         <ScrollView>             
             <TextInput
          placeholder="email-id"
          keyboardType={'email-address'}
          style={styles.input2}
         onChangeText={text=>{this.setState({email:text})}}
         />  
             <TextInput
             secureTextEntry={true}
          placeholder="password"
          style={styles.input2}
         onChangeText={text=>{this.setState({password:text})}}
         />     
            <TextInput
        
          placeholder="name"
          style={styles.input2}
         onChangeText={text=>{this.setState({name:text})}}
         /> 
           <TextInput
          placeholder="student/teacher id"
          style={styles.input2}
         onChangeText={text=>{this.setState({id:text})}}
         />  
         <View style={{justifyContent:'center',alignItems:'center'}}><TouchableOpacity style={{
             justifyContent:'center',alignItems:'center',borderRadius:20,width:110,height:30,backgroundColor:'black',borderColor:'blue'}}
             onPress={()=>{this.signup(this.state.email,this.state.password)}}>
            <Text style={{color:'red',textAlign:'center'}}>Register AC</Text>
            </TouchableOpacity></View> 
            <View style={{justifyContent:'center',alignItems:'center',marginTop:5}}><TouchableOpacity style={{
             justifyContent:'center',alignItems:'center',borderRadius:20,width:110,height:32,backgroundColor:'black',borderColor:'blue'}}
             onPress={()=>{this.setState({visibility:'false'})}}>
            <Text style={{color:'red',textAlign:'center'}}>Cancel Registeration</Text>
            </TouchableOpacity></View> 
        </ScrollView> 
        
        </View>
     
        </Modal>
    )
    
    
    }
    

render(){
    return(
        <View style={{flex:1,backgroundColor:'cyan'}}>
       <View style={{alignItems:'center',justifyContent:'center'}}> 
        <MyHeader title=" School HomeWork"/>
        <Image
        source={require('../assets/background.png')}
        style={{marginTop:20}}
        />
       </View>
        <View>{this.showSignUp()}</View>
            <View style={{justifyContent:'center',alignSelf:'center',alignItems:'center'}}>
            <TextInput
                placeholder="teacher/student ID"
                onChangeText={Text=>{this.setState({id:Text})}}
                style={{alignSelf:'center',marginTop:20,textAlign:'center',borderWidth:2,borderColor:'red',width:200,height:40,fontSize:16}}
                value={this.state.id}
                />
                <TextInput
                placeholder="email-id"
                keyboardType={'email-address'}
                onChangeText={Text=>{this.setState({email:Text})}}
                style={{alignSelf:'center',marginTop:20,textAlign:'center',borderWidth:2,borderColor:'red',width:200,height:40,fontSize:16}}
                value={this.state.email}
                />

                <TextInput
                placeholder="password"
                secureTextEntry
                onChangeText={Text=>{this.setState({password:Text})}}
                style={{alignSelf:'center',textAlign:'center',borderWidth:2,borderColor:'red',width:200,height:40,fontSize:16,marginTop:20}}
                value={this.state.password}
                />
                <TouchableOpacity style={{marginTop:20,backgroundColor:'red',justifyContent:'center',alignItems:'center',borderWidth:2,width:230,borderRadius:80}}
                onPress={()=>{this.Login(this.state.email,this.state.password)}}
                >
                <Text style={{color:'#ffff',fontSize:23}}>
                  LogIn
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop:20,backgroundColor:'red',justifyContent:'center',alignItems:'center',borderWidth:2,width:230,borderRadius:80}}
            onPress={()=>{this.setState({visibility:true})}}>
                <Text style={{color:'#ffff',fontSize:23}}>
                  SignUp
                </Text>
            </TouchableOpacity>
            </View>


            <View style={{justifyContent:'center',alignItems:'center',marginTop:80}}>
    
        </View>
        </View>
    )
}



}
const styles = StyleSheet.create({
    inputs:{
     width:200,height:60,justifyContent:'center',borderColor:'red',
     borderWidth:2,marginTop:17,borderRadius:20
    },buttons:{
        justifyContent:"center",alignItems:'center',
        backgroundColor:'red',width:200,borderRadius:30,marginLeft:10,
        height:50,marginTop:30,borderColor:'yellow',borderWidth:2
    },textinput:{
        color:'white',textAlign:'center'
    },
    input2:{
        width: 300, height: 40, borderBottomWidth: 1.5, borderColor : 'orange', fontSize: 20, margin:10, paddingLeft:10
    },
    modalContainer:
    { flex:1, 
        borderRadius:20,
         justifyContent:'center',
        alignItems:'center',
         backgroundColor:"pink", 
         marginRight:30,
          marginLeft : 30,
           marginTop:80, marginBottom:80, 
        },
        container:{ 
            flex:1,
            alignItems: 'center',
            justifyContent: 'center' ,backgroundColor:'green'
        }
    })



