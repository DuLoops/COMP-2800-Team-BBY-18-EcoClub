/* This is a Firestore database. 
* URL: https://console.firebase.google.com/project/ecoclub-a9e9e/overview
*/

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBk6J0NTodWr1d70GhXQ19TAJ0ov6tblLg",
    authDomain: "ecoclub-a9e9e.firebaseapp.com",
    projectId: "ecoclub-a9e9e",
    storageBucket: "ecoclub-a9e9e.appspot.com",
    messagingSenderId: "299773977672",
    appId: "1:299773977672:web:0f076b88b1014ca4cf647d",
    measurementId: "G-VFXVCEGRR5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

<<<<<<< HEAD
  var storage = firebase.storage();
=======
  //Reference to the storage service.
  // var storage = firebase.storage();
>>>>>>> 2e9f16d1911b13cd4d6c63fa288dcea2b34a6a92
