// Import necessary dependencies
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';



const TaskList = ({ task }) => {
  return (
    <View style={styles.taskContainer}>
      <Text style={styles.label}>Title: <Text style={styles.taskText}>{task.name}</Text></Text>
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.taskText}>{task.description}</Text>
      <Text style={styles.label}>Assigned User: <Text style={styles.taskText}>{task.username}</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  taskText: {
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Roboto',
  },
});

export default TaskList;
