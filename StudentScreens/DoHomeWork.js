import React,{Component} from 'react';
import {View,Text,TextInput, TouchableOpacity} from 'react-native';
import MyHeader from '../MyHeader';
import {Card, Icon, ListItem} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
export default class DoHomeWork extends Component{
constructor(){
    super();
    this.state={
   StudentDetails:[],grade:'',studentName:'',allDetails:[],
   ans1:'',ans2:'',ans3:'',docid:"",email:firebase.auth().currentUser.email,section:'',teacheremail:'',subject:''
    }
}
getTEacherDetails=()=>{
  db.collection('teachers')
  .onSnapshot((snapshot)=>{
    snapshot.docs.map((doc)=>{
     this.setState({
       teacheremail:doc.data().email
     })
    })
  })
}

getStudentDetails=()=>{
    db.collection('students').where('email','==',this.state.email)
    .onSnapshot((snapshot)=>{
     snapshot.docs.map(doc=>{
         this.setState({
             grade:doc.data().grade,
            studentName:doc.data().name,
            section:doc.data().section
         })
        })}) 
}
getHW =()=>{

    this.requestRef = db.collection("all_homeworks")
    .onSnapshot((snapshot)=>{
      var requestedBooksList = snapshot.docs.map((doc) => doc.data())
      var subject = snapshot.docs.map((doc)=>doc.data().subject)
      this.setState({
        allDetails : requestedBooksList,
        subject:subject
      });
    })  
  }
submitHomeWork=()=>{
db.collection('submitted_homeworks').add({
    'student_name':this.state.studentName,
    'grade':this.state.grade,
    'section':this.state.section,
    'email':this.state.email,
    'ans_1':this.state.ans1,
    'ans_2':this.state.ans2,
    'ans_3':this.state.ans3,
    'send_homeworkto':this.state.teacheremail,
     'subject':this.state.subject,
     'date':firebase.firestore.FieldValue.serverTimestamp(),
     'checked':'no'
})
}

componentDidMount(){
this.getHW()
this.getStudentDetails()
this.getTEacherDetails()
}

render(){
    return(
        <View>
        <View>
            <MyHeader
            title="Lets do"/>
  
        </View>
        <View style={{alignItems:'flex-start'}}>
        <Icon name="arrow-left"  type="font-awesome" onPress={()=>this.props.navigation.navigate('home')} size={30}/>
        </View>
      <View>
          {
            this.state.allDetails.map((item,index)=>{
              return(
                  <View
                  key={index}
                  style={{borderBottomWidth:3}}
                  >
                      <Text style={{color:'green',fontSize:20}}>{"question 1:-"+item.question_1}</Text>
                      <Text style={{color:'green',fontSize:20}}>{"question 2:-"+item.question_2}</Text>
                      <Text style={{color:'green',fontSize:20}}>{"question 3:-"+item.question_3}</Text>
                  </View>
              )
            })
          }
      </View>
      <View style={{alignItems:'center',marginTop:20}}>
          <TextInput
          placeholder="submit answer 1"
         onChangeText={text=>{this.setState({ans1:text})}}
         style={{width:200,borderColor:'red',borderWidth:2,marginTop:30}}
         value={this.state.ans1}
          />
             <TextInput
          placeholder="submit answer 2"
         onChangeText={text=>{this.setState({ans2:text})}}
         style={{width:200,borderColor:'red',borderWidth:2,marginTop:30}}
         value={this.state.ans2}
          />
             <TextInput
          placeholder="submit answer 3"
         onChangeText={text=>{this.setState({ans3:text})}}
         style={{width:200,borderColor:'red',borderWidth:2,marginTop:30}}
         value={this.state.ans3}
          />
          <TouchableOpacity style={{backgroundColor:'red',borderColor:'yellow',borderWidth:2,borderRadius:50,height:40}}
          onPress={()=>{this.submitHomeWork()}}
          ><Text style={{color:'white',textAlign:'center'}}>Submit Home work</Text></TouchableOpacity>
      </View>
    
        </View>
    )
}

}