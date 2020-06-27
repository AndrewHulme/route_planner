import React from "react";
import "./css/app.css";
import Form from "./components/form";
import firebase from './components/Firestore';

// const firebaseWelcome = firebase.functions().httpsCallable('helloWorld')
//
// export const AboutMe = () => {
//   firebaseWelcome().then(function(value) {
//     console.log(value.data)
//   })
// }

function App() {
  // state = {};

  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
