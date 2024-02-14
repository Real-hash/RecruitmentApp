// UserList.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const UserList = ({ user, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(user.id, user.username, user.role)}>
      <View style={styles.container}>
        <Text style={styles.username}>{user.username}</Text>
      </View>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.label}>Role: <Text style={styles.taskText}>{user.role}</Text></Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
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
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#888',
  },
});

export default UserList;
