// App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebaseApp from './firebaseConfig';
import { getAnalytics } from 'firebase/analytics';
import TaskListScreen from './screens/TaskListScreen';
import CreateTaskScreen from './screens/CreateTaskScreen';
import EditTaskScreen from './screens/EditTaskScreen';
import UserListScreen from './screens/UserListScreen';
import CreateUserScreen from './screens/CreateUserScreen';
import EditUserScreen from './screens/EditUserScreen';
import UserTasksScreen from './screens/UserTasksScreen';
import { WeatherProvider } from './WeatherContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TaskStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="TaskList"
      screenOptions={{
        headerShown: false, // Hide the default header for all screens in this navigator
      }}
    >
      <Stack.Screen name="TaskList" component={TaskListScreen} />
      <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
      <Stack.Screen name="EditTask" component={EditTaskScreen} />
    </Stack.Navigator>
  );
};
const UserStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="UserList"
      screenOptions={{
        headerShown: false, // Hide the default header for all screens in this navigator
      }}
    >
      <Stack.Screen name="UserList" component={UserListScreen} />
      <Stack.Screen name="CreateUser" component={CreateUserScreen} />
      <Stack.Screen name="EditUser" component={EditUserScreen} />
      <Stack.Screen name="UserTasks" component={UserTasksScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    getAnalytics(firebaseApp);
  }, []);

  return (
<WeatherProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {
              color: 'gold',
              fontSize: 16,
              fontWeight: 'bold',
            },
            tabBarStyle: {
              backgroundColor: '#006400', // Dark Green
            },
            tabBarCentered: true,
          }}
        >
          <Tab.Screen name="Tasks" component={TaskStack} />
          <Tab.Screen name="Users" component={UserStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </WeatherProvider>

  );
};

export default App;
