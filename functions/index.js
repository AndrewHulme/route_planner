// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
const functions = require("firebase-functions");
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello World!");
});



// exports.helloWorld = functions.https.onCall((request, response) => {
//   return("Hello from Firebase!");
// });
