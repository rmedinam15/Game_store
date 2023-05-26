// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

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
const db = getDatabase();

const signupForm = document.querySelector('#signup-form');
const signinForm = document.querySelector('#login-form');
const logout = document.querySelector('#logout');

const loggedOutLinks = document.querySelectorAll(".logged-out")
const loggedInLinks = document.querySelectorAll(".logged-in")

let spots = document.querySelectorAll("#spot")
let spotPercent = document.querySelectorAll("#percent")
let spotNoDiscount = document.querySelectorAll("#no-discount")
let spotYesDiscount = document.querySelectorAll("#yes-discount")

// let spotsPercent = document.querySelectorAll(".percent")

// const spotDiscount1 = document.getElementById("discount-1")
// const percentDiscount1 = document.getElementById("percent-discount-1")
// const noDiscount1 = document.getElementById("no-discount-1")
// const yesDiscount1 = document.getElementById("yes-discount-1")

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

// AUTH CHANGED
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

// GET DATA REAL TIME DB
if(spots){
    onValue(ref(db, '/videogames'),(snapshot) => {
        // console.log(snapshot.val());
        let data = snapshot.val();
        // spot1.src = data[0].image;
        // spot2.src = data[1].image;
        // spot3.src = data[2].image;
        
        // spotDiscount1.src = data[3].image;
        // percentDiscount1.innerHTML = "-"+data[3].discount+"%";
        // noDiscount1.innerHTML = "COL$ " + data[3].price;
        // let newPrice = data[3].price - (data[3].price * (data[3].discount / 100));
        // yesDiscount1.innerHTML = "COL$ " + newPrice;
        console.log(spotPercent)
        console.log(spotNoDiscount)
        console.log(spotYesDiscount)
        for(let i = 0; 12; i++){
            spots[i].src = data[i].image; 
            if( i >= 3){
                spotPercent[i-3].innerHTML = "-"+data[i].discount+"%";
                spotNoDiscount[i-3].innerHTML = "COL$ " + data[i].price;
                let newPrice = data[i].price - (data[i].price * (data[i].discount / 100));
                spotYesDiscount[i-3].innerHTML = "COL$ " + newPrice;
            }
        }

        // console.log(spotsDiscount);
        // for(let i = 0; 10; i++){
        //     spotsDiscount[i].src = data[i].image;
        //     // spotsPercent[i].innerHTML = data[i].discount;
        // }
    });
}


//