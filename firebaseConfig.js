// firebaseConfig.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDXwQrvblE-NGxsJ6ZVx1EEEpfO89a454c',
  authDomain: 'taskmanager-30352.firebaseapp.com',
  databaseURL: 'https://taskmanager-30352-default-rtdb.firebaseio.com',
  projectId: 'taskmanager-30352',
  storageBucket: 'taskmanager-30352.appspot.com',
  messagingSenderId: '644291241354',
  appId: '1:644291241354:web:533fdecc239f9f947c5473',
  measurementId: 'G-PS621HWSTR',
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
