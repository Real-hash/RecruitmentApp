import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { set, ref, push, getDatabase, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import WeatherHeader from '../components/WeatherHeader';

const CreateTaskScreen = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedUsername, setSelectedUsername] = useState('');
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const usersRef = ref(getDatabase(), 'Users');

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const usersArray = Object.values(data).map((user) => ({
          id: user.id,
          username: user.username,
        }));

        setUsers(usersArray);
      } else {
        setUsers([]);
      }
    });
  }, []);

  const handleAddTask = () => {
    if (taskName.trim() === '') {
      alert('Task name cannot be empty');
      return;
    }

    const database = getDatabase();
    const tasksRef = ref(database, 'Tasks');
    const newTaskRef = push(tasksRef);

    const newTask = {
      name: taskName,
      description: taskDescription,
      username: selectedUsername,
    };
    // Navigate back to TaskListScreen after adding the task
    navigation.navigate('TaskList');
    set(newTaskRef, newTask, (error) => {
      if (error) {
        alert('Error adding task. Please try again.');
      } else {
        alert('Task added successfully!');
        setTaskName('');
        setTaskDescription('');
        setSelectedUsername('');
      
 
      }
    });
  };

  const radioProps = users.map((user) => ({ label: user.username, value: user.username }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
       <WeatherHeader/>
      <Text style={styles.header}>Create Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Task Name"
        value={taskName}
        onChangeText={(text) => setTaskName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Task Description"
        value={taskDescription}
        onChangeText={(text) => setTaskDescription(text)}
        multiline
      />
      <Text style={styles.selectUserText}>Select User</Text>
      <RadioForm
        style={styles.radioGroup}
        radio_props={radioProps}
        initial={-1}
        onPress={(value) => setSelectedUsername(value)}
        buttonSize={10}
        selectedButtonColor="darkgreen" // Dark green color for selected radio button
        buttonColor="darkgreen" // Dark green color for unselected radio button
      />
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleAddTask} // Call handleAddTask when pressed
      >
        <Text style={styles.createButtonText}>Add Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(50, 205, 50, 0.5)', // Translucent lime green
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'darkgreen',
    marginTop: 16,
  },
  createButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 16,
    width: '80%',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'darkgreen',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 8,
    color: 'darkgreen',
  },
  radioGroup: {
    flexDirection: 'column',
    marginTop: 8,
  },
  selectUserText: {
    color: 'darkgreen',
    marginBottom: 8,
    fontWeight: 'bold',
  },
});

export default CreateTaskScreen;
