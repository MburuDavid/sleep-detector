// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyASBcjEtxO0XI0ziwWxou45A8u_tUXnQb8",
	authDomain: "sleep-detector-5be34.firebaseapp.com",
	projectId: "sleep-detector-5be34",
	storageBucket: "sleep-detector-5be34.appspot.com",
	messagingSenderId: "310823711461",
	appId: "1:310823711461:web:592f77b3905976e1e1da0c",
	measurementId: "G-D9MLQD2WQV",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH: Auth = getAuth(FIREBASE_APP);

