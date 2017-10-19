import firebase from 'firebase';

let config = {
    apiKey: "AIzaSyASt7SuX8rN-2Wc6YmvJ5exyy3kjVMN4J4",
    authDomain: "log-app-53ab6.firebaseapp.com",
    databaseURL: "https://log-app-53ab6.firebaseio.com",
    projectId: "log-app-53ab6",
    storageBucket: "log-app-53ab6.appspot.com",
    messagingSenderId: "86704912284"
  };
  
export const firebaseApp = firebase.initializeApp(config);
  
export default firebaseApp;