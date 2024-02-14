import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, ScrollView, TouchableOpacity, Text } from 'react-native';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import RadioForm from 'react-native-simple-radio-button';
import { useNavigation } from '@react-navigation/native';
import WeatherHeader from '../components/WeatherHeader';

const EditUserScreen = ({ route: { params }, navigation: nav }) => {
  const { userId } = params;
  const [User, setUser] = useState({});
  const [editedUsername, setEditedUsername] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedRole, setEditedRole] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const userRef = ref(getDatabase(), `Users/${userId}`);

    const unsubscribe = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setUser(data || {});
      setEditedUsername(data?.username || '');
      setEditedEmail(data?.email || '');
      setEditedRole(data?.role || '');
    
    });

    return () => {
      // Automatically unsubscribed when the component is unmounted
      unsubscribe();
    };
  }, [userId]);

  const handleUpdateUser = () => {
    const updatedUser = {
      username: editedUsername,
      email: editedEmail,
      role: editedRole,
     
    };

    const UserRef = ref(getDatabase(), `Users/${userId}`);

    // navigate back to user screen after editing user
    navigation.navigate('UserList');
    update(UserRef, updatedUser, (error) => {
      if (error) {
        alert('Error updating user. Please try again.');
      } else {
        alert('User updated successfully!');
        
      }
    });
  };



  return (
    <ScrollView contentContainerStyle={styles.container}>
       
       <WeatherHeader/>

      <Text style={styles.header}>Edit User</Text>
      <TextInput
        style={styles.input}
        placeholder="Edit User Name"
        value={editedUsername}
        onChangeText={(text) => setEditedUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Edit User Email"
        value={editedEmail}
        onChangeText={(text) => setEditedEmail(text)}
        multiline
      />
        <TextInput
        style={styles.input}
        placeholder="Edit Role Email"
        value={editedRole}
        onChangeText={(text) => setEditedRole(text)}
      
      />
      
  
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleUpdateUser} // Call handleUpdateUser when pressed
      >
        <Text style={styles.createButtonText}>Update User</Text>
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

  selectUserText: {
    color: 'darkgreen',
    marginBottom: 8,
    fontWeight: 'bold',
  },
});

export default EditUserScreen;
