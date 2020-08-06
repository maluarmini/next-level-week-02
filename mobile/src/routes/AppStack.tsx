import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LandingPage from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';

import StudyTabs from './StudyTabs';

const {Navigator, Screen} = createStackNavigator();

export default function AppStack(){
    return (
        <NavigationContainer>
           <Navigator screenOptions={{headerShown: false, }}>
               <Screen name="Landing" component={LandingPage}/>
               <Screen name="GiveClasses" component={GiveClasses}/>
               <Screen name="Study" component={StudyTabs}/>
           </Navigator>
        </NavigationContainer>
    );
}