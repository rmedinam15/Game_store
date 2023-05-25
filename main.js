// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCw6-UulmRdQBWKomg9nDo0zdfAYqGje8c",
    authDomain: "game-store-rmedinam15.firebaseapp.com",
    databaseURL: "https://game-store-rmedinam15-default-rtdb.firebaseio.com",
    projectId: "game-store-rmedinam15",
    storageBucket: "game-store-rmedinam15.appspot.com",
    messagingSenderId: "88084132275",
    appId: "1:88084132275:web:94879318d491a25d6b5bc6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const signupForm = document.querySelector('#signup-form');
const signinForm = document.querySelector('#login-form');
const logout = document.querySelector('#logout');


const loggedOutLinks = document.querySelectorAll(".logged-out")
const loggedInLinks = document.querySelectorAll(".logged-in")

//NAVBAR
const loginCheck = user =>{
    if (user) {
        loggedInLinks.forEach(link => link.style.display = 'block');
        loggedOutLinks.forEach(link => link.style.display = 'none');
    } else{
        loggedInLinks.forEach(link => link.style.display = 'none');
        loggedOutLinks.forEach(link => link.style.display = 'block');
    }
}


// SIGN UP
if (signupForm){
    console.log("Signup")

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const signupEmail = document.querySelector('#signup-email').value;
        const signupPassword = document.querySelector('#signup-password').value;

        console.log(signupEmail,signupPassword)
    
        createUserWithEmailAndPassword(auth, signupEmail, signupPassword).then((userCredential) => {
            // Signed in
            console.log("sign up with email")
            signupForm.reset();
            location.href = "login.html";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    });
}

// SIGN IN
if(signinForm){
signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const loginEmail = document.querySelector('#login-email').value;
    const loginPassword = document.querySelector('#login-password').value;

    signInWithEmailAndPassword(auth, loginEmail, loginPassword).then((userCredential) => {
        // Signed in
        console.log("sign in with email")
        signupForm.reset();
        location.href = "index.html";
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
});
}

// LOGOUT
if(logout){
logout.addEventListener('click', (e) => {
    e.preventDefault();

    signOut(auth).then(() => {
        // Signed in
        console.log("sign out with email")
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
});
}

onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      loginCheck(user);
      // ...
    } else {
      // User is signed out
      // ...
      loginCheck(user);
    }
  });
