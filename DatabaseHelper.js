// DatabaseHelper.js
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  // Your Firebase configuration object
};

firebase.initializeApp(firebaseConfig);

const createTask = (task) => {
  firebase.database().ref('tasks').push(task);
};

const readTasks = () => {
  return firebase.database().ref('tasks').once('value')
    .then(snapshot => snapshot.val());
};

export { createTask, readTasks };
