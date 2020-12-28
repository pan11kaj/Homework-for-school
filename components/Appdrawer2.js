import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Icon} from 'react-native-elements';

import TeacherNavigator from './TeacherNavigator';
import Drawer2 from './Drawer2';

import DoubtScreen from '../TeachersScreen/doubts';

import CheckedHomeworks from '../TeachersScreen/mycheckedhomeworks';

export const TeacherDrawerNavigator = createDrawerNavigator({
 homes:{screen:TeacherNavigator,
navigationOptions:{
  drawerIcon:<Icon name="book" type="font-awesome" />
}
},
studentsdoubt:{screen:DoubtScreen,
navigationOptions:{drawerIcon:<Icon name="ssd"  />}
},
todaycheckedHomework:{
  screen:CheckedHomeworks,
  navigationOptions:{drawerIcon:<Icon name="send" type="font-awesome" />}
}
},
    {
          contentComponent:Drawer2
        },
        {
          initialRouteName :'homes'
        })


