import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Icon} from 'react-native-elements';
import Drawer from './drawer';
import AllChat from '../StudentScreens/Chat';
import HomeWorks from '../StudentScreens/AllHomeWork';
import { StudentNavigator } from './StudentNavigator';
import MyFeedbacks from '../StudentScreens/myFeedbacks';
import TeacherResponded from '../StudentScreens/teacher_response';
export const StudentDrawerNavigator = createDrawerNavigator({
 home:{screen:StudentNavigator,
navigationOptions:{
  drawerIcon:<Icon name="home" type="font-awesome" />
}
},
Chats:{screen:AllChat,
  navigationOptions:{
    drawerIcon:<Icon name="send" type="font-awesome" />
  }
  },
  feedback:{
    screen:MyFeedbacks
    ,navigationOptions:{
      drawerIcon:<Icon name='send' type="font-awesome"/>}
    },
    teacherRespone:{
      screen:TeacherResponded
      ,navigationOptions:{
        drawerIcon:<Icon name="send" type='font-awesome'  />
      }
    }
  },
        {
          contentComponent:Drawer
        },
        {
          initialRouteName :'home'
        })



