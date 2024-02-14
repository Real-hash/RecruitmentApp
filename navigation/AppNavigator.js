// AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import TaskListScreen from '../screens/TaskListScreen.js';
import UserListScreen from '../screens/UserListScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import CreateUserScreen from '../screens/CreateUserScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Tasks" component={TaskListScreen} />
        <Tab.Screen name="Users" component={UserListScreen} />
        <Tab.Screen name="CreateTask" component={CreateTaskScreen} />
        <Tab.Screen name="CreateUser" component={CreateUserScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
