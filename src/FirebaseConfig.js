import firebase from "firebase";

const config = {
    apiKey: "AIzaSyCK9J9NfVnRhDmBvqFATfLBbLE23ipF5Wg",
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}


export default firebase