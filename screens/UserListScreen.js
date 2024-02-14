import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import UserList from '../components/UserList';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';
import WeatherHeader from '../components/WeatherHeader';

const UserListScreen = () => {
  const [users, setUsers] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const usersRef = ref(getDatabase(), 'Users');

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const usersArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        const sortedData = isAscending
          ? usersArray.sort((a, b) => a.id.localeCompare(b.id))
          : usersArray.sort((a, b) => b.id.localeCompare(a.id));

        setUsers(sortedData);
      } else {
        setUsers([]);
      }
    });

    return () => {
      onValue(usersRef, null);
    };
  }, [isAscending]);

  const handleUserPress = (user) => {
    console.log('Username:', user.username);
    navigation.navigate('UserTasks', { userId: user.id, username: user.username });
  };
  const handleEditPress = (userId) => {
    navigation.navigate('EditUser', { userId});
  };
  const handleDeleteUser = (userId) => {
    const userRef = ref(getDatabase(), `Users/${userId}`);
    remove(userRef, (error) => {
      if (error) {
        alert('Error deleting user. Please try again.');
      } else {
        alert('User deleted successfully!');
      }
    });
  };

  return (
    <View style={styles.container}>
        <WeatherHeader />
      <TouchableOpacity style={styles.sortButton} onPress={() => setIsAscending(!isAscending)}>
        <Text style={styles.sortButtonText}>
          {isAscending ? 'Sort Descending' : 'Sort Ascending'}
        </Text>
      </TouchableOpacity>

      {users.length > 0 ? (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.userContainer}>
              {/* White rectangle around each user */}
              <View style={styles.userWrapper}>
                <UserList user={item} onPress={() => handleUserPress(item)} />
              </View>
              <Icon
                name="pencil"
                size={20}
                color="darkgreen"
                onPress={() => handleEditPress(item.id)}
                style={styles.icon}
              />
              <Icon
                name="trash"
                size={20}
                color="darkgreen"
                onPress={() => handleDeleteUser(item.id)}
                style={styles.icon}
              />
            </View>
          )}
        />
      ) : (
        <Text>No users available.</Text>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateUser')}
      >
        <Text style={styles.addButtonText}>Add User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(50, 300, 50, 0.4)', // Translucent lime green
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
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  userWrapper: {
    flexDirection: 'row',
    backgroundColor: 'white', // White background for the user rectangle
    borderRadius: 8, // Add border radius for a rounded rectangle
    padding: 10, // Add padding inside the rectangle
    marginRight: 10, // Add margin to separate rectangles
  },
  icon: {
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
});

export default UserListScreen;
