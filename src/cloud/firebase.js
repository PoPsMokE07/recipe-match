// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, onValue, set, get, child, update } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAj5Hm6DK8QS9oLEpJjBtq76PE7aNyMvS0",
  authDomain: "recipe-match-6d179.firebaseapp.com",
  databaseURL: "https://recipe-match-6d179-default-rtdb.firebaseio.com",
  projectId: "recipe-match-6d179",
  storageBucket: "recipe-match-6d179.appspot.com",
  messagingSenderId: "470015672094",
  appId: "1:470015672094:web:433a465a87bfc74101d30f"
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

