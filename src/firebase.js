import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyCgENAVAxv-2H8fPbr_4QQuhm4bZkqxDk4",
  authDomain: "netflix-clone-ce496.firebaseapp.com",
  projectId: "netflix-clone-ce496",
  storageBucket: "netflix-clone-ce496.appspot.com",
  messagingSenderId: "26118321418",
  appId: "1:26118321418:web:5b5ee3aa1f104fc075b6f3"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth (app);
const db = getFirestore (app)

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword (auth, email, password);
        const user = res.user;
        await addDoc (collection (db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })
    } catch (error) {
        console.log (error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}


const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log (error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}


const logout = () => {
    signOut(auth)
}


export {auth, db, login, signup, signOut}