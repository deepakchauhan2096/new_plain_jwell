// import * as firebase from "firebase"
// import firebase from "firebase"
 import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions';
// import { mergeAnnotations } from '../components/MergeAnnotations/MergeAnnotations';
const firebaseConfig = {
    apiKey: "AIzaSyACAOip_vdsGIa3Or93LainhfdIjbmPwBU",
    authDomain: "maharaja-efa16.firebaseapp.com",
    projectId: "maharaja-efa16",
    storageBucket: "maharaja-efa16.appspot.com",
    messagingSenderId: "771200319253",
    appId: "1:771200319253:web:140157ce0b470068daf31c",
    measurementId: "G-527JVDBZEC"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

 export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
export  {firebase}