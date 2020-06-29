import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAErybILt6ZC-OpZOM3dZxczKKPPfZ1Mow',
  authDomain: 'route-planner-72395.firebaseapp.com',
  databaseURL: 'https://route-planner-72395.firebaseio.com',
  projectId: 'route-planner-72395',
  storageBucket: 'route-planner-72395.appspot.com',
  messagingSenderId: '235678387875',
  appId: '1:235678387875:web:fd8f7cef629768eebb7916',
  measurementId: 'G-G1BS4ZL18T',
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
