// Import the functions you need from the SDKs you need
import  {initializeApp} from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
    apiKey:process.env.REACT_APP_apiKey,
    authDomain:process.env.REACT_APP_authDomain ,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId:process.env.REACT_APP_appId
  };

// Initialize Firebase
const app =initializeApp(firebaseConfig)

export default getFirestore(app);
