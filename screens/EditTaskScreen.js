import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, ScrollView, TouchableOpacity, Text } from 'react-native';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import RadioForm from 'react-native-simple-radio-button';
import { useNavigation } from '@react-navigation/native';
import WeatherHeader from '../components/WeatherHeader';

const EditTaskScreen = ({ route: { params }, navigation: nav }) => {
  const { taskId } = params;
  const [task, setTask] = useState({});
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const taskRef = ref(getDatabase(), `Tasks/${taskId}`);

    const unsubscribe = onValue(taskRef, (snapshot) => {
      const data = snapshot.val();
      setTask(data || {});
      setEditedName(data?.name || '');
      setEditedDescription(data?.description || '');
      setIsComplete(data?.complete || false);
    });

    return () => {
      // Automatically unsubscribed when the component is unmounted
      unsubscribe();
    };
  }, [taskId]);

  const handleUpdateTask = () => {
    const updatedTask = {
      name: editedName,
      description: editedDescription,
      complete: isComplete,
    };

    const taskRef = ref(getDatabase(), `Tasks/${taskId}`);

    // navigate back to task screen after editing task
    navigation.navigate('TaskList');
    update(taskRef, updatedTask, (error) => {
      if (error) {
        alert('Error updating task. Please try again.');
      } else {
        alert('Task updated successfully!');
        
      }
    });
  };

  const radioProps = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
       
       <WeatherHeader/>

      <Text style={styles.header}>Edit Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Edit Task Name"
        value={editedName}
        onChangeText={(text) => setEditedName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Edit Task Description"
        value={editedDescription}
        onChangeText={(text) => setEditedDescription(text)}
        multiline
      />
      <Text style={styles.selectUserText}>Completed?</Text>
      <RadioForm
        style={styles.radioGroup}
        radio_props={radioProps}
        initial={isComplete ? 0 : 1}
        onPress={(value) => setIsComplete(value)}
        buttonSize={10}
        selectedButtonColor="darkgreen" // Dark green color for selected radio button
        buttonColor="darkgreen" // Dark green color for unselected radio button
      />
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleUpdateTask} // Call handleUpdateTask when pressed
      >
        <Text style={styles.createButtonText}>Update Task</Text>
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

export default EditTaskScreen;
