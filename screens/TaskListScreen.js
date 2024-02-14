import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TaskList from '../components/TaskList';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';
import WeatherHeader from '../components/WeatherHeader';
import { sortById } from '../sortById';

const TaskListScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const navigation = useNavigation();
 

  useEffect(() => {
    const tasksRef = ref(getDatabase(), 'Tasks');

    const handleDataChange = (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const tasksArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        const sortedData = sortById(tasksArray, isAscending);

        setTasks(sortedData);
      } else {
        setTasks([]);
      }
    };

    onValue(tasksRef, handleDataChange);

    return () => {
      onValue(tasksRef, null);
    };
  }, [isAscending]);

  const handleTaskPress = (taskId) => {
    navigation.navigate('EditTask', { taskId });
  };

  const handleDeleteTask = (taskId) => {
    const taskRef = ref(getDatabase(), `Tasks/${taskId}`);
    remove(taskRef, (error) => {
      if (error) {
        alert('Error deleting task. Please try again.');
      } else {
        alert('Task deleted successfully!');
      }
    });
  };

  const handleSortToggle = () => {
    setIsAscending((prev) => !prev);
  };

  return (
    <View style={styles.container}>
     {/* //Displays weather information in the header */}
      <WeatherHeader />

      {/* Button to toggle sorting order */}
      <TouchableOpacity
        style={styles.sortButton}
        onPress={handleSortToggle}
      >
        <Text style={styles.sortButtonText}>
          {isAscending ? 'Sort Descending' : 'Sort Ascending'}
        </Text>
      </TouchableOpacity>

      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskContainer}>
              <View style={styles.tagContainer}>
                <View
                  style={[
                    styles.tag,
                    { backgroundColor: item.complete ? '#4CAF50' : '#FFC107' },
                  ]}
                >
                  <Text style={styles.tagText}>
                    {item.complete ? 'Complete' : 'Incomplete'}
                  </Text>
                </View>
              </View>
              <View style={styles.taskDetails}>
                <TaskList task={item} onPress={() => handleTaskPress(item.id)} />
              </View>
              <View style={styles.iconsContainer}>
                <Icon
                  name="pencil"
                  size={20}
                  color="#006400" // Dark Green
                  onPress={() => handleTaskPress(item.id)}
                />
                <Icon
                  name="trash"
                  size={20}
                  color="#006400" // Dark Green
                  onPress={() => handleDeleteTask(item.id)}
                  style={{ marginLeft: 10 }}
                />
              </View>
            </View>
          )}
        />
      ) : (
        <Text>No tasks available.</Text>
      )}

      {/* Button to navigate to CreateTaskScreen */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateTask')}
      >
        <Text style={styles.createButtonText}>Create Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(50, 205, 50, 0.3)', // Translucent Lime Green
  },
  sortButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  sortButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Roboto', 
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
  },
  tagContainer: {},
  tag: {
    width: 80,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  taskDetails: {
    flex: 1,
    marginLeft: 16,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Roboto', 
  },
});

export default TaskListScreen;
