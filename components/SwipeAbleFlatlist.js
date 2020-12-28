import React, { Component } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

import { SwipeListView } from 'react-native-swipe-list-view';
import firebase from 'firebase';
import db from '../config';


export default class SwipeableFlatlist extends Component{
  constructor(props) {
    super(props);
    this.state = {
      allfeedbacks:[],
      email:[firebase.auth().currentUser.email]
    };
  }

MarkAsread =(notification)=>{
    db.collection("all_feedback").doc(notification.doc_id).update({
      isread : "yes"
    })
  }


  onSwipeValueChange = swipeData => {
    var allNotifications = this.state.allfeedbacks
      const {key,value} = swipeData;

      if(value < -Dimensions.get('window').width){
        const newData = [...allNotifications];
        const prevIndex = allNotifications.findIndex(item => item.key === key);
        this.MarkAsread(allNotifications[prevIndex]);
        newData.splice(prevIndex, 1);
        this.setState({allfeedbacks : newData})
    };
};



getfeedbacks=()=>{
  db.collection('all_feedback').where('send_to','==',this.state.email)
  .onSnapshot(snapshot=>{
     var fetch = snapshot.docs.map(doc=>doc.data())
      this.setState({
      allfeedbacks:fetch
      })
  
  })
}

componentDidMount(){
  this.getfeedbacks()
}




  renderItem = data => (

        <ListItem
          leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
          title={"hello mr. "+""+ data.item.send_to}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          subtitle={"teacher feedback  :--"+""+data.item.feedback+"\nyour home-work is checked!!"}
          bottomDivider
        />
  );

  renderHiddenItem = () => (
      <View style={styles.rowBack}>
          <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
              <Text style={styles.backTextWhite}></Text>
          </View>
      </View>
  );

  render(){
    return(
      <View style={styles.container}>
          <SwipeListView
              data={this.state.allfeedbacks}
              renderItem={this.renderItem}
              renderHiddenItem={this.renderHiddenItem}
              rightOpenValue={-Dimensions.get('window').width}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              onSwipeValueChange={this.onSwipeValueChange}
          />
      </View>
    )
  }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
        fontWeight:'bold',
        fontSize:15
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#29b6f6',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 100,
    },
    backRightBtnRight: {
        backgroundColor: '#29b6f6',
        right: 0,
    },
});