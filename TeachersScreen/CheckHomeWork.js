import React, { Component } from 'react';
import {View,Text,Modal, TextInput,TouchableOpacity,StyleSheet, ScrollView,Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../MyHeader';
import { Header, Icon, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';
export default class CheckHomeWork extends React.Component{
constructor(){
    super();
    this.state={
      email:firebase.auth().currentUser.email,getHomeWorks:[],
      ans1:'',ans2:'',ans3:'',check:''
    }
    console.log(this.state.check)
    this.requestRef=null
}
getStudentsHomeWorks=()=>{
 this.requestRef = db.collection('submitted_homeworks').where('send_homeworkto','==',this.state.email)
  .onSnapshot(snapshot=>{
   var details =  snapshot.docs.map(doc=> doc.data())
   var mark = snapshot.docs.map(doc=>doc.data().checked)
   console.log(mark)
   this.setState({
       getHomeWorks:details,
       check:mark
   })
  })
}
componentDidMount(){
 
    this.getStudentsHomeWorks()
}

key=(item,i)=>i.toString()
renderItem=({item,i})=>{

    return(
        <ListItem
        key={i}
        title={item.student_name+","+"has completed their homework"}
        subtitle={"class"+":-"+ item.grade+"\nSubject"+":-"+item.subject+"\ncheck:-"+item.checked}
        titleStyle={{color:'#ff2052'}}
        subtitleStyle={{color:'#900c3f'}}
        leftElement={<Icon name="address-book-o" type="font-awesome"/>}
        rightElement={<TouchableOpacity style={{backgroundColor:'red',borderRadius:40,borderColor:'yellow',borderWidth:2}} onPress={()=>{this.props.navigation.navigate('seeanswer')}}><Text style={{textAlign:'center',color:'#ffff',fontSize:20}}>check</Text></TouchableOpacity>}
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
                    text:'check-homeworks'
                    ,style:{color:'white',backgroundColor:'red',fontSize:20}
                }}
                leftComponent={<Icon name="bars" type="font-awesome" onPress={()=>this.props.navigation.toggleDrawer()} />}
                rightComponent={<Icon name="bell" type="font-awesome" onPress={()=>this.props.navigation.navigate('studentsdoubt')} />}
                />
            </View>
            <View>
                {
                    this.state.getHomeWorks.length === 0?(
                         
                         <View>
                             <Text style={{color:'red',fontSize:20}}>Not homewrok yet</Text>
                         </View>
                     
                    ):(
                        <FlatList
                        keyExtractor={this.key}
                        data={this.state.getHomeWorks}
                        renderItem={this.renderItem}
                        />
                    
                    )
                }
            </View>
            </View>
        )
    }
}