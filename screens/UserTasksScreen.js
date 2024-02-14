import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { StyleSheet } from 'react-native';
import WeatherHeader from '../components/WeatherHeader';

const UserTasksScreen = ({ route }) => {
  const [tasks, setTasks] = useState([]);
  const { username } = route.params;

  useEffect(() => {
    console.log('Username passed from UserListScreen:', username);
    const tasksRef = ref(getDatabase(), 'Tasks');

    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const tasksArray = [];
        for (const key in data) {
          const task = { id: key, ...data[key] };
          if (task.username === username) {
            tasksArray.push(task);
          }
        }

        setTasks(tasksArray);
      } else {
        setTasks([]);
      }
    });

    return () => {
      onValue(tasksRef, null);
    };
  }, [username]);

  return (
    <View style={styles.container}>
        <WeatherHeader />
      <Text style={styles.header}>Tasks filtered by User</Text>
      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskContainer}>
              <Text style={styles.title}>Title: {item.name}</Text>
              <Text style={styles.description}>Description: {item.description}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No tasks available for this user.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(50, 205, 50, 0.5)',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'darkgreen',
  },
  taskContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor:'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
});

export default UserTasksScreen;
