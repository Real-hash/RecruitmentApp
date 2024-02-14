import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { push, ref, getDatabase, set } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import WeatherHeader from '../components/WeatherHeader';

const CreateUserScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const navigation = useNavigation();

  const handleAddUser = () => {
    if (username.trim() === '' || email.trim() === '' || role.trim() === '') {
      alert('Username,email and role cannot be empty');
      return;
    }

    const database = getDatabase();
    const usersRef = ref(database, 'Users');

    const newUserRef = push(usersRef);

    const newUser = {
      username: username,
      email: email,
      role:role,
    };
    navigation.navigate('UserList');
    set(newUserRef, newUser, (error) => {
      if (error) {
        alert('Error adding user. Please try again.');
      } else {
        alert('User added successfully!');
        setUsername('');
        setEmail('');
        setRole('');
        // Navigate back to UserListScreen after adding the user
       
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <WeatherHeader />
      <Text style={styles.header}>Add New User</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Role"
        value={role}
        onChangeText={(text) => setRole(text)}
      />
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleAddUser}
      >
        <Text style={styles.createButtonText}>Add User</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(50, 205, 50, 0.5)',
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
});

export default CreateUserScreen;
