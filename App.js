
import React from 'react';
import WelcomeScreen from './Screens/Welcome';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import { TeacherNavigator } from './components/TeacherNavigator';
import DoHomeWork from './StudentScreens/DoHomeWork';
import { StudentDrawerNavigator } from './components/AppDrawerNavigator';
import SeeAnswers from './TeachersScreen/seeAnswers';
import MyFeedbacks from './StudentScreens/myFeedbacks';
import { TeacherDrawerNavigator } from './components/Appdrawer2';

export default function App() {
  return (
    <AppContainer/>
);
}
const Navigator = createSwitchNavigator({ 
   Welcome:WelcomeScreen,
  Drawer:StudentDrawerNavigator,
  Drawer2:TeacherDrawerNavigator,
  homework:DoHomeWork,
  seeanswer:SeeAnswers,
  feedback:MyFeedbacks,

})
const AppContainer = createAppContainer(Navigator)
