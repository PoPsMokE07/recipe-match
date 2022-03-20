// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, onValue, set, get, child, update } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClO2TMdiia5B9TYcylQAGsV80ddjN-QUc",
  authDomain: "recipe-match-b2d9f.firebaseapp.com",
  projectId: "recipe-match-b2d9f",
  storageBucket: "recipe-match-b2d9f.appspot.com",
  messagingSenderId: "321339681074",
  appId: "1:321339681074:web:30ddd70fefc28b7d580f2b",
  databaseURL: "https://recipe-match-users.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const userDB = getDatabase(app);
const provider = new GoogleAuthProvider();






















export function googleSignIn(login) {
  const auth = getAuth();

  signInWithPopup(auth, provider)
    .then((res) => {
      console.log(res.user);
     
      const dbRef = ref(getDatabase(app));
      get(child(dbRef, `users/${res.user.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
          } else {
            set(ref(userDB, "users/" + res.user.uid), {
              email: res.user.email,
              pantry: ["eggs", "milk", "cheese"]
            });
          }
          login(res.user, snapshot.val().pantry)
        })
        .catch((error) => {
          console.error(error);
        });
       
      ///////////////////////////////////////////
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

export function updatePantry(user, pantry){
  const dbRef = ref(getDatabase(app));
 set(ref(userDB,`users/${user.uid}`),
 {
   pantry: pantry
 })
}

