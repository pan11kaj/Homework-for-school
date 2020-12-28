import React, { Component } from 'react';
import {View,Text,Modal, TextInput,TouchableOpacity,StyleSheet, ScrollView,Alert,FlatList} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../MyHeader';
import { Icon, ListItem,Header  } from 'react-native-elements';

export default class TeacherResponded extends Component{
constructor(){
    super();
    this.state={
        email:[firebase.auth().currentUser.email],feedbacks:[],msg:''
    }
}
getResponse=()=>{
    db.collection('solutions').where('student_email','==',this.state.email)
    .onSnapshot(snapshot=>{
        var data = snapshot.docs.map(doc=>doc.data())
        this.setState({
            feedbacks:data
        })
    })
}


key=(item,i)=>i.toString()
renderItem=({item,i})=>{
    return(
        <ListItem
        key={i}
        title={item.teacher_email}
        subtitle={"Subject:-"+item.subject+"\nDate:-"+item.date+"\nresponse :-"+item.respone}
              bottomDivider
        />
    )
}
componentDidMount(){
    this.getResponse()
}
    render(){
        return(
            <View>
            <Header
           centerComponent={{
               text:"respnses"
               ,style:{fontSize:23}
           }}
            leftComponent={<Icon name="arrow-left" type="font-awesome" onPress={()=>this.props.navigation.navigate('home')}/>}/>
            {
                this.state.feedbacks.length ===0?(
                    <View>
                        <Text>
                      you have no feedbacks
                        </Text>
                    </View>
                ):(
                     <FlatList
                     keyExtractor={this.key}
                     data={this.state.feedbacks}
                     renderItem={this.renderItem}
                     />
                )
            }
            </View>
        )
    }
}